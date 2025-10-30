import type { EnvironmentProviders } from '@angular/core';
import { Injectable, makeEnvironmentProviders } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  timer,
} from 'rxjs';

import type {
  LoadingIndicationFeature,
  LoadingIndicationKind,
} from './loading-indication-feature';

const MINIMUM_MS = 100;

@Injectable({ providedIn: 'root' })
export class LoadingIndicationService {
  readonly #queryCount$ = new BehaviorSubject(0);
  readonly #indeterminateCount$ = new BehaviorSubject(0);

  readonly mode$ = combineLatest([
    this.#queryCount$,
    this.#indeterminateCount$,
  ]).pipe(
    map(([query, indeterminate]) =>
      query !== 0 ? 'query' : indeterminate !== 0 ? 'indeterminate' : null,
    ),
    switchMap(mode =>
      mode === null ? timer(MINIMUM_MS).pipe(map(() => null)) : of(mode),
    ),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly query$ = new Observable<never>(() => {
    this.#queryCount$.next(this.#queryCount$.value + 1);

    return () => {
      this.#queryCount$.next(this.#queryCount$.value - 1);
    };
  });

  readonly indeterminate$ = new Observable<never>(() => {
    this.#indeterminateCount$.next(this.#indeterminateCount$.value + 1);

    return () => {
      this.#indeterminateCount$.next(this.#indeterminateCount$.value - 1);
    };
  });
}

export function provideLoadingIndication(
  ...features: LoadingIndicationFeature<LoadingIndicationKind>[]
): EnvironmentProviders {
  return makeEnvironmentProviders([
    ...features.map(({ providers }) => providers),
  ]);
}
