import type { PagedResult } from "@/features/tours/domain/tour-search";
import type { TourSearchItem } from "@/features/tours/domain/tour-search";
import type { VisaSearchItem } from "@/features/visa/domain/visa-search";

export type HomeBlogItem = {
  postId: string;
  slug: string;
  title: string;
  excerpt: string;
  coverUrl: string | null;
  publishedAt: string | null;
  viewCount: number;
  likeCount: number;
};

export type HomeTravelogueItem = {
  travelogueId: string;
  slug: string;
  title: string;
  coverUrl: string | null;
  seriesName: string | null;
  publishedAt: string | null;
  viewCount: number;
  likeCount: number;
};

export type HomeCampaignItem = {
  campaignId: string;
  slug: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  status: string;
};

export type HomeFeed = {
  tours: PagedResult<TourSearchItem>;
  visas: VisaSearchItem[];
  travelogues: PagedResult<HomeTravelogueItem>;
  blog: PagedResult<HomeBlogItem>;
  campaigns: PagedResult<HomeCampaignItem>;
};
