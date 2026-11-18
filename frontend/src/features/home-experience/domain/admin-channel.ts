export type AdminApiClient = {
  id: string;
  agencyId: string;
  agencyName: string;
  name: string;
  clientId: string;
  scopes: string;
  status: string;
  createdAt: string;
  lastUsedAt: string | null;
};

export type AdminChannelAgency = {
  agencyId: string;
  name: string;
  slug: string;
  plan: string;
  whiteLabelEnabled: boolean;
  customDomain: string | null;
  attributionRequired: boolean;
  canonicalMode: string;
  subscriptionValidUntil: string | null;
};

export type CreatedApiClient = {
  apiClientId: string;
  clientId: string;
  clientSecret: string;
  scopes: string[];
};
