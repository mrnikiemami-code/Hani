export type AdminOrder = {
  id: string;
  number: string;
  agencyId: string;
  status: string;
  paymentStatus: string;
  total: number;
  currency: string;
  contactEmail: string;
  createdAt: string;
  paymentDueAt: string;
};

export type AdminReservation = {
  id: string;
  number: string;
  agencyId: string;
  status: string;
  total: number;
  currency: string;
  contactEmail: string;
  createdAt: string;
  expiresAt: string;
};

export type AdminHotelInquiry = {
  id: string;
  number: string;
  hotelId: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number;
  status: string;
  contactEmail: string;
  createdAt: string;
};

export type AdminLead = {
  leadId: string;
  requestNumber: string;
  serviceType: string;
  destination: string | null;
  startDate: string | null;
  endDate: string | null;
  adults: number;
  children: number;
  infants: number;
  budgetAmount: number | null;
  currency: string | null;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes: string | null;
  status: string;
  matchedAgencyId: string | null;
  createdAt: string;
  matchedAt: string | null;
  closedAt: string | null;
  invitedAgencyIds: string[];
};

export type AdminLeadPage = {
  items: AdminLead[];
  page: number;
  pageSize: number;
  totalCount?: number;
  total?: number;
};

export type AdminBookings = {
  orderCount: number;
  requestCount: number;
  inquiryCount: number;
  orders: AdminOrder[];
  requests: AdminReservation[];
  inquiries: AdminHotelInquiry[];
};

export type AdminFinance = {
  payments: {
    status: string;
    currency: string;
    count: number;
    amount: number;
  }[];
  refundCount: number;
  commissions: { currency: string; count: number; amount: number }[];
  payouts: {
    status: string;
    currency: string;
    count: number;
    amount: number;
  }[];
};

export type AdminPayout = {
  id: string;
  agencyId: string;
  periodStart: string;
  periodEnd: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  paidAt: string | null;
  bankReference: string | null;
  documentUrl: string | null;
  approvedBy: string | null;
};

export type AdminApproval = {
  id: string;
  type: string;
  status: string;
  entityType: string;
  entityId: string;
  amount: number;
  currency: string;
  paymentIntentId: string | null;
  bankReference: string | null;
  documentUrl: string | null;
  requestedReason: string;
  requestedBy: string;
  requestedByMobile: string;
  requestedAt: string;
  decidedBy: string | null;
  decidedByMobile: string | null;
  decidedAt: string | null;
  decisionReason: string | null;
  failureReason: string | null;
};

export type AdminAudit = {
  id: string;
  occurredAt: string;
  actorUserId: string | null;
  actorMobile: string | null;
  actorRole: string;
  agencyId: string | null;
  action: string;
  entityType: string;
  entityId: string;
  beforeJson: string | null;
  afterJson: string | null;
  reason: string;
  correlationId: string;
  ipAddress: string | null;
  userAgent: string | null;
};

export type AdminAuditPage = {
  items: AdminAudit[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminRefund = {
  id: string;
  orderId: string;
  paymentIntentId: string | null;
  amount: number;
  currency: string;
  status: string;
  reason: string;
  requestedAt: string;
  processedAt: string | null;
};

export type AdminInvoice = {
  id: string;
  invoiceNumber: string;
  orderId: string;
  buyerEmail: string;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  status: string;
  issuedAt: string;
};

export type AdminReconciliation = {
  id: string;
  provider: string;
  periodStart: string;
  periodEnd: string;
  currency: string;
  expectedAmount: number;
  actualAmount: number;
  difference: number;
  status: string;
  createdAt: string;
};

export type AdminCommission = {
  id: string;
  orderId: string;
  agencyId: string;
  productType: string;
  grossAmount: number;
  rate: number;
  commissionAmount: number;
  netAmount: number;
  currency: string;
  status: string;
  createdAt: string;
};

export type AdminLedgerEntry = {
  accountCode: string;
  debit: number;
  credit: number;
  description: string;
};

export type AdminLedger = {
  id: string;
  referenceType: string;
  referenceId: string;
  currency: string;
  createdAt: string;
  entries: AdminLedgerEntry[];
};
