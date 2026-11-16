import { sessionGet } from "@/lib/hani/server-api";

export type TravelerPayment = {
  paymentIntentId: string;
  orderId: string;
  agencyId: string;
  amount: number;
  currency: string;
  paymentObligationId: string | null;
  status: string;
  provider: string;
  providerRef: string | null;
  redirectUrl: string | null;
  failureReason: string | null;
  createdAt: string;
  expiresAt: string;
};

export type TravelerInvoice = {
  invoiceId: string;
  invoiceNumber: string;
  orderId: string;
  issuer: string;
  sellerOfRecord: string;
  buyerEmail: string;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  status: string;
  issuedAt: string;
};

export type TravelerRefund = {
  refundId: string;
  orderId: string;
  paymentIntentId: string | null;
  amount: number;
  currency: string;
  reason: string;
  status: string;
  requestedAt: string;
  processedAt: string | null;
  providerRef: string | null;
  failureReason: string | null;
};

async function getList<T>(path: string): Promise<T[]> {
  const result = await sessionGet<T[]>(path);
  return result.status === 200 && result.data ? result.data : [];
}

export function getMyPayments(): Promise<TravelerPayment[]> {
  return getList<TravelerPayment>("/market/v1/me/payments");
}

export function getMyInvoices(): Promise<TravelerInvoice[]> {
  return getList<TravelerInvoice>("/market/v1/me/invoices");
}

export function getMyRefunds(): Promise<TravelerRefund[]> {
  return getList<TravelerRefund>("/market/v1/me/refunds");
}
