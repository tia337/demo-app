import { InjectionToken } from '@angular/core';

export type ErrorLogger = (input: string) => void;

export const ERROR_LOGGER = new InjectionToken<ErrorLogger>('ERROR_LOGGER', {
  providedIn: 'root',
  factory: () => {
    return () => void 0;
  },
});
