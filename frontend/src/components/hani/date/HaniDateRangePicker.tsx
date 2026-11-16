"use client";

import {
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode
} from "react";
import { useLocale } from "next-intl";
import DatePicker from "react-multi-date-picker";
import type { IsoDate } from "@/lib/hani/calendar";
import { addIsoDays, formatIsoWeekday, todayIsoDate } from "@/lib/hani/calendar";
import {
  fromDateObject,
  getCalendarPickerConfig,
  toDateObject
} from "@/lib/hani/calendar/date-object";

export type HaniDateRange = {
  start: IsoDate;
  end: IsoDate;
};

export type HaniDateRangePreset = {
  label: string;
  range: HaniDateRange;
};

export type HaniDateRangeTriggerState = {
  open: () => void;
  start: IsoDate | null;
  end: IsoDate | null;
  startText: string;
  endText: string;
  label: string;
};

export type HaniDateRangePickerProps = {
  value?: HaniDateRange | null;
  defaultValue?: HaniDateRange | null;
  onChange?: (value: HaniDateRange | null) => void;
  fromLabel?: string;
  toLabel?: string;
  disablePast?: boolean;
  disabled?: boolean;
  className?: string;
  presets?: HaniDateRangePreset[];
  /** Optional single-control trigger, used by dashboard range boxes. */
  trigger?: (state: HaniDateRangeTriggerState) => ReactNode;
};

type PickerRef = {
  openCalendar?: () => void;
  closeCalendar?: () => void;
};

/**
 * Range input with a locale-aware calendar. The displayed values are Jalali
 * in fa and Gregorian in en/ar; onChange always returns Gregorian IsoDates.
 */
export function HaniDateRangePicker({
  value,
  defaultValue = null,
  onChange,
  fromLabel,
  toLabel,
  disablePast = false,
  disabled = false,
  className = "form-control",
  presets = [],
  trigger
}: HaniDateRangePickerProps) {
  const locale = useLocale();
  const config = getCalendarPickerConfig(locale);
  const pickerRef = useRef<PickerRef | null>(null);
  const [internalValue, setInternalValue] = useState<HaniDateRange | null>(
    defaultValue
  );

  const currentValue = value !== undefined ? value : internalValue;
  const rangeObjects = useMemo(() => {
    if (!currentValue) {
      return [];
    }

    const start = toDateObject(currentValue.start, locale);
    const end = toDateObject(currentValue.end, locale);
    return start && end ? [start, end] : [];
  }, [currentValue, locale]);
  const minDate = useMemo(
    () =>
      toDateObject(
        disablePast ? todayIsoDate() : null,
        locale
      ) ?? undefined,
    [disablePast, locale]
  );

  const formatValue = (iso: IsoDate | null | undefined) =>
    iso ? toDateObject(iso, locale)?.format(config.format) ?? "" : "";

  const startText = formatValue(currentValue?.start);
  const endText = formatValue(currentValue?.end);
  const label =
    startText && endText ? `${startText} - ${endText}` : startText || endText;

  const open = () => {
    if (!disabled) {
      pickerRef.current?.openCalendar?.();
    }
  };

  const apply = (next: HaniDateRange) => {
    if (value === undefined) {
      setInternalValue(next);
    }
    onChange?.(next);
    pickerRef.current?.closeCalendar?.();
  };

  const handleChange = (dates: Parameters<typeof fromDateObject>[0][]) => {
    const start = fromDateObject(dates[0]);
    if (!start) {
      return;
    }

    if (dates.length === 1) {
      const end =
        currentValue?.end && currentValue.end > start
          ? currentValue.end
          : addIsoDays(start, 1);
      const next = { start, end };
      if (value === undefined) {
        setInternalValue(next);
      }
      return;
    }

    const end = fromDateObject(dates[1]);
    if (!end) {
      return;
    }

    const next = { start, end };
    if (value === undefined) {
      setInternalValue(next);
    }

    onChange?.(next);
    pickerRef.current?.closeCalendar?.();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "ArrowDown") {
      event.preventDefault();
      open();
    }
  };

  return (
    <DatePicker
      ref={pickerRef as never}
      value={rangeObjects}
      onChange={handleChange as never}
      range
      calendar={config.calendar}
      locale={config.locale}
      format={config.format}
      minDate={minDate}
      calendarPosition={config.isRtl ? "bottom-right" : "bottom-start"}
      containerClassName="hani-date-range-picker"
      className="hani-datepicker-calendar"
      editable={false}
      disabled={disabled}
      mapDays={({ date }) => ({
        "aria-label": date.format("dddd D MMMM YYYY")
      })}
      render={(_displayValue, openCalendar) =>
        trigger ? (
          <div onClick={openCalendar}>
            {trigger({
              open: openCalendar,
              start: currentValue?.start ?? null,
              end: currentValue?.end ?? null,
              startText,
              endText,
              label
            })}
          </div>
        ) : (
          <>
            <div className="form-item" onClick={openCalendar}>
              <label className="form-label fs-14 text-default mb-1">
                {fromLabel}
              </label>
              <input
                type="text"
                className={className}
                value={startText}
                data-iso-start={currentValue?.start ?? ""}
                placeholder={fromLabel}
                aria-label={fromLabel}
                aria-haspopup="dialog"
                autoComplete="off"
                readOnly
                disabled={disabled}
                onFocus={openCalendar}
                onClick={openCalendar}
                onKeyDown={handleKeyDown}
              />
              <p className="fs-12 mb-0">
                {formatIsoWeekday(currentValue?.start, locale)}
              </p>
            </div>

            <div className="form-item" onClick={openCalendar}>
              <label className="form-label fs-14 text-default mb-1">
                {toLabel}
              </label>
              <input
                type="text"
                className={className}
                value={endText}
                data-iso-end={currentValue?.end ?? ""}
                placeholder={toLabel}
                aria-label={toLabel}
                aria-haspopup="dialog"
                autoComplete="off"
                readOnly
                disabled={disabled}
                onFocus={openCalendar}
                onClick={openCalendar}
                onKeyDown={handleKeyDown}
              />
              <p className="fs-12 mb-0">
                {formatIsoWeekday(currentValue?.end, locale)}
              </p>
            </div>
          </>
        )
      }
    >
      {presets.length > 0 ? (
        <div className="hani-datepicker-presets d-flex flex-wrap gap-2 p-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              className="btn btn-sm btn-light"
              onClick={() => apply(preset.range)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      ) : null}
    </DatePicker>
  );
}
