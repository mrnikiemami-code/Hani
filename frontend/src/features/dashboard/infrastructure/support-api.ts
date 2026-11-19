import { sessionGet } from "@/lib/hani/server-api";

export type CustomerSupportTicketRow = {
  id: string;
  ticketNumber: string;
  subject: string;
  category: string;
  status: string;
  priority: string;
  messageCount: number;
  unreadCount: number;
  createdAt: string;
  lastMessageAt: string;
};

export type CustomerSupportTicketPage = {
  items: CustomerSupportTicketRow[];
  page: number;
  pageSize: number;
  total: number;
};

export type CustomerSupportAttachment = {
  id: string;
  ticketId: string;
  messageId: string | null;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  hasThumbnail: boolean;
  createdAt: string;
};

export type CustomerSupportMessage = {
  id: string;
  authorType: string;
  body: string;
  createdAt: string;
  attachments: CustomerSupportAttachment[];
};

export type CustomerSupportDispute = {
  id: string;
  ticketId: string;
  ticketNumber: string;
  orderId: string | null;
  type: string;
  status: string;
  amount: number | null;
  currency: string | null;
  description: string;
  evidenceUrl: string | null;
  resolution: string | null;
  openedAt: string;
  resolvedAt: string | null;
};

export type CustomerSupportTicketDetail = {
  id: string;
  ticketNumber: string;
  subject: string;
  category: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string;
  unreadCount: number;
  supportLastReadAt: string | null;
  messages: CustomerSupportMessage[];
  disputes: CustomerSupportDispute[];
};

export type CustomerSupportDisputePage = {
  items: CustomerSupportDispute[];
  page: number;
  pageSize: number;
  total: number;
};

export function getMySupportTickets(status?: string) {
  const query = new URLSearchParams({ page: "1", pageSize: "50" });
  if (status) query.set("status", status);
  return sessionGet<CustomerSupportTicketPage>(
    `/market/v1/support/tickets?${query}`
  );
}

export function getMySupportTicket(id: string) {
  return sessionGet<CustomerSupportTicketDetail>(
    `/market/v1/support/tickets/${id}`
  );
}

export function getMySupportDisputes(status?: string) {
  const query = new URLSearchParams({ page: "1", pageSize: "50" });
  if (status) query.set("status", status);
  return sessionGet<CustomerSupportDisputePage>(
    `/market/v1/support/disputes?${query}`
  );
}
