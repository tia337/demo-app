import { computed, inject, Injectable } from '@angular/core';

import { AuthService } from '../front/auth.service';
import {
  hasReadPermission,
  isViewAllowed,
  PermissionListType,
  PermissionsByRoleRecord,
  PermissionView,
  Role,
} from './permissions';

@Injectable({ providedIn: 'root' })
export class PermissionsService {
  readonly #auth = inject(AuthService);

  readonly roles = computed<Role[]>(() => {
    const userRoles = this.#auth.user().groups;

    if (!userRoles.length) {
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
