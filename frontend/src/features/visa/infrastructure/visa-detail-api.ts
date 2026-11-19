import { apiGet } from "@/lib/hani/api";
import type { VisaApplication } from "../domain/visa-application";

export type VisaDocument = {
  name: string;
  category: string;
};

export type VisaFaq = {
  question: string;
  answer: string;
};

export type VisaType = {
  visaTypeId: string;
  code: string;
  entryType: string;
  issuanceType: string;
  processingDaysMin: number;
  processingDaysMax: number;
  validityDays: number;
  priceAdult: number;
  priceChild: number | null;
  currency: string;
  documents: VisaDocument[];
  steps: string[];
  faqs: VisaFaq[];
  relatedArticleSlugs: string[];
};

export type VisaCountryDetail = {
  countryId: string;
  slug: string;
  countryCode: string;
  name: string;
  description: string | null;
  types: VisaType[];
  coverImageUrl: string | null;
};

export function getVisaBySlug(locale: string, slug: string) {
  return apiGet<VisaCountryDetail>(
    `/market/v1/visas/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`
  );
}

export function getVisaApplication(id: string) {
  return apiGet<VisaApplication>(
    `/market/v1/visa-applications/${encodeURIComponent(id)}`
  );
}

