import { inject } from '@angular/core';
import type { Route } from '@angular/router';

import {
  AuthService,
  permissionsGuard,
  PermissionsService,
} from '@demo-app/auth';
import { PermissionView } from '@demo-app/env';
import { APP_HOME } from '@demo-app/pages-util';

export const appRoutes: Route[] = [
  {
    path: '',
    canMatch: [(): boolean => inject(AuthService).isLoggedIn()],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@demo-app/pages-feat').then(m => m.LayoutComponent),
        children: [
          {
            path: '',
            redirectTo: () => inject(APP_HOME),
            pathMatch: 'full',
          },
          {
            path: 'foo',
            loadComponent: () => import('@demo-app/foo/feat-cat'),
            title: 'Foo',
            canActivate: [permissionsGuard],
            data: { requiredView: PermissionView.FOO_VIEW },
            resolve: {
              isReadonly: () =>
                inject(PermissionsService).isViewReadonly(
                  PermissionView.FOO_VIEW,
                ),
            },
          },
          {
            path: 'bar',
            loadComponent: () => import('@demo-app/bar'),
            title: 'Bar',
            canActivate: [permissionsGuard],
            data: { requiredView: PermissionView.BAR_VIEW },
            resolve: {
              isReadonly: () =>
                inject(PermissionsService).isViewReadonly(
                  PermissionView.BAR_VIEW,
                ),
            },
          },
          {
            path: '**',
            loadComponent: () =>
              import('@demo-app/pages-feat').then(m => m.NotFoundComponent),
            title: 'Not Found',
          },
        ],
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('@demo-app/pages-feat').then(m => m.LoginComponent),
  },
];
