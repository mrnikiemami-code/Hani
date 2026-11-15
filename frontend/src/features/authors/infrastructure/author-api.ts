import { apiGet } from "@/lib/hani/api";
import type { AuthorProfile } from "../domain/author";

export async function getAuthorProfile(
  username: string
): Promise<AuthorProfile | null> {
  return apiGet<AuthorProfile>(
    `/market/v1/authors/${encodeURIComponent(username)}/profile`
  );
}
