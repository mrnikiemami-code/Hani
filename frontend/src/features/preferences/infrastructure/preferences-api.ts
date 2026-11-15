import { cookies } from "next/headers";
import { sessionGet, sessionPut } from "@/lib/hani/server-api";
import type {
  UserPreferences,
  UserPreferencesInput
} from "../domain/user-preferences";

const preferencesPath = "/market/v1/me/preferences";
const accessCookie = "hani_access_token";

async function hasSession(): Promise<boolean> {
  const store = await cookies();
  return Boolean(store.get(accessCookie)?.value);
}

export async function getMyPreferences(): Promise<UserPreferences | null> {
  if (!(await hasSession())) {
    return null;
  }

  const result = await sessionGet<UserPreferences>(preferencesPath);
  return result.status === 200 ? result.data : null;
}

export async function updateMyPreferences(
  input: UserPreferencesInput
): Promise<UserPreferences | null> {
  if (!(await hasSession())) {
    return null;
  }

  const result = await sessionPut<UserPreferences>(preferencesPath, input);
  return result.status === 200 ? result.data : null;
}
