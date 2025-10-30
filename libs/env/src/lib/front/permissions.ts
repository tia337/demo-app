export const Role = {
  INVALID: 'invalid',
  ADMIN: 'admin',
  WATCHER: 'watcher',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export const PermissionView = {
  FOO_VIEW: 'fooView',
  BAR_VIEW: 'barView',
} as const;

export type PermissionView =
  (typeof PermissionView)[keyof typeof PermissionView];

export const PermissionAction = {
  READ: 'read',
  WRITE: 'write',
} as const;

export type PermissionAction =
  (typeof PermissionAction)[keyof typeof PermissionAction];

export type PermissionListType = `${PermissionView}:${PermissionAction}`;

const createPermission = (
  view: PermissionView,
  action: PermissionAction,
): PermissionListType => `${view}:${action}`;

export const generatePermissions = (
  views: PermissionView[],
  actions: PermissionAction[],
): PermissionListType[] =>
  views.flatMap(view => actions.map(action => createPermission(view, action)));

const ALL_VIEWS = Object.values(PermissionView);
const ALL_ACTIONS = Object.values(PermissionAction);
const READ_ACTIONS: PermissionAction[] = [PermissionAction.READ];

export const ADMIN_ROLE_PERMISSIONS = generatePermissions(
  ALL_VIEWS,
  ALL_ACTIONS,
);

export const WATCHER_ROLE_PERMISSIONS = generatePermissions(
  ALL_VIEWS,
  READ_ACTIONS,
);

export const INVALID_ROLE_PERMISSIONS: PermissionListType[] = [];

export const PermissionsByRoleRecord: Record<Role, PermissionListType[]> = {
  [Role.INVALID]: INVALID_ROLE_PERMISSIONS,
  [Role.WATCHER]: WATCHER_ROLE_PERMISSIONS,
  [Role.ADMIN]: ADMIN_ROLE_PERMISSIONS,
};

export const hasPermission = (
  userPermissions: PermissionListType[],
  requiredPermission: PermissionListType,
): boolean => {
  return userPermissions.includes(requiredPermission);
};

export const hasViewPermission = (
  userPermissions: PermissionListType[],
  view: PermissionView,
  action: PermissionAction,
): boolean => {
  const permission = createPermission(view, action);
  return hasPermission(userPermissions, permission);
};

export const hasReadPermission = (
  userPermissions: PermissionListType[],
  view: PermissionView,
): boolean => {
  return hasViewPermission(userPermissions, view, PermissionAction.READ);
};

export const hasWritePermission = (
  userPermissions: PermissionListType[],
  view: PermissionView,
): boolean => {
  return hasViewPermission(userPermissions, view, PermissionAction.WRITE);
};

export const getPermissionsByRole = (role: Role): PermissionListType[] => {
  return PermissionsByRoleRecord[role];
};

export const isViewAllowed = (
  permissions: PermissionListType[],
  view: PermissionView,
): boolean => {
  return (
    hasReadPermission(permissions, view) ||
    hasWritePermission(permissions, view)
  );
};
