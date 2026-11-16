import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import type { IsoDate } from "./types";
import { asIsoDate, isIsoDate } from "./types";

export type CalendarPickerConfig = {
  calendar: typeof persian | typeof gregorian;
  locale: typeof persian_fa | typeof gregorian_en | typeof gregorian_ar;
  format: string;
  isRtl: boolean;
};

/** Returns the calendar and locale plugins used by the picker. */
export function getCalendarPickerConfig(locale: string): CalendarPickerConfig {
  switch (locale.split("-")[0]) {
    case "fa":
      return {
        calendar: persian,
        locale: persian_fa,
        format: "YYYY/MM/DD",
        isRtl: true
      };
    case "ar":
      return {
        calendar: gregorian,
        locale: gregorian_ar,
        format: "DD-MM-YYYY",
        isRtl: true
      };
    default:
      return {
        calendar: gregorian,
        locale: gregorian_en,
        format: "DD-MM-YYYY",
        isRtl: false
      };
  }
}

/** Converts a canonical Gregorian date into the locale calendar for display. */
export function toDateObject(
  value: IsoDate | null | undefined,
  locale: string
): DateObject | null {
  if (!value || !isIsoDate(value)) {
    return null;
  }

  const config = getCalendarPickerConfig(locale);
  return new DateObject({
    calendar: gregorian,
    locale: gregorian_en,
    date: value
  })
    .convert(config.calendar)
    .setLocale(config.locale);
}

/**
 * Converts a picker result back to the canonical Gregorian date.
 * Uses calendar fields instead of Date#toISOString to avoid timezone shifts.
 */
export function fromDateObject(
  value: DateObject | null | undefined
): IsoDate | null {
  if (!value || !value.isValid) {
    return null;
  }

  const iso = value
    .convert(gregorian)
    .setLocale(gregorian_en)
    .format("YYYY-MM-DD");

  return asIsoDate(iso);
}

/**
 * Returns the first and last day of a month in the locale calendar.
 * offset = 0 is this month, -1 is last month.
 */
export function getMonthRange(
  locale: string,
  offset = 0
): { start: IsoDate; end: IsoDate } | null {
  const config = getCalendarPickerConfig(locale);
  let current = new DateObject({
    calendar: config.calendar,
    locale: config.locale
  });

  if (offset !== 0) {
    current = current.add(offset, "month");
  }

  const start = fromDateObject(new DateObject(current).toFirstOfMonth());
  const end = fromDateObject(new DateObject(current).toLastOfMonth());

  return start && end ? { start, end } : null;
}
