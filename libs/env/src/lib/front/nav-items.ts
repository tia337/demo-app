import { InjectionToken } from '@angular/core';

import type { PermissionView } from './permissions';

export interface NavItem {
  label: string;
  fontIcon: string;
  link: string;
  permission: PermissionView;
}
export const BASE_NAV_ITEMS = new InjectionToken<NavItem[]>('BASE_NAV_ITEMS');

export const NAV_ITEMS = new InjectionToken<NavItem[]>('NAV_ITEMS');
