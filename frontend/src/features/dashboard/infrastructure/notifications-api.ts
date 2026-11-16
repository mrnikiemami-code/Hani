import { sessionGet, sessionPost } from "@/lib/hani/server-api";

export type InboxMessage = {
  messageId: string;
  subject: string;
  body: string;
  status: string;
  createdAt: string;
};

export async function getMyMessages(): Promise<InboxMessage[]> {
  const result = await sessionGet<{ items: InboxMessage[]; totalCount: number }>(
    "/market/v1/me/messages?page=1&pageSize=50"
  );
  return result.status === 200 && result.data ? result.data.items : [];
}

export async function markMessageRead(messageId: string): Promise<boolean> {
  const result = await sessionPost(`/market/v1/me/messages/${encodeURIComponent(messageId)}/read`, {});
  return result.status === 200;
}
