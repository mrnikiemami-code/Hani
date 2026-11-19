export type AdminOrderDetail = {
  orderId: string;
  orderNumber: string;
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
  status: string;
  paymentStatus: string;
  createdAt: string;
  paymentDueAt: string;
  contractId: string;
  contractNumber: string;
  travelers: {
    travelerId: string;
    fullName: string;
    type: string;
    dateOfBirth: string | null;
  }[];
  lines: {
    lineId: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
    currency: string;
  }[];
  components: {
    currency: string;
    netAmount: number;
    taxAmount: number;
    totalAmount: number;
    taxMode: string;
  }[];
  cancelledAt: string | null;
  cancellationReason: string | null;
};

export type AdminOrderPayment = {
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
  provider: string;
  createdAt: string;
};
