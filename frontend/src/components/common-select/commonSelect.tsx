"use client";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";

export interface OptionType {
  label: string;
  value: string | number;
}

interface CustomDropdownProps {
  options: OptionType[];
  defaultValue?: OptionType;
  className?: string;
  placeholder?: string;
  /** Render the overlay inside the dropdown wrapper so it stays within a Bootstrap modal */
  modal?: boolean;
}

const CustomSelect = ({ options, defaultValue, className = "", placeholder, modal }: CustomDropdownProps) => {
  const [value, setValue] = useState<string | number | undefined>(defaultValue?.value);

  return (
    <Dropdown
      className={`app-select ${className}`.trim()}
      value={value}
      options={options}
      optionLabel="label"
      optionValue="value"
      placeholder={placeholder}
      onChange={(e) => setValue(e.value)}
      appendTo={modal ? "self" : undefined}
      dropdownIcon="app-select-arrow"
      style={{ width: "100%" }}
    />
  );
};

export default CustomSelect;
