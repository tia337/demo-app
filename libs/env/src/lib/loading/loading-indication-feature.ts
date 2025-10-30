import type { EnvironmentProviders, Provider } from '@angular/core';

export enum LoadingIndicationKind {
  ROUTER_INDICATION = 0,
  DEBUG_INDICATION = 1,
}

export interface LoadingIndicationFeature<K extends LoadingIndicationKind> {
  kind: K;
  providers: (EnvironmentProviders | Provider)[];
}

export function makeLoadingIndicationFeature<K extends LoadingIndicationKind>(
  kind: K,
  providers: (EnvironmentProviders | Provider)[],
): LoadingIndicationFeature<K> {
  return { kind, providers };
}
