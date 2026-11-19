export type AdminTour = {
  id: string;
  slug: string;
  title: string;
  durationDays: number;
  tourType: string;
  status: string;
  scope: string;
  category: string;
  destinationCount: number;
  createdAt: string;
};

export type AdminTourPage = {
  items: AdminTour[];
  page: number;
  pageSize: number;
  total: number;
};

export type AdminTourCreateInput = {
  slug: string;
  durationDays: number;
  tourType: string;
  scope: string;
  category: string;
  travelType: string;
  coverImageUrl: string | null;
  destinationIds: string[];
  translations: Array<{
    locale: string;
    title: string;
    summary: string;
    description: string;
  }>;
};
