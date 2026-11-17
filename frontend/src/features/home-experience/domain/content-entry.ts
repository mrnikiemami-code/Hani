export type ContentEntryType = "Page" | "Banner" | "Article" | "Section";
export type ContentEntryStatus = "Draft" | "Published" | "Archived";

export type ContentEntry = {
  id: string;
  type: ContentEntryType;
  slug: string;
  locale: string;
  title: string;
  excerpt: string | null;
  body: string;
  heroMediaId: string | null;
  heroImageUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  status: ContentEntryStatus;
  publishedAt: string | null;
  scheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
  revisionCount: number;
};

export type ContentEntryWrite = Omit<
  ContentEntry,
  "id" | "status" | "publishedAt" | "scheduledAt" | "createdAt" | "updatedAt" | "revisionCount"
>;
