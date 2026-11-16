import { sessionGet } from "@/lib/hani/server-api";

export type TravelerReview = {
  reviewId: string;
  userId: string;
  authorUsername: string;
  authorDisplayName: string;
  targetType: string;
  targetId: string;
  rating: number;
  title: string | null;
  comment: string;
  status: string;
  createdAt: string;
  publishedAt: string | null;
};

export async function getMyReviews(): Promise<TravelerReview[]> {
  const result = await sessionGet<{
    items: TravelerReview[];
    totalCount: number;
  }>("/market/v1/me/reviews?page=1&pageSize=50");

  return result.status === 200 && result.data ? result.data.items : [];
}
