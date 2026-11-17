export type MediaVariant = {
  format: string;
  width: number;
  height: number;
  sizeBytes: number;
  url: string;
  isCanonical: boolean;
};

export type MediaAsset = {
  id: string;
  originalFileName: string;
  contentType: string;
  sizeBytes: number;
  width: number;
  height: number;
  altText: string;
  caption: string | null;
  credit: string | null;
  url: string;
  createdAt: string;
  variants: MediaVariant[];
};

export type MediaListResponse = {
  items: MediaAsset[];
  page: number;
  pageSize: number;
  total: number;
};
