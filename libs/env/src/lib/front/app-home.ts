import { inject, InjectionToken } from '@angular/core';

import { NAV_ITEMS } from './nav-items';

export const APP_HOME = new InjectionToken<string>('APP_HOME', {
  providedIn: 'root',
  factory: () => {
    const [home] = inject(NAV_ITEMS);

    return home.link;
  },
});
