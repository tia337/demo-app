import { inject, provideEnvironmentInitializer } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import {
  distinctUntilChanged,
  filter,
  map,
  NEVER,
  startWith,
  switchMap,
} from 'rxjs';

import { LoadingIndicationService } from './loading-indication.service';
import type { LoadingIndicationFeature } from './loading-indication-feature';
import {
  LoadingIndicationKind,
  makeLoadingIndicationFeature,
} from './loading-indication-feature';

export function withRouterIndication(): LoadingIndicationFeature<LoadingIndicationKind> {
  return makeLoadingIndicationFeature(LoadingIndicationKind.ROUTER_INDICATION, [
    provideEnvironmentInitializer(() => {
      const loading = inject(LoadingIndicationService);

      inject(Router)
        .events.pipe(
          map(event => {
            if (event instanceof NavigationStart) {
              return true;
            }

            if (
              event instanceof NavigationEnd ||
              event instanceof NavigationCancel ||
              event instanceof NavigationError
            ) {
              return false;
            }

            return null;
          }),
          filter(query => query !== null),
          startWith(false),
          distinctUntilChanged(),
          switchMap(query => (query ? loading.query$ : NEVER)),
          takeUntilDestroyed(),
        )
        .subscribe();
    }),
  ]);
}
