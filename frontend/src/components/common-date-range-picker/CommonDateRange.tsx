"use client";
import { useState } from "react";
import { Calendar } from "primereact/calendar";
import { addDays, format } from "date-fns";
import { ar, enUS, faIR } from "date-fns/locale";
import { useLocale } from "next-intl";

interface CommonDateRangeProps {
  onApply?: (start: Date, end: Date) => void;
  fromLabel?: string;
  toLabel?: string;
}

/**
 * Check-in / check-out pair rendered as two sibling `.form-item`s (same markup as the HTML
 * template's `.check-in` / `.check-out` inputs) with a PrimeReact range calendar as the popup.
 */
const CommonDateRange = ({ onApply, fromLabel, toLabel }: CommonDateRangeProps) => {
  const locale = useLocale();
  const dateLocale = locale === "fa" ? faIR : locale === "ar" ? ar : enUS;
  const today = new Date();

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(() => addDays(today, 1));
  const [open, setOpen] = useState(false);

  const handleChange = (dates: (Date | null)[] | null | undefined) => {
    if (!dates || !dates[0] || !dates[1]) return;
    const [start, end] = dates as [Date, Date];
    setStartDate(start);
    setEndDate(end);
    setOpen(false);
    onApply?.(start, end);
  };

  return (
    <>
      <div className="form-item" onClick={() => setOpen(true)}>
        <label className="form-label fs-14 text-default mb-1">{fromLabel}</label>
        <input type="text" className="form-control check-in" value={format(startDate, "dd-MM-yyyy")} readOnly />
        <p className="fs-12 mb-0">{format(startDate, "EEEE", { locale: dateLocale })}</p>
      </div>

      <div className="form-item" onClick={() => setOpen(true)}>
        <label className="form-label fs-14 text-default mb-1">{toLabel}</label>
        <input type="text" className="form-control check-out" value={format(endDate, "dd-MM-yyyy")} readOnly />
        <p className="fs-12 mb-0">{format(endDate, "EEEE", { locale: dateLocale })}</p>
      </div>

      <Calendar
        selectionMode="range"
        className="date-range-hidden"
        visible={open}
        onVisibleChange={() => setOpen(false)}
        value={[startDate, endDate]}
        onChange={(e) => handleChange(e.value as (Date | null)[] | null)}
        dateFormat="dd-mm-yy"
        minDate={today}
        appendTo="self"
        inputStyle={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
      />
    </>
  );
};

export default CommonDateRange;
