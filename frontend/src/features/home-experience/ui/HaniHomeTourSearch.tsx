"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import BookingDropdown from "@/components/booking-dropdown/bookingDropdown";
import CommonDateRange from "@/components/common-date-range-picker/CommonDateRange";
import { DatePicker } from "@/components/common-date-picker/appDatePicker";

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

  return (
    <div>
      <ul className="nav mb-3" role="tablist" aria-label={t("scopeLabel")}>
        <li role="presentation">
          <a
            href="#"
            role="tab"
            aria-selected={scope === "foreign"}
            tabIndex={scope === "foreign" ? 0 : -1}
            className={`nav-link ${scope === "foreign" ? "active" : ""}`}
            onClick={(event) => handleTab(event, "foreign")}
          >
            {t("foreignTours")}
          </a>
        </li>
        <li role="presentation">
          <a
            href="#"
            role="tab"
            aria-selected={scope === "domestic"}
            tabIndex={scope === "domestic" ? 0 : -1}
            className={`nav-link ${scope === "domestic" ? "active" : ""}`}
            onClick={(event) => handleTab(event, "domestic")}
          >
            {t("domesticTours")}
          </a>
        </li>
      </ul>

      {scope === "foreign" ? (
        <form onSubmit={(event) => event.preventDefault()}>
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
              <CommonDateRange
                fromLabel={t("departure")}
                toLabel={t("return")}
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
        <form onSubmit={(event) => event.preventDefault()}>
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
                <label className="form-label fs-14 text-default mb-1">
                  {t("departure")}
                </label>
                <DatePicker
                  className="form-control datetimepicker"
                  placeholder={t("departure")}
                  disablePast
                  format="DD-MM-YYYY"
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
