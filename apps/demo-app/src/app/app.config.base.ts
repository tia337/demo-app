import { provideHttpClient } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import {
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';
import { provideNavItems } from '@demo-app/auth';
import {
  API_HOST,
  BASE_NAV_ITEMS,
  LOGIN_URL,
  PermissionView,
} from '@demo-app/env';

import { appRoutes } from './app.routes';

export const appConfigBase: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
        onSameUrlNavigation: 'reload',
      }),
    ),
    provideHttpClient(),
    {
      provide: BASE_NAV_ITEMS,
      useValue: [
        {
          label: 'Foo',
          fontIcon: 'alt_route',
          link: 'foo',
          permission: PermissionView.FOO_VIEW,
        },
        {
          label: 'Bar',
          fontIcon: 'add_alert',
          link: 'bar',
          permission: PermissionView.BAR_VIEW,
        },
      ],
    },
    provideNavItems(),
    {
      provide: API_HOST,
      useValue: 'https://cataas.com',
    },
    {
      provide: LOGIN_URL,
      useValue: 'google.com',
    },
  ],
};
