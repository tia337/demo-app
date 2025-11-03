import { inject, InjectionToken } from '@angular/core';

import { PermissionsService } from '@demo-app/auth';
import { PermissionView } from '@demo-app/env';

export interface NavItem {
  label: string;
  fontIcon: string;
  link: string;
  permission: PermissionView;
}

const BASE_NAV_ITEMS: NavItem[] = [
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
];

export const NAV_ITEMS = new InjectionToken<NavItem[]>('NAV_ITEMS', {
  providedIn: 'root',
  factory: () => {
    const permissions = inject(PermissionsService);

    return BASE_NAV_ITEMS.reduce<NavItem[]>((acc, item) => {
      if (!permissions.isViewAvailable(item.permission)) {
        return acc;
      }

      acc.push(item);

      return acc;
    }, []);
  },
});
