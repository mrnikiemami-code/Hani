export type AdminUser = {
  id: string;
  mobile: string;
  email: string | null;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  status: string;
  createdAt: string;
  lastLoginAt: string | null;
};

export type AdminUserListResponse = {
  items: AdminUser[];
  page: number;
  pageSize: number;
  total: number;
};
