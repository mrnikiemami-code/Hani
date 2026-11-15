"use client";
import { forwardRef, useMemo, useState } from "react";
import { Calendar, type CalendarProps } from "primereact/calendar";
import { toPrimeDateFormat } from "../../utils/dateFormat";

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

type ChangeEvent = Parameters<NonNullable<CalendarProps["onChange"]>>[0];

const createPicker = (timeOnly: boolean) =>
  forwardRef<Calendar, AppPickerProps>(function AppPicker(
    { id, className = "", placeholder, format, defaultValue = null, value, onChange, disablePast, disabled, ariaLabel },
    ref,
  ) {
    const { dateFormat, hourFormat } = useMemo(() => toPrimeDateFormat(format), [format]);
    const minDate = useMemo(() => (disablePast ? startOfToday() : undefined), [disablePast]);
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
        timeOnly={timeOnly}
        minDate={minDate}
        disabled={disabled}
        appendTo="self"
        aria-label={ariaLabel}
        value={current}
        onChange={handleChange}
      />
    );
  });

export const DatePicker = createPicker(false);
export const TimePicker = createPicker(true);
