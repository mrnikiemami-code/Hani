export type ContentPaged<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export type TravelogueSummary = {
  travelogueId: string;
  slug: string;
  title: string;
  coverUrl: string | null;
  seriesName: string | null;
  publishedAt: string | null;
  viewCount: number;
  likeCount: number;
};

export type TravelogueDetail = TravelogueSummary & {
  locale: string;
  body: string;
  seoTitle: string | null;
  seoDescription: string | null;
  authorUserId: string;
  destinationIds: string[];
  commentCount: number;
};

export type VideoSummary = {
  videoId: string;
  slug: string;
  title: string;
  provider: string;
  coverUrl: string | null;
  durationSeconds: number;
  level: number;
  publishedAt: string | null;
  viewCount: number;
  likeCount: number;
};

export type VideoDetail = VideoSummary & {
  locale: string;
  description: string;
  seoTitle: string | null;
  seoDescription: string | null;
  videoUrl: string;
  authorUserId: string;
  commentCount: number;
};
