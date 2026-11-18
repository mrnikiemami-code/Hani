export type SupportTicketRow = {
  id: string;
  ticketNumber: string;
  subject: string;
  contactName: string;
  contactEmail: string;
  category: string;
  priority: string;
  status: string;
  assignedTo: string | null;
  messageCount: number;
  createdAt: string;
  lastMessageAt: string;
};

export type SupportTicketPage = {
  items: SupportTicketRow[];
  page: number;
  pageSize: number;
  total: number;
};

export type SupportMessage = {
  id: string;
  authorType: string;
  authorUserId: string | null;
  body: string;
  isInternal: boolean;
  createdAt: string;
};

export type SupportTicketDetail = {
  id: string;
  ticketNumber: string;
  subject: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string | null;
  category: string;
  priority: string;
  status: string;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string;
  messages: SupportMessage[];
};

export type SupportTicketCreateInput = {
  userId?: string | null;
  contactName: string;
  contactEmail: string;
  contactPhone?: string | null;
  subject: string;
  category: string;
  message: string;
  priority: string;
};
