"use client";

import {
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
  type ReactNode
} from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { Calendar, type DateObject } from "react-multi-date-picker";
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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

/**
 * Range input with a locale-aware modal calendar. The displayed values are
 * Jalali in fa and Gregorian in en/ar; onChange always returns Gregorian
 * IsoDates.
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
  const t = useTranslations("common");
  const isMobile = useIsMobile();
  const config = getCalendarPickerConfig(locale);
  const [internalValue, setInternalValue] = useState<HaniDateRange | null>(
    defaultValue
  );
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<DateObject[]>([]);

  const currentValue = value !== undefined ? value : internalValue;
  const minDate = useMemo(
    () =>
      toDateObject(disablePast ? todayIsoDate() : null, locale) ?? undefined,
    [disablePast, locale]
  );

  const formatValue = (iso: IsoDate | null | undefined) =>
    iso ? toDateObject(iso, locale)?.format(config.format) ?? "" : "";

  const startText = formatValue(currentValue?.start);
  const endText = formatValue(currentValue?.end);
  const label =
    startText && endText ? `${startText} - ${endText}` : startText || endText;

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const openPicker = () => {
    if (disabled) {
      return;
    }

    const values = currentValue
      ? [
          toDateObject(currentValue.start, locale),
          toDateObject(currentValue.end, locale)
        ].filter((item): item is DateObject => item !== null)
      : [];
    setDraft(values);
    setOpen(true);
  };

  const confirm = () => {
    if (draft.length < 2) {
      return;
    }

    const start = fromDateObject(draft[0]);
    const end = fromDateObject(draft[1]);
    if (!start || !end) {
      return;
    }

    const next = { start, end };
    if (value === undefined) {
      setInternalValue(next);
    }
    onChange?.(next);
    setOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "ArrowDown") {
      event.preventDefault();
      openPicker();
    }
  };

  const handleDraftChange = (next: DateObject | DateObject[] | null) => {
    const values = Array.isArray(next) ? next : next ? [next] : [];
    setDraft(values);
  };

  const draftStart = draft[0] ? fromDateObject(draft[0]) : null;
  const draftEnd = draft[1] ? fromDateObject(draft[1]) : null;
  const draftLabel =
    draftStart && draftEnd
      ? `${formatValue(draftStart)} - ${formatValue(draftEnd)}`
      : "";

  const fields = (
    <>
      <div className="form-item" onClick={openPicker}>
        {currentValue?.start ? (
          <label className="form-label fs-14 text-default mb-1">
            {fromLabel}
          </label>
        ) : null}
        <input
          type="text"
          role="combobox"
          className={className}
          value={startText}
          data-iso-start={currentValue?.start ?? ""}
          placeholder={fromLabel}
          aria-label={fromLabel}
          aria-haspopup="dialog"
          aria-expanded={open}
          autoComplete="off"
          readOnly
          disabled={disabled}
          onFocus={openPicker}
          onClick={openPicker}
          onKeyDown={handleKeyDown}
        />
        <p className="fs-12 mb-0">
          {formatIsoWeekday(currentValue?.start, locale)}
        </p>
      </div>

      <div className="form-item" onClick={openPicker}>
        {currentValue?.end ? (
          <label className="form-label fs-14 text-default mb-1">
            {toLabel}
          </label>
        ) : null}
        <input
          type="text"
          role="combobox"
          className={className}
          value={endText}
          data-iso-end={currentValue?.end ?? ""}
          placeholder={toLabel}
          aria-label={toLabel}
          aria-haspopup="dialog"
          aria-expanded={open}
          autoComplete="off"
          readOnly
          disabled={disabled}
          onFocus={openPicker}
          onClick={openPicker}
          onKeyDown={handleKeyDown}
        />
        <p className="fs-12 mb-0">
          {formatIsoWeekday(currentValue?.end, locale)}
        </p>
      </div>
    </>
  );

  return (
    <>
      {trigger ? (
        <div onClick={openPicker}>
          {trigger({
            open: openPicker,
            start: currentValue?.start ?? null,
            end: currentValue?.end ?? null,
            startText,
            endText,
            label
          })}
        </div>
      ) : (
        fields
      )}

      {open
        ? createPortal(
            <div
              className="hani-date-modal"
              role="dialog"
              aria-modal="true"
              aria-label={t("selectDate")}
            >
              <button
                type="button"
                className="hani-date-modal__backdrop"
                aria-label={t("close")}
                onClick={() => setOpen(false)}
              />
              <div className="hani-date-modal__card hani-date-modal__card--range">
                <div className="hani-date-modal__header">
                  <div>
                    <strong>{t("selectDate")}</strong>
                  </div>
                  <button
                    type="button"
                    className="hani-date-modal__close"
                    aria-label={t("close")}
                    onClick={() => setOpen(false)}
                  >
                    ×
                  </button>
                </div>

                <div className="hani-date-modal__body">
                  <Calendar
                    value={draft}
                    onChange={handleDraftChange}
                    range
                    numberOfMonths={isMobile ? 1 : 2}
                    calendar={config.calendar}
                    locale={config.locale}
                    format={config.format}
                    minDate={minDate}
                    className="hani-datepicker-calendar"
                    mapDays={({ date }) => ({
                      "aria-label": date.format("dddd D MMMM YYYY")
                    })}
                  />
                </div>

                {presets.length > 0 && (
                  <div className="hani-datepicker-presets d-flex flex-wrap gap-2 px-3 pb-2">
                    {presets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        className="btn btn-sm btn-light"
                        onClick={() => {
                          const next = [
                            toDateObject(preset.range.start, locale),
                            toDateObject(preset.range.end, locale)
                          ].filter((item): item is DateObject => item !== null);
                          setDraft(next);
                        }}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                )}

                <div className="hani-date-modal__footer">
                  <span className="hani-date-modal__value">
                    {draftLabel || t("chooseDates")}
                  </span>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-light rounded-pill"
                      onClick={() => setOpen(false)}
                    >
                      {t("cancel")}
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary rounded-pill px-4"
                      disabled={draft.length < 2}
                      onClick={confirm}
                    >
                      {t("confirm")}
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
