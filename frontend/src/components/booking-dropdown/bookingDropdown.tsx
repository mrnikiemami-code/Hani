"use client";

import { useEffect, useId, useMemo, useRef, useState, type UIEvent } from "react";
import { useTranslations } from "next-intl";

type Location = {
  value: string;
  subValue?: string;
};

type Props = {
  label: string;
  defaultValue: string;
  defaultSubValue: string;
  locations: Location[];
  pageSize?: number;
};

const DEFAULT_PAGE_SIZE = 8;

/**
 * Self-contained searchable dropdown used by the home hero. The menu is
 * independent of Bootstrap's global dropdown handler so it also works inside
 * Hani-owned forms that do not use the template's data-bs-toggle wrapper.
 */
export default function BookingDropdown({
  label,
  defaultValue,
  defaultSubValue,
  locations,
  pageSize = DEFAULT_PAGE_SIZE
}: Props) {
  const t = useTranslations("common");
  const [value, setValue] = useState(defaultValue);
  const [subValue, setSubValue] = useState(defaultSubValue);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(pageSize);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const menuId = useId();

  const filteredLocations = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? locations.filter((loc) =>
          `${loc.value} ${loc.subValue ?? ""}`.toLowerCase().includes(q)
        )
      : locations;
  }, [locations, query]);

  const visibleLocations = filteredLocations.slice(0, limit);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const openMenu = () => {
    setOpen(true);
  };

  const toggleMenu = () => {
    if (open) {
      setOpen(false);
    } else {
      openMenu();
    }
  };

  const handleSelect = (loc: Location) => {
    setValue(loc.value);
    setSubValue(loc.subValue ?? "");
    setQuery("");
    setOpen(false);
  };

  const handleScroll = (event: UIEvent<HTMLUListElement>) => {
    if (limit >= filteredLocations.length) {
      return;
    }

    const target = event.currentTarget;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 12) {
      setLimit((current) => current + pageSize);
    }
  };

  return (
    <div className="booking-dropdown dropdown" ref={rootRef}>
      <label className="form-label fs-14 text-default mb-1" htmlFor={inputId}>
        {label}
      </label>

      <input
        id={inputId}
        type="text"
        className="form-control value-input"
        value={value}
        readOnly
        role="combobox"
        aria-label={label}
        aria-expanded={open}
        aria-controls={menuId}
        aria-autocomplete="list"
        onClick={toggleMenu}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === "ArrowDown") {
            event.preventDefault();
            openMenu();
          }
        }}
      />
      <p className="fs-12 mb-0">{subValue || defaultSubValue}</p>

      <div
        id={menuId}
        className={`dropdown-menu dropdown-md p-0 ${open ? "show" : ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="input-search p-3 border-bottom">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder={t("search")}
              aria-label={`${label} ${t("search")}`}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setLimit(pageSize);
              }}
            />
            <span className="input-group-text px-2 border-start-0">
              <i className="isax isax-search-normal"></i>
            </span>
          </div>
        </div>
        <ul role="listbox" aria-label={label} onScroll={handleScroll}>
          {visibleLocations.map((loc) => (
            <li
              className="border-bottom"
              key={`${loc.value}-${loc.subValue ?? ""}`}
              role="option"
              aria-selected={value === loc.value}
            >
              <a
                href="#"
                className="dropdown-item"
                onClick={(event) => {
                  event.preventDefault();
                  handleSelect(loc);
                }}
              >
                <div className="fs-16 fw-medium text-dark dropdown-name">
                  {loc.value}
                </div>
                <p>{loc.subValue}</p>
              </a>
            </li>
          ))}
          {visibleLocations.length === 0 && (
            <li className="p-3 text-gray-6">{t("noResults")}</li>
          )}
        </ul>
      </div>
    </div>
  );
}
