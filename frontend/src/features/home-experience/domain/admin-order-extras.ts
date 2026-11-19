export type AdminContractTraveler = {
  travelerId: string;
  fullName: string;
  type: string;
  dateOfBirth: string | null;
};

export type AdminContractLine = {
  lineId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  currency: string;
};

export type AdminOrderContract = {
  contractId: string;
  contractNumber: string;
  orderId: string;
  orderNumber: string;
  orderStatus: string;
  issuedAt: string;
  quoteId: string;
  holdId: string;
  agencyId: string;
  agencyOfferId: string;
  departureId: string;
  roomType: string;
  adults: number;
  children: number;
  infants: number;
  seats: number;
  unitPrice: number;
  total: number;
  currency: string;
  contactEmail: string;
  contactPhone: string | null;
  travelers: AdminContractTraveler[];
  lines: AdminContractLine[];
  cancelledAt: string | null;
  cancellationReason: string | null;
};

export type AdminOrderVoucher = {
  voucherNumber: string;
  orderId: string;
  orderNumber: string;
  contractNumber: string;
  orderStatus: string;
  paymentStatus: string;
  issuedAt: string;
  paymentDueAt: string;
  agencyId: string;
  departureId: string;
  roomType: string;
  adults: number;
  children: number;
  infants: number;
  total: number;
  currency: string;
  contactEmail: string;
  contactPhone: string | null;
  travelers: AdminContractTraveler[];
  lines: AdminContractLine[];
  cancelledAt: string | null;
  cancellationReason: string | null;
};

export type AdminOrderHistoryEntry = {
  id: string;
  occurredAt: string;
  action: string;
  reason: string;
  actorRole: string;
  actorMobile: string | null;
  beforeJson: string | null;
  afterJson: string | null;
};

export type AdminOrderHistory = {
  items: AdminOrderHistoryEntry[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminOrderRefund = {
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
