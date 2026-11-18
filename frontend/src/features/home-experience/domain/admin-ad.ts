export type AdminAdCreative = {
  id: string;
  title: string;
  imageUrl: string;
  targetUrl: string;
  startsAt: string | null;
  endsAt: string | null;
  isActive: boolean;
  impressions: number;
  clicks: number;
};

export type AdminAdSlot = {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  creatives: AdminAdCreative[];
};
