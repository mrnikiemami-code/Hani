const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withTrailingSlash = configuredBasePath ? `${configuredBasePath}/` : "/";

export const base_path = withTrailingSlash;
export const img_path = withTrailingSlash;
