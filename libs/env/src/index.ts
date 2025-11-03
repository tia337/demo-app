export { API_HOST } from './lib/env/api-host';
export { FrontTitleStrategy } from './lib/env/front-title-strategy.service';
export { IS_PRODUCTION } from './lib/env/is-production';
export { loadEnvConfig } from './lib/env/load-env-config';
export { APP_LOGO } from './lib/front/app-logo';
export { LOGIN_URL } from './lib/front/login-url';
export type { PermissionListType } from './lib/front/permissions';
export {
  hasReadPermission,
  isViewAllowed,
  PermissionsByRoleRecord,
  PermissionView,
  Role,
} from './lib/front/permissions';
export { LoadingIndicatorComponent } from './lib/loading/loading-indication.component';
export { provideLoadingIndication } from './lib/loading/loading-indication.service';
export { withRouterIndication } from './lib/loading/with-router-indication';
