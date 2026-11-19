"use client";

import { useTranslations } from "next-intl";

/** Triggers the browser print dialog for the current document page. */
export function PrintButton() {
  const t = useTranslations("adminBookings");
  return (
    <button
      type="button"
      className="btn btn-primary btn-sm"
      onClick={() => window.print()}
    >
      {t("print")}
    </button>
  );
}
