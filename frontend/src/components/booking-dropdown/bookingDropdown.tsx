"use client";
import { useId, useMemo, useState } from "react";

type Location = {
  value: string;
  subValue?: string;
};

type Props = {
  label: string;
  defaultValue: string;
  defaultSubValue: string;
  locations: Location[];
};

export default function BookingDropdown({ label, defaultValue, defaultSubValue, locations }: Props) {
  const [value, setValue] = useState(defaultValue);
  const [subValue, setSubValue] = useState(defaultSubValue);
  const [query, setQuery] = useState("");
  const inputId = useId();

  const visibleLocations = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? locations.filter((loc) => `${loc.value} ${loc.subValue ?? ""}`.toLowerCase().includes(q))
      : locations;
  }, [locations, query]);

  const handleSelect = (loc: Location) => {
    setValue(loc.value);
    setSubValue(loc.subValue ?? "");
  };

  return (
    <div className="booking-dropdown">
      <label className="form-label fs-14 text-default mb-1" htmlFor={inputId}>
        {label}
      </label>

      <input
        id={inputId}
        type="text"
        className="form-control value-input"
        value={value}
        readOnly
        aria-label={label}
      />
      <p className="fs-12 mb-0">{subValue || defaultSubValue}</p>

      <div className="dropdown-menu dropdown-md p-0" onClick={(e) => e.stopPropagation()}>
        <div className="input-search p-3 border-bottom">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search Location"
              aria-label={`${label} search`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="input-group-text px-2 border-start-0">
              <i className="isax isax-search-normal"></i>
            </span>
          </div>
        </div>
        <ul>
          {visibleLocations.map((loc) => (
            <li className="border-bottom" key={`${loc.value}-${loc.subValue ?? ""}`}>
              <a
                href="#"
                className="dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(loc);
                }}
              >
                <div className="fs-16 fw-medium text-dark dropdown-name">{loc.value}</div>
                <p>{loc.subValue}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
