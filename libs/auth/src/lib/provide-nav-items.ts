import type { EnvironmentProviders } from '@angular/core';
import { inject, makeEnvironmentProviders } from '@angular/core';
import type { NavItem } from '@demo-app/env';
import { BASE_NAV_ITEMS, NAV_ITEMS } from '@demo-app/env';

import { PermissionsService } from './permissions/permissions.service';

export function provideNavItems(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: NAV_ITEMS,
      useFactory: () => {
        const navItems = inject(BASE_NAV_ITEMS);
        const permissions = inject(PermissionsService);

        return navItems.reduce<NavItem[]>((acc, item) => {
          if (!permissions.isViewAvailable(item.permission)) {
            return acc;
          }

          acc.push(item);

          return acc;
        }, []);
      },
    },
  ]);
}
