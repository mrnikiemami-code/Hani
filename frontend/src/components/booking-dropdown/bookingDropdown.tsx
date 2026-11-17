"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type UIEvent
} from "react";
import { createPortal } from "react-dom";
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
const MENU_MAX_HEIGHT = 320;
const MENU_MIN_HEIGHT = 180;

/**
 * Self-contained searchable dropdown used by the home hero. The menu is
 * portaled to the body with fixed positioning so page scroll, redirects, and
 * ancestor overflow cannot hide it. It always opens below the trigger.
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
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
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

  const updatePosition = () => {
    const rect = inputRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    const width = Math.min(
      Math.max(320, rect.width),
      Math.max(320, window.innerWidth - 24)
    );
    const left = Math.min(
      Math.max(12, rect.left),
      Math.max(12, window.innerWidth - width - 12)
    );
    const top = rect.bottom + 6;
    const available = window.innerHeight - top - 12;
    const maxHeight = Math.max(
      MENU_MIN_HEIGHT,
      Math.min(MENU_MAX_HEIGHT, available)
    );

    setMenuStyle({
      position: "fixed",
      top,
      left,
      width,
      maxHeight,
      zIndex: 4000
    });
  };

  const openMenu = () => {
    const rect = inputRef.current?.getBoundingClientRect();
    if (rect) {
      const needed = MENU_MAX_HEIGHT + 20 - (window.innerHeight - rect.bottom);
      if (needed > 0) {
        window.scrollBy({ top: needed, behavior: "auto" });
      }
    }

    setOpen(true);
  };

  const toggleMenu = () => {
    if (open) {
      setOpen(false);
    } else {
      openMenu();
    }
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    updatePosition();
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !rootRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const frame = window.requestAnimationFrame(updatePosition);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

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

  const menu = (
    <div
      ref={menuRef}
      id={menuId}
      className="dropdown-menu dropdown-md p-0 show hani-booking-dropdown-menu"
      style={menuStyle}
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
  );

  return (
    <div className="booking-dropdown dropdown" ref={rootRef}>
      <label className="form-label fs-14 text-default mb-1" htmlFor={inputId}>
        {label}
      </label>

      <input
        ref={inputRef}
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

      {open && typeof document !== "undefined"
        ? createPortal(menu, document.body)
        : null}
    </div>
  );
}
