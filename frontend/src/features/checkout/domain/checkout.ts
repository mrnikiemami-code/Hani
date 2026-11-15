export type CheckoutPrice = {
  roomType: string;
  amount: number;
  currency: string;
};

export type CheckoutDeparture = {
  id: string;
  startDate: string;
  endDate: string;
  seatsLeft: number;
  status: string;
  prices: CheckoutPrice[];
};

export type CheckoutOffer = {
  offerId: string;
  agencyId: string;
  agencyName: string;
  title: string;
  minPrice: number;
  currency: string;
  departures: CheckoutDeparture[];
};

export type CheckoutProduct = {
  productId: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  durationDays: number;
  offers: CheckoutOffer[];
};

export type CheckoutQuote = {
  quoteId: string;
  total: number;
  currency: string;
  expiresAt: string;
};

export type CheckoutHold = {
  holdId: string;
  expiresAt: string;
};

export type CheckoutOrder = {
  orderId: string;
  orderNumber: string;
  total: number;
  currency: string;
  status: string;
  paymentStatus: string;
};

export type CheckoutPaymentIntent = {
  paymentIntentId: string;
  status: string;
  redirectUrl: string | null;
};

export type CheckoutSession = {
  order: CheckoutOrder;
  payment: CheckoutPaymentIntent;
};
