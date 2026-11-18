export type AdminSupplierOffer = {
  id: string;
  agencyId: string;
  agencyName: string;
  externalId: string;
  title: string;
  status: string;
  bookingMode: string;
  collectionMode: string;
  price: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminSupplierOfferPage = {
  items: AdminSupplierOffer[];
  page: number;
  pageSize: number;
  total: number;
};
