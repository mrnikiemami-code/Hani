"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Slider } from "primereact/slider";

type RangeValue = [number, number];

export interface AppSliderProps {
  min?: number;
  max?: number;
  range?: boolean;
  defaultValue?: number | RangeValue;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  onChange?: (value: number | RangeValue) => void;
}

const AppSlider = ({
  min = 0,
  max = 100,
  range = false,
  defaultValue,
  disabled,
  className = "",
  ariaLabel,
  onChange
}: AppSliderProps) => {
  const [value, setValue] = useState<number | RangeValue>(defaultValue ?? (range ? [min, max] : min));
  const labelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ariaLabel || !containerRef.current) {
      return;
    }

    containerRef.current
      .querySelectorAll(".p-slider-handle")
      .forEach((handle) => handle.setAttribute("aria-label", ariaLabel));
  }, [ariaLabel]);

  return (
    <>
      {ariaLabel && (
        <span id={labelId} className="visually-hidden">
          {ariaLabel}
        </span>
      )}
      <div ref={containerRef}>
        <Slider
        className={`app-slider ${className}`.trim()}
        min={min}
        max={max}
        range={range}
        value={value as number & RangeValue}
        disabled={disabled}
        ariaLabelledBy={ariaLabel ? labelId : undefined}
        onChange={(e) => {
          const next = e.value as number | RangeValue;
          setValue(next);
          onChange?.(next);
        }}
      />
      </div>
    </>
  );
};

export default AppSlider;
