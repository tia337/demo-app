import { InjectionToken } from '@angular/core';

export const APP_LOGO = new InjectionToken<string>('APP_LOGO', {
  providedIn: 'root',
  factory: () => '',
});
