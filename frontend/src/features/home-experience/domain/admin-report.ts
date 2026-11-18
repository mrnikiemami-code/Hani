export type AdminMoneyReport = {
  currency: string;
  count: number;
  amount: number;
};

export type AdminStatusMoneyReport = AdminMoneyReport & {
  status: string;
};

export type AdminOrderStatusReport = AdminMoneyReport & {
  status: string;
};

export type AdminAgencyReport = {
  agencyId: string;
  agencyName: string;
  currency: string;
  orderCount: number;
  amount: number;
};

export type AdminHotelReport = {
  status: string;
  count: number;
};

export type AdminCampaignReport = {
  status: string;
  count: number;
};

export type AdminReportOverview = {
  periodDays: number;
  from: string;
  to: string;
  totalOrders: number;
  paidOrders: number;
  pendingPaymentOrders: number;
  cancelledOrders: number;
  reservationRequests: number;
  hotelInquiries: number;
  pendingHotelInquiries: number;
  openSupportTickets: number;
  revenue: AdminMoneyReport[];
  refunds: AdminMoneyReport[];
  commissions: AdminMoneyReport[];
  payouts: AdminStatusMoneyReport[];
  ordersByStatus: AdminOrderStatusReport[];
  topAgencies: AdminAgencyReport[];
  hotels: AdminHotelReport[];
  campaigns: AdminCampaignReport[];
  campaignRegistrations: number;
  usersTotal: number;
  usersNew: number;
};
