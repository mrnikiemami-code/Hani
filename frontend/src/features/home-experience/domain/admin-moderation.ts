export type PendingReview = {
  reviewId: string;
  authorDisplayName: string;
  targetType: string;
  targetId: string;
  rating: number;
  comment: string;
  createdAt: string;
  status: string;
};

export type PendingMedia = {
  mediaId: string;
  ownerUserId: string;
  url: string;
  contentType: string;
  kind: string;
  status: string;
  createdAt: string;
};

export type PagedPending<T> = {
  items: T[];
  totalCount: number;
};
