export type BlogSummaryItem = {
  postId: string;
  slug: string;
  title: string;
  excerpt: string;
  coverUrl: string | null;
  publishedAt: string | null;
  viewCount: number;
  likeCount: number;
};

export type BlogPagedResult = {
  items: BlogSummaryItem[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export type BlogDetailItem = BlogSummaryItem & {
  locale: string;
  body: string;
  seoTitle: string | null;
  seoDescription: string | null;
  authorUserId: string;
  commentCount: number;
  destinationIds: string[] | null;
};
