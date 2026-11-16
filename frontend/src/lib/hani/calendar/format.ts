import type { CalendarSystem, IsoDate, IsoInstant } from "./types";
import { isIsoDate } from "./types";

/**
 * Hani business timezone for operational timestamps.
 * Date-only values never use a timezone.
 */
export const HANI_TIME_ZONE = "Asia/Tehran";

export type DateDisplayStyle = "short" | "medium" | "long" | "full";

const DISPLAY_OPTIONS: Record<DateDisplayStyle, Intl.DateTimeFormatOptions> = {
  short: { day: "2-digit", month: "2-digit", year: "numeric" },
  medium: { day: "numeric", month: "short", year: "numeric" },
  long: { day: "numeric", month: "long", year: "numeric" },
  full: { weekday: "long", day: "numeric", month: "long", year: "numeric" }
};

/** Resolves the configured display calendar from a Hani locale. */
export function resolveCalendar(locale: string): CalendarSystem {
  return locale.split("-")[0] === "fa" ? "persian" : "gregorian";
}

/**
 * Explicit BCP-47 tags prevent browser defaults from silently switching
 * calendars (for example an Arabic locale defaulting to Hijri).
 */
export function displayLocaleTag(locale: string): string {
  switch (locale.split("-")[0]) {
    case "fa":
      return "fa-IR-u-ca-persian";
    case "ar":
      return "ar-u-ca-gregory";
    default:
      return "en-GB-u-ca-gregory";
  }
}

/** Formats a date-only value without any timezone conversion. */
export function formatIsoDate(
  value: string | null | undefined,
  locale: string,
  style: DateDisplayStyle = "medium"
): string {
  if (!value || !isIsoDate(value)) {
    return "";
  }

  return new Intl.DateTimeFormat(displayLocaleTag(locale), {
    ...DISPLAY_OPTIONS[style],
    timeZone: "UTC"
  }).format(new Date(`${value}T00:00:00.000Z`));
}

/** Formats a Gregorian UTC instant in the Hani business timezone. */
export function formatIsoInstant(
  value: string | null | undefined,
  locale: string,
  options: Intl.DateTimeFormatOptions = {
    dateStyle: "medium",
    timeStyle: "short"
  },
  timeZone = HANI_TIME_ZONE
): string {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(displayLocaleTag(locale), {
    ...options,
    timeZone
  }).format(date);
}

/** Formats the weekday of a date-only value. */
export function formatIsoWeekday(
  value: string | null | undefined,
  locale: string
): string {
  if (!value || !isIsoDate(value)) {
    return "";
  }

  return new Intl.DateTimeFormat(displayLocaleTag(locale), {
    weekday: "long",
    timeZone: "UTC"
  }).format(new Date(`${value}T00:00:00.000Z`));
}

/** Returns today's calendar date in the Hani business timezone. */
export function todayIsoDate(timeZone = HANI_TIME_ZONE): IsoDate {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());

  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "";

  return `${part("year")}-${part("month")}-${part("day")}` as IsoDate;
}
