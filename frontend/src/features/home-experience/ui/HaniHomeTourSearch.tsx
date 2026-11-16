"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import BookingDropdown from "@/components/booking-dropdown/bookingDropdown";
import { HaniDateRangePicker } from "@/components/hani/date/HaniDateRangePicker";
import { HaniDatePicker } from "@/components/hani/date/HaniDatePicker";
import { addIsoDays, todayIsoDate } from "@/lib/hani/calendar";

type Scope = "foreign" | "domestic";

type SearchOptions = {
  origins: string[];
  destinations: string[];
  durations: number[];
  hotels: string[];
};

const emptyOptions: SearchOptions = {
  origins: [],
  destinations: [],
  durations: [],
  hotels: []
};

export function HaniHomeTourSearch() {
  const t = useTranslations("homeSearch");
  const locale = useLocale();
  const [scope, setScope] = useState<Scope>("foreign");
  const [options, setOptions] = useState<SearchOptions>(emptyOptions);
  const foreignTab = useRef<HTMLAnchorElement>(null);
  const domesticTab = useRef<HTMLAnchorElement>(null);
  const today = todayIsoDate();

  useEffect(() => {
    let active = true;

    fetch(
      `/api/home/search-options?locale=${encodeURIComponent(locale)}&scope=${
        scope === "foreign" ? "Foreign" : "Domestic"
      }`,
      { cache: "no-store" }
    )
      .then((response) => (response.ok ? response.json() : emptyOptions))
      .then((data: SearchOptions) => {
        if (active) {
          setOptions(data);
        }
      })
      .catch(() => {
        if (active) {
          setOptions(emptyOptions);
        }
      });

    return () => {
      active = false;
    };
  }, [locale, scope]);

  const locationOptions = (values: string[]) => [
    { value: t("all"), subValue: "" },
    ...values.map((value) => ({ value, subValue: "" }))
  ];

  const handleTab = (event: MouseEvent<HTMLAnchorElement>, next: Scope) => {
    event.preventDefault();
    setScope(next);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const next: Scope = scope === "foreign" ? "domestic" : "foreign";
    setScope(next);
    (next === "foreign" ? foreignTab : domesticTab).current?.focus();
  };

  return (
    <div>
      <ul
        className="nav mb-3"
        role="tablist"
        aria-label={t("scopeLabel")}
        onKeyDown={handleKeyDown}
      >
        <li role="presentation">
          <a
            ref={foreignTab}
            href="#"
            id="tour-scope-foreign"
            role="tab"
            aria-selected={scope === "foreign"}
            aria-controls="tour-scope-panel-foreign"
            tabIndex={scope === "foreign" ? 0 : -1}
            className={`nav-link ${scope === "foreign" ? "active" : ""}`}
            onClick={(event) => handleTab(event, "foreign")}
          >
            {t("foreignTours")}
          </a>
        </li>
        <li role="presentation">
          <a
            ref={domesticTab}
            href="#"
            id="tour-scope-domestic"
            role="tab"
            aria-selected={scope === "domestic"}
            aria-controls="tour-scope-panel-domestic"
            tabIndex={scope === "domestic" ? 0 : -1}
            className={`nav-link ${scope === "domestic" ? "active" : ""}`}
            onClick={(event) => handleTab(event, "domestic")}
          >
            {t("domesticTours")}
          </a>
        </li>
      </ul>

      {scope === "foreign" ? (
        <form
          id="tour-scope-panel-foreign"
          role="tabpanel"
          aria-labelledby="tour-scope-foreign"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="d-lg-flex">
            <div className="d-flex form-info flex-wrap">
              <div className="form-item min-w-0">
                <BookingDropdown
                  label={t("origin")}
                  defaultValue={t("all")}
                  defaultSubValue=""
                  locations={locationOptions(options.origins)}
                />
              </div>
              <div className="form-item min-w-0">
                <BookingDropdown
                  label={t("destination")}
                  defaultValue={t("all")}
                  defaultSubValue=""
                  locations={locationOptions(options.destinations)}
                />
              </div>
              <HaniDateRangePicker
                fromLabel={t("departure")}
                toLabel={t("return")}
                defaultValue={{ start: today, end: addIsoDays(today, 1) }}
              />
              <div className="form-item min-w-0">
                <BookingDropdown
                  label={t("duration")}
                  defaultValue={t("anyDuration")}
                  defaultSubValue={t("nights")}
                  locations={[
                    { value: t("anyDuration"), subValue: "" },
                    ...options.durations.map((value) => ({
                      value: String(value),
                      subValue: t("nights")
                    }))
                  ]}
                />
              </div>
              <div className="form-item min-w-0">
                <BookingDropdown
                  label={t("hotel")}
                  defaultValue={t("all")}
                  defaultSubValue=""
                  locations={locationOptions(options.hotels)}
                />
              </div>
            </div>
            <Link
              href="/tours?scope=foreign"
              className="btn btn-primary search-btn rounded"
            >
              {t("search")}
            </Link>
          </div>
        </form>
      ) : (
        <form
          id="tour-scope-panel-domestic"
          role="tabpanel"
          aria-labelledby="tour-scope-domestic"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="d-lg-flex">
            <div className="d-flex form-info flex-wrap">
              <div className="form-item min-w-0">
                <BookingDropdown
                  label={t("cityOrType")}
                  defaultValue={t("all")}
                  defaultSubValue=""
                  locations={locationOptions(options.destinations)}
                />
              </div>
              <div className="form-item min-w-0">
                <label className="form-label fs-14 text-default mb-1" htmlFor="tour-departure">
                  {t("departure")}
                </label>
                <HaniDatePicker
                  id="tour-departure"
                  className="form-control datetimepicker"
                  placeholder={t("departure")}
                  defaultValue={today}
                  disablePast
                  ariaLabel={t("departure")}
                />
              </div>
            </div>
            <Link
              href="/tours?scope=domestic"
              className="btn btn-primary search-btn rounded"
            >
              {t("search")}
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
