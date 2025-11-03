export { API_HOST } from './lib/env/api-host';
export { APP_LOGO } from './lib/env/app-logo';
export { FrontTitleStrategy } from './lib/env/front-title-strategy.service';
export { IS_PRODUCTION } from './lib/env/is-production';
export { loadEnvConfig } from './lib/env/load-env-config';
export { LOGIN_URL } from './lib/env/login-url';
export { AuthService } from './lib/front/auth.service';
export { LoadingIndicatorComponent } from './lib/loading/loading-indication.component';
export { provideLoadingIndication } from './lib/loading/loading-indication.service';
export { withRouterIndication } from './lib/loading/with-router-indication';
export { permissionsGuard } from './lib/permissions/permission.guard';
export type { PermissionListType } from './lib/permissions/permissions';
export {
  hasReadPermission,
  isViewAllowed,
  PermissionsByRoleRecord,
  PermissionView,
  Role,
} from './lib/permissions/permissions';
export { PermissionsService } from './lib/permissions/permissions.service';
