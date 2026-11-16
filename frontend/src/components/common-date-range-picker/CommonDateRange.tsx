"use client";

import type { IsoDate } from "@/lib/hani/calendar";
import { addIsoDays, todayIsoDate } from "@/lib/hani/calendar";
import {
  HaniDateRangePicker,
  type HaniDateRange
} from "@/components/hani/date/HaniDateRangePicker";

interface CommonDateRangeProps {
  onApply?: (start: IsoDate, end: IsoDate) => void;
  fromLabel?: string;
  toLabel?: string;
}

/**
 * Compatibility wrapper for the template's check-in/check-out markup.
 * The visible calendar is Jalali in fa and Gregorian in en/ar; callers
 * receive canonical Gregorian IsoDates.
 */
const CommonDateRange = ({ onApply, fromLabel, toLabel }: CommonDateRangeProps) => {
  const today = todayIsoDate();
  const defaultValue: HaniDateRange = {
    start: today,
    end: addIsoDays(today, 1)
  };

  return (
    <HaniDateRangePicker
      fromLabel={fromLabel}
      toLabel={toLabel}
      defaultValue={defaultValue}
      onChange={(range) => {
        if (range) {
          onApply?.(range.start, range.end);
        }
      }}
    />
  );
};

export default CommonDateRange;
