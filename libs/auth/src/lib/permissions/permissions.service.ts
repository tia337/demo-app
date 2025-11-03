import { computed, inject, Injectable } from '@angular/core';

import {
  hasReadPermission,
  isViewAllowed,
  PermissionListType,
  PermissionsByRoleRecord,
  PermissionView,
  Role,
} from '@demo-app/env';

import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class PermissionsService {
  readonly #auth = inject(AuthService);

  readonly roles = computed<Role[]>(() => {
    const userRoles = this.#auth.user().groups;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!userRoles) {
      return [Role.INVALID];
    }

    return userRoles as Role[];
  });

  readonly permissions = computed<PermissionListType[]>(() => {
    const allPermissions = this.roles().reduce<PermissionListType[]>(
      (acc, role) => [...acc, ...PermissionsByRoleRecord[role]],
      [],
    );

    return [...new Set(allPermissions)];
  });

  isViewReadonly(view: PermissionView): boolean {
    return !hasReadPermission(this.permissions(), view);
  }

  isViewAvailable(view: PermissionView): boolean {
    return isViewAllowed(this.permissions(), view);
  }
}
