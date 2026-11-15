"use client";
import { useState } from "react";
import { Slider } from "primereact/slider";

type RangeValue = [number, number];

export interface AppSliderProps {
  min?: number;
  max?: number;
  range?: boolean;
  defaultValue?: number | RangeValue;
  disabled?: boolean;
  className?: string;
  onChange?: (value: number | RangeValue) => void;
}

const AppSlider = ({ min = 0, max = 100, range = false, defaultValue, disabled, className = "", onChange }: AppSliderProps) => {
  const [value, setValue] = useState<number | RangeValue>(defaultValue ?? (range ? [min, max] : min));

  return (
    <Slider
      className={`app-slider ${className}`.trim()}
      min={min}
      max={max}
      range={range}
      value={value as number & RangeValue}
      disabled={disabled}
      onChange={(e) => {
        const next = e.value as number | RangeValue;
        setValue(next);
        onChange?.(next);
      }}
    />
  );
};

export default AppSlider;
