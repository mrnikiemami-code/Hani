"use client";
import { useRef, useState } from "react";
import { Calendar } from "primereact/calendar";
import { endOfMonth, format, startOfMonth, subDays, subMonths } from "date-fns";

type Range = [Date, Date];

const buildPresets = (): Array<{ label: string; range: Range }> => {
  const today = new Date();
  return [
    { label: "Today", range: [today, today] },
    { label: "Yesterday", range: [subDays(today, 1), subDays(today, 1)] },
    { label: "Last 7 Days", range: [subDays(today, 6), today] },
    { label: "Last 30 Days", range: [subDays(today, 29), today] },
    { label: "This Month", range: [startOfMonth(today), endOfMonth(today)] },
    { label: "Last Month", range: [startOfMonth(subMonths(today, 1)), endOfMonth(subMonths(today, 1))] },
  ];
};

const DISPLAY_FORMAT = "MM/dd/yyyy";

const PredefinedDateRanges = () => {
  const [range, setRange] = useState<Range>(() => [subDays(new Date(), 29), new Date()]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const apply = (next: Range) => {
    setRange(next);
    setOpen(false);
  };

  const label = `${format(range[0], DISPLAY_FORMAT)} - ${format(range[1], DISPLAY_FORMAT)}`;

  return (
    <div ref={wrapperRef} className="position-relative">
      <div
        id="reportrange"
        className="col-4"
        style={{
          background: "#fff",
          cursor: "pointer",
          padding: "0.5rem 0.625rem",
          border: "1px solid #E9EDF4",
          width: "100%",
          borderRadius: "5px",
          fontSize: "14px",
          color: "#202C4B",
          height: "38px",
        }}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{label}</span>
      </div>
      <Calendar
        selectionMode="range"
        className="range-hidden-input"
        visible={open}
        onVisibleChange={() => setOpen(false)}
        value={range}
        onChange={(e) => {
          const v = e.value as (Date | null)[] | null;
          if (v && v[0] && v[1]) apply([v[0], v[1]]);
        }}
        numberOfMonths={2}
        appendTo="self"
        inputStyle={{ position: "absolute", opacity: 0, pointerEvents: "none", height: 0 }}
        footerTemplate={() => (
          <div className="d-flex flex-wrap gap-2 pt-2">
            {buildPresets().map((preset) => (
              <button key={preset.label} type="button" className="btn btn-sm btn-light" onClick={() => apply(preset.range)}>
                {preset.label}
              </button>
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default PredefinedDateRanges;
