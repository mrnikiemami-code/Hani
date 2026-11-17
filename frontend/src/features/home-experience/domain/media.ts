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
  folderId: string | null;
  tags: string[];
  focalX: number | null;
  focalY: number | null;
  url: string;
  createdAt: string;
  variants: MediaVariant[];
};

export type MediaFolder = {
  id: string;
  name: string;
  parentId: string | null;
};

export type MediaListResponse = {
  items: MediaAsset[];
  page: number;
  pageSize: number;
  total: number;
};
