"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  HaniDateRangePicker,
  type HaniDateRangePreset
} from "@/components/hani/date/HaniDateRangePicker";
import { addIsoDays, todayIsoDate } from "@/lib/hani/calendar";
import { getMonthRange } from "@/lib/hani/calendar/date-object";

/**
 * Dashboard range box. The visible value follows the locale calendar while
 * the internal range remains Gregorian ISO.
 */
const PredefinedDateRanges = () => {
  const locale = useLocale();
  const t = useTranslations("common");
  const today = todayIsoDate();

  const presets = useMemo<HaniDateRangePreset[]>(() => {
    const thisMonth = getMonthRange(locale, 0);
    const lastMonth = getMonthRange(locale, -1);
    const items: Array<HaniDateRangePreset | null> = [
      { label: t("today"), range: { start: today, end: today } },
      {
        label: t("yesterday"),
        range: { start: addIsoDays(today, -1), end: addIsoDays(today, -1) }
      },
      {
        label: t("last7Days"),
        range: { start: addIsoDays(today, -6), end: today }
      },
      {
        label: t("last30Days"),
        range: { start: addIsoDays(today, -29), end: today }
      },
      thisMonth ? { label: t("thisMonth"), range: thisMonth } : null,
      lastMonth ? { label: t("lastMonth"), range: lastMonth } : null
    ];

    return items.filter((item): item is HaniDateRangePreset => item !== null);
  }, [locale, t, today]);

  return (
    <HaniDateRangePicker
      defaultValue={{ start: addIsoDays(today, -29), end: today }}
      presets={presets}
      trigger={({ open, label }) => (
        <div
          id="reportrange"
          className="col-4"
          style={{
            background: "#fff",
            cursor: "pointer",
            padding: "0.5rem 0.625rem",
            border: "1px solid #E9EDF4",
            width: "100%",
            borderRadius: "5px",
            fontSize: "14px",
            color: "#202C4B",
            height: "38px"
          }}
          onClick={open}
        >
          <span>{label}</span>
        </div>
      )}
    />
  );
};

export default PredefinedDateRanges;
