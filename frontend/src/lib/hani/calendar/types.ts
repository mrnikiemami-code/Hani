/**
 * Canonical date/time types used at every Hani boundary.
 *
 * IsoDate is a Gregorian calendar date with no time and no timezone:
 * "2026-11-16". It is the only date-only value that may cross the API,
 * URL query, cache, or database boundary.
 */
export type IsoDate = string & { readonly __brand: "IsoDate" };

/** Gregorian UTC instant, for example "2026-11-16T12:30:00.000Z". */
export type IsoInstant = string & { readonly __brand: "IsoInstant" };

/** Time-only value with no calendar, for example "09:30". */
export type IsoTime = string & { readonly __brand: "IsoTime" };

export type CalendarSystem = "persian" | "gregorian";

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Returns true when value is a real Gregorian YYYY-MM-DD date. */
export function isIsoDate(value: unknown): value is IsoDate {
  if (typeof value !== "string") {
    return false;
  }

  const match = ISO_DATE_PATTERN.exec(value);
  if (!match) {
    return false;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (year < 1000 || year > 9999 || month < 1 || month > 12 || day < 1) {
    return false;
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/** Converts a string to IsoDate or throws on an invalid Gregorian date. */
export function asIsoDate(value: string): IsoDate {
  if (!isIsoDate(value)) {
    throw new RangeError(`Invalid Gregorian ISO date: ${value}`);
  }

  return value;
}

/** Builds an IsoDate from Gregorian year/month/day parts. */
export function isoDateFromParts(
  year: number,
  month: number,
  day: number
): IsoDate {
  return asIsoDate(
    `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`
  );
}

/** Adds calendar days to a date-only value without timezone conversion. */
export function addIsoDays(value: IsoDate, days: number): IsoDate {
  const date = new Date(`${value}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return isoDateFromParts(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate()
  );
}
