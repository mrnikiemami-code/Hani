"use client";

import { forwardRef, useMemo, useState } from "react";
import { Calendar, type CalendarProps } from "primereact/calendar";
import { toPrimeDateFormat } from "../../utils/dateFormat";
import { HaniDatePicker } from "@/components/hani/date/HaniDatePicker";
import type { IsoDate } from "@/lib/hani/calendar";
import { isoDateFromParts } from "@/lib/hani/calendar";

export interface AppPickerProps {
  id?: string;
  className?: string;
  placeholder?: string;
  /** Display format, e.g. "DD-MM-YYYY" (date picker) or "h:mm A" (time picker) */
  format?: string;
  defaultValue?: Date | null;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  /** Disallow dates before today */
  disablePast?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const toIsoDate = (value: Date | null | undefined): IsoDate | null =>
  value
    ? isoDateFromParts(
        value.getFullYear(),
        value.getMonth() + 1,
        value.getDate()
      )
    : null;

const toLocalDate = (value: IsoDate | null): Date | null => {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Legacy template date picker facade.
 *
 * New Hani code must use HaniDatePicker with IsoDate values directly. This
 * facade keeps the template's many Date-based call sites working while the
 * visible calendar follows the locale (Jalali for fa).
 */
export function DatePicker({
  id,
  className,
  placeholder,
  defaultValue = null,
  value,
  onChange,
  disablePast,
  disabled,
  ariaLabel
}: AppPickerProps) {
  const [inner, setInner] = useState<Date | null>(defaultValue);
  const current = value !== undefined ? value : inner;

  return (
    <HaniDatePicker
      id={id}
      className={className}
      placeholder={placeholder}
      value={toIsoDate(current)}
      onChange={(next) => {
        const date = toLocalDate(next);
        if (value === undefined) {
          setInner(date);
        }
        onChange?.(date);
      }}
      disablePast={disablePast}
      disabled={disabled}
      ariaLabel={ariaLabel}
    />
  );
}

type ChangeEvent = Parameters<NonNullable<CalendarProps["onChange"]>>[0];

/** Time-only picker; time has no calendar and stays on the existing control. */
export const TimePicker = forwardRef<Calendar, AppPickerProps>(
  function TimePicker(
    {
      id,
      className = "",
      placeholder,
      format,
      defaultValue = null,
      value,
      onChange,
      disablePast,
      disabled,
      ariaLabel
    },
    ref
  ) {
    const { dateFormat, hourFormat } = useMemo(
      () => toPrimeDateFormat(format),
      [format]
    );
    const minDate = useMemo(
      () => (disablePast ? startOfToday() : undefined),
      [disablePast]
    );
    const [inner, setInner] = useState<Date | null>(defaultValue);
    const current = value !== undefined ? value : inner;

    const handleChange = (e: ChangeEvent) => {
      const next = (e.value as Date | null) ?? null;
      setInner(next);
      onChange?.(next);
    };

    return (
      <Calendar
        ref={ref}
        inputId={id}
        inputClassName={className}
        className="app-picker"
        placeholder={placeholder}
        dateFormat={dateFormat}
        hourFormat={hourFormat}
        timeOnly
        minDate={minDate}
        disabled={disabled}
        appendTo="self"
        aria-label={ariaLabel}
        value={current}
        onChange={handleChange}
      />
    );
  }
);
