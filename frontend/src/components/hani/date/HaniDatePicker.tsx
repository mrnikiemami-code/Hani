"use client";

import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { Calendar, type DateObject } from "react-multi-date-picker";
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
};

/**
 * Single-date input whose display calendar follows the active locale.
 * The picker is a centered modal (matching the Lastsecond interaction) while
 * the public value remains a Gregorian IsoDate.
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
  max
}: HaniDatePickerProps) {
  const locale = useLocale();
  const t = useTranslations("common");
  const config = getCalendarPickerConfig(locale);
  const [internalValue, setInternalValue] = useState<IsoDate | null>(
    defaultValue
  );
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<DateObject | null>(null);

  const currentValue = value !== undefined ? value : internalValue;
  const displayed = useMemo(
    () => toDateObject(currentValue, locale)?.format(config.format) ?? "",
    [config.format, currentValue, locale]
  );
  const minDate = useMemo(
    () =>
      toDateObject(min ?? (disablePast ? todayIsoDate() : null), locale) ??
      undefined,
    [disablePast, locale, min]
  );
  const maxDate = useMemo(
    () => toDateObject(max ?? null, locale) ?? undefined,
    [locale, max]
  );

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

    setDraft(toDateObject(currentValue, locale));
    setOpen(true);
  };

  const confirm = () => {
    const iso = fromDateObject(draft);
    if (value === undefined) {
      setInternalValue(iso);
    }
    onChange?.(iso);
    setOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "ArrowDown") {
      event.preventDefault();
      openPicker();
    }
  };

  return (
    <>
      <input
        id={id}
        type="text"
        className={className}
        value={displayed}
        data-iso-value={currentValue ?? ""}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        aria-haspopup="dialog"
        aria-expanded={open}
        autoComplete="off"
        readOnly
        disabled={disabled}
        onFocus={openPicker}
        onClick={openPicker}
        onKeyDown={handleKeyDown}
      />

      {open
        ? createPortal(
            <div
              className="hani-date-modal"
              role="dialog"
              aria-modal="true"
              aria-label={ariaLabel ?? t("selectDate")}
            >
              <button
                type="button"
                className="hani-date-modal__backdrop"
                aria-label={t("close")}
                onClick={() => setOpen(false)}
              />
              <div className="hani-date-modal__card">
                <div className="hani-date-modal__header">
                  <div>
                    <span className="hani-date-modal__eyebrow">
                      {t("selectDate")}
                    </span>
                    <strong>{placeholder ?? t("selectDate")}</strong>
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
                    onChange={(next) => setDraft(next as DateObject | null)}
                    calendar={config.calendar}
                    locale={config.locale}
                    format={config.format}
                    minDate={minDate}
                    maxDate={maxDate}
                    className="hani-datepicker-calendar"
                    mapDays={({ date }) => ({
                      "aria-label": date.format("dddd D MMMM YYYY")
                    })}
                  />
                </div>

                <div className="hani-date-modal__footer">
                  <span className="hani-date-modal__value">
                    {draft ? draft.format(config.format) : ""}
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
                      disabled={!draft}
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
