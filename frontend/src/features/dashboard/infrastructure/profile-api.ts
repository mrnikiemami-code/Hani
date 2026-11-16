import { sessionGet, sessionPut } from "@/lib/hani/server-api";

export type MyProfile = {
  userId: string;
  mobile: string;
  email: string | null;
  firstName: string;
  lastName: string;
  username: string;
  bio: string | null;
  avatarUrl: string | null;
  role: string;
  status: string;
  createdAt: string;
  lastLoginAt: string | null;
};

export type MyProfileInput = {
  firstName: string;
  lastName: string;
  email: string | null;
  bio: string | null;
  avatarUrl: string | null;
};

export async function getMyProfile(): Promise<MyProfile | null> {
  const result = await sessionGet<MyProfile>("/market/v1/auth/me");
  return result.status === 200 ? result.data : null;
}

export async function updateMyProfile(input: MyProfileInput): Promise<MyProfile | null> {
  const result = await sessionPut<MyProfile>("/market/v1/auth/me", input);
  return result.status === 200 ? result.data : null;
}
