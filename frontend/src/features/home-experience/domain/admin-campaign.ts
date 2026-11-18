export type AdminCampaign = {
  id: string;
  slug: string;
  title: string;
  status: string;
  startsAt: string;
  endsAt: string;
  price: number | null;
  currency: string | null;
  discountPercent: number | null;
  registrations: number;
  createdAt: string;
};

export type AdminCampaignPage = {
  items: AdminCampaign[];
  page: number;
  pageSize: number;
  total: number;
};

export type AdminCampaignTranslationInput = {
  locale: string;
  title: string;
  description: string;
};

export type AdminCampaignCreateInput = {
  slug: string;
  startsAt: string;
  endsAt: string;
  destinationId?: string | null;
  price?: number | null;
  currency?: string | null;
  discountPercent?: number | null;
  translations: AdminCampaignTranslationInput[];
  faqs: Array<{ question: string; answer: string }>;
};
