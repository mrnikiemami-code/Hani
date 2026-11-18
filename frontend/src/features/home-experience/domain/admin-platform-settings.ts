export type PlatformSettings = {
  brandName: string;
  supportEmail: string;
  supportPhone: string;
  defaultCurrency: string;
  termsUrl: string;
  privacyUrl: string;
  maintenanceMessage: string;
};

export type AdminPlatformSettings = {
  settings: Partial<PlatformSettings>;
  updatedAt: string | null;
};
