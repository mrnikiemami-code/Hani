export type PickerValue = Date | null | undefined;

/** Maps the dayjs-style display formats used across the app to PrimeReact Calendar options. */
export const toPrimeDateFormat = (format?: string): { dateFormat: string; hourFormat: "12" | "24" } => {
  const f = format ?? "DD-MM-YYYY";
  const hourFormat = /A|a/.test(f) ? "12" : "24";
  const dateFormat = f
    .replace(/YYYY/g, "yy")
    .replace(/MMMM/g, "MM")
    .replace(/MMM/g, "M")
    .replace(/DD/g, "dd")
    .replace(/\bD\b/g, "d")
    .replace(/\bM\b/g, "m")
    .replace(/MM/g, "mm");
  return { dateFormat, hourFormat };
};

/** "10:30 AM" -> Date today at 10:30 (replaces dayjs("10:30 AM", "h:mm A")). */
export const parseTime = (text: string): Date => {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i.exec(text.trim());
  const d = new Date();
  if (!m) return d;
  let h = Number(m[1]) % 12;
  if ((m[3] ?? "").toUpperCase() === "PM") h += 12;
  d.setHours(h, Number(m[2]), 0, 0);
  return d;
};
