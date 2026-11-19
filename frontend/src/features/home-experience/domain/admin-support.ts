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
  assignedToName: string | null;
  messageCount: number;
  unreadCount: number;
  createdAt: string;
  lastMessageAt: string;
  slaDueAt: string;
  firstResponseAt: string | null;
  slaState: string;
};

export type SupportTicketPage = {
  items: SupportTicketRow[];
  page: number;
  pageSize: number;
  total: number;
};

export type SupportAttachment = {
  id: string;
  ticketId: string;
  messageId: string | null;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  createdAt: string;
};

export type SupportMessage = {
  id: string;
  authorType: string;
  authorUserId: string | null;
  body: string;
  isInternal: boolean;
  createdAt: string;
  attachments: SupportAttachment[];
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
  assignedToName: string | null;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: SupportMessage[];
  slaDueAt: string;
  firstResponseAt: string | null;
  slaState: string;
};

export type SupportDispute = {
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
  openedBy: string;
  openedAt: string;
  resolvedBy: string | null;
  resolvedAt: string | null;
};

export type SupportDisputePage = {
  items: SupportDispute[];
  page: number;
  pageSize: number;
  total: number;
};

export type SupportDisputeInput = {
  orderId?: string | null;
  type: string;
  amount?: number | null;
  currency?: string | null;
  description: string;
  evidenceUrl?: string | null;
};

export type SupportSlaBreakdown = {
  state: string;
  count: number;
};

export type SupportCategoryReport = {
  category: string;
  count: number;
};

export type SupportAssigneeReport = {
  assignedTo: string | null;
  assignee: string;
  openCount: number;
  totalCount: number;
};

export type SupportReport = {
  periodDays: number;
  from: string;
  to: string;
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  breachedTickets: number;
  atRiskTickets: number;
  averageFirstResponseHours: number;
  averageResolutionHours: number;
  slaBreakdown: SupportSlaBreakdown[];
  byCategory: SupportCategoryReport[];
  byAssignee: SupportAssigneeReport[];
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
