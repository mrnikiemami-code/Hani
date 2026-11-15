export type AuthorProfile = {
  author: {
    userId: string;
    username: string;
    displayName: string;
    bio: string | null;
    avatarUrl: string | null;
    memberSince: string;
  };
  content: { userId: string; blogs: number; travelogues: number; videos: number };
  gamification: {
    userId: string;
    points: number;
    level: number;
    travelStyle: string | null;
    badges: string[];
  };
  reviewCount: number;
};
