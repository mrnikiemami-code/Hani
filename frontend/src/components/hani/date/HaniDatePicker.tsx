"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import { useLocale } from "next-intl";
import DatePicker from "react-multi-date-picker";
import type { IsoDate } from "@/lib/hani/calendar";
import { todayIsoDate } from "@/lib/hani/calendar";
import {
  fromDateObject,
  getCalendarPickerConfig,
  toDateObject
} from "@/lib/hani/calendar/date-object";

export type HaniDatePickerProps = {
  id?: string;
  className?: string;
  placeholder?: string;
  value?: IsoDate | null;
  defaultValue?: IsoDate | null;
  onChange?: (value: IsoDate | null) => void;
  disablePast?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  min?: IsoDate;
  max?: IsoDate;
  editable?: boolean;
};

/**
 * Single-date input whose display calendar follows the active locale:
 * Persian for fa, Gregorian for en/ar. The public value is always a
 * Gregorian IsoDate; no Jalali value can leave this boundary.
 */
export function HaniDatePicker({
  id,
  className = "form-control datetimepicker",
  placeholder,
  value,
  defaultValue = null,
  onChange,
  disablePast = false,
  disabled = false,
  ariaLabel,
  min,
  max,
  editable = true
}: HaniDatePickerProps) {
  const locale = useLocale();
  const config = getCalendarPickerConfig(locale);
  const [internalValue, setInternalValue] = useState<IsoDate | null>(
    defaultValue
  );

  const currentValue = value !== undefined ? value : internalValue;
  const dateObject = useMemo(
    () => toDateObject(currentValue, locale),
    [currentValue, locale]
  );
  const minDate = useMemo(
    () =>
      toDateObject(
        min ?? (disablePast ? todayIsoDate() : null),
        locale
      ) ?? undefined,
    [disablePast, locale, min]
  );
  const maxDate = useMemo(
    () => toDateObject(max ?? null, locale) ?? undefined,
    [locale, max]
  );

  const handleChange = (next: Parameters<typeof fromDateObject>[0]) => {
    const iso = fromDateObject(next);
    if (value === undefined) {
      setInternalValue(iso);
    }
    onChange?.(iso);
  };

  return (
    <DatePicker
      value={dateObject}
      onChange={handleChange}
      calendar={config.calendar}
      locale={config.locale}
      format={config.format}
      minDate={minDate}
      maxDate={maxDate}
      calendarPosition={config.isRtl ? "bottom-right" : "bottom-start"}
      containerClassName="hani-date-picker"
      className="hani-datepicker-calendar"
      editable={editable}
      disabled={disabled}
      mapDays={({ date }) => ({
        "aria-label": date.format("dddd D MMMM YYYY")
      })}
      inputMode={editable ? "text" : "none"}
      render={(displayValue, openCalendar, handleValueChange) => {
        const open = () => {
          if (!disabled) {
            openCalendar();
          }
        };
        const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter" || event.key === "ArrowDown") {
            event.preventDefault();
            open();
          }
        };

        return (
          <input
            id={id}
            type="text"
            className={className}
            value={displayValue ?? ""}
            data-iso-value={currentValue ?? ""}
            placeholder={placeholder}
            aria-label={ariaLabel ?? placeholder}
            aria-haspopup="dialog"
            autoComplete="off"
            readOnly={!editable}
            disabled={disabled}
            onFocus={open}
            onClick={open}
            onKeyDown={handleKeyDown}
            onChange={handleValueChange}
          />
        );
      }}
    />
  );
}
