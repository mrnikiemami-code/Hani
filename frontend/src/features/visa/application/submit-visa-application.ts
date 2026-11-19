"use server";

import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { sessionPost } from "@/lib/hani/server-api";
import type { VisaApplication } from "../domain/visa-application";

function localeOf(value: FormDataEntryValue | null): string {
  const candidate = String(value ?? "");
  return routing.locales.includes(candidate as (typeof routing.locales)[number])
    ? candidate
    : routing.defaultLocale;
}

export async function submitVisaApplication(formData: FormData): Promise<void> {
  const locale = localeOf(formData.get("locale"));
  const slug = String(formData.get("slug") ?? "").trim();
  const countryId = String(formData.get("countryId") ?? "").trim();
  const typeId = String(formData.get("typeId") ?? "").trim();
  const applicantName = String(formData.get("applicantName") ?? "").trim();
  const passportNo = String(formData.get("passportNo") ?? "").trim();
  const nationality = String(formData.get("nationality") ?? "").trim();
  const dateOfBirth = String(formData.get("dateOfBirth") ?? "").trim();
  const travelDate = String(formData.get("travelDate") ?? "").trim();
  const contactEmail = String(formData.get("contactEmail") ?? "").trim();
  const contactPhone = String(formData.get("contactPhone") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const documents = String(formData.get("documents") ?? "")
    .split("|")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  if (
    !countryId ||
    !typeId ||
    !applicantName ||
    !passportNo ||
    !nationality ||
    !contactEmail
  ) {
    redirect(
      `/${locale}/visa/visa-application?slug=${encodeURIComponent(slug)}&error=invalid`
    );
  }

  const result = await sessionPost<VisaApplication>(
    "/market/v1/visa-applications",
    {
      visaCountryId: countryId,
      visaTypeId: typeId,
      applicantName,
      passportNo,
      nationality,
      dateOfBirth: dateOfBirth || null,
      travelDate: travelDate || null,
      contactEmail,
      contactPhone,
      notes: notes || null,
      documents
    }
  );

  if (!result.data) {
    redirect(
      `/${locale}/visa/visa-application?slug=${encodeURIComponent(slug)}&error=submit`
    );
  }

  redirect(
    `/${locale}/visa/visa-booking-confirmation?application=${result.data.applicationId}`
  );
}
