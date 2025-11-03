import { inject } from '@angular/core';
import type { CanActivateFn, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

import type { PermissionView } from './permissions';
import { PermissionsService } from './permissions.service';

export const permissionsGuard: CanActivateFn = (route): UrlTree | boolean => {
  const router = inject(Router);
  const permissionsService = inject(PermissionsService);

  const requiredView: PermissionView | undefined = route.data.requiredView;

  if (!requiredView || !permissionsService.isViewAvailable(requiredView)) {
    return router.createUrlTree(['not-allowed']);
  }

  return true;
};
