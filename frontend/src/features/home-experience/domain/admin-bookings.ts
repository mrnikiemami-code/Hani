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
