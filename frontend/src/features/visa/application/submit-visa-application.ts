"use server";

import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { sessionPost } from "@/lib/hani/server-api";
import type { VisaApplication } from "../domain/visa-application";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

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
  const documentNames = String(formData.get("documents") ?? "")
    .split("|")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
  const files = formData
    .getAll("documentFiles")
    .filter((value): value is File => value instanceof File && value.size > 0);
  const uploaded: string[] = [];
  for (const file of files) {
    const upload = new FormData();
    upload.append("file", file, file.name);
    try {
      const response = await fetch(
        `${apiBase}/market/v1/visa-applications/documents`,
        { method: "POST", body: upload, cache: "no-store" }
      );
      if (!response.ok) {
        redirect(
          `/${locale}/visa/visa-application?slug=${encodeURIComponent(slug)}&error=upload`
        );
      }
      const result = (await response.json()) as { url?: string };
      if (result.url) {
        uploaded.push(result.url);
      }
    } catch {
      redirect(
        `/${locale}/visa/visa-application?slug=${encodeURIComponent(slug)}&error=upload`
      );
    }
  }

  if (uploaded.length === 0 && files.length > 0) {
    redirect(
      `/${locale}/visa/visa-application?slug=${encodeURIComponent(slug)}&error=upload`
    );
  }

  const documents = uploaded.length > 0 ? uploaded : documentNames;

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
