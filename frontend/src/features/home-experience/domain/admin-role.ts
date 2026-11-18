export type AdminRole = {
  role: string;
  permissions: string[];
};

export type AdminRoles = {
  permissionCatalog: string[];
  roles: AdminRole[];
};
