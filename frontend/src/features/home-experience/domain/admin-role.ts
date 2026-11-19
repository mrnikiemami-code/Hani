export type AdminRole = {
  role: string;
  displayName: string;
  isSystem: boolean;
  permissions: string[];
};

export type AdminRoles = {
  permissionCatalog: string[];
  roles: AdminRole[];
};
