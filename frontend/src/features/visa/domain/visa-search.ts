export type VisaSearchItem = {
  countryId: string;
  slug: string;
  countryCode: string;
  name: string;
  typeCount: number;
  minimumPriceCurrency: string | null;
  minimumPrice: number | null;
  processingDaysMin?: number | null;
  processingDaysMax?: number | null;
  coverImageUrl?: string | null;
};
