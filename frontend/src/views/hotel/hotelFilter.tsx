"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import type { HotelFacets } from "@/features/hotels/infrastructure/hotels-api";

/** Real hotel filter sidebar backed by catalogue facets and URL filters. */
export default function HotelFilter({
  facets = null,
  filters = { q: "", minStars: "", amenity: "" }
}: {
  facets?: HotelFacets | null;
  filters?: { q: string; minStars: string; amenity: string };
}) {
  const t = useTranslations("hotelFilters");
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState(filters.q);
  const [minStars, setMinStars] = useState(filters.minStars);
  const [amenity, setAmenity] = useState(filters.amenity);

  const apply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (minStars) params.set("minStars", minStars);
    if (amenity) params.set("amenity", amenity);
    const search = params.toString();
    router.push(`${pathname}${search ? `?${search}` : ""}`);
  };

  const groups = (facets?.amenities ?? []).reduce<
    Record<string, HotelFacets["amenities"]>
  >((result, item) => {
    (result[item.category] ??= []).push(item);
    return result;
  }, {});

  return (
    <div className="card filter-sidebar mb-4 mb-lg-0 theiaStickySidebar">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h5>{t("title")}</h5>
        <Link href={pathname} className="fs-14 link-primary">
          {t("reset")}
        </Link>
      </div>
      <div className="card-body p-0">
        <form onSubmit={apply}>
          <div className="p-3 border-bottom">
            <label className="form-label fs-16" htmlFor="hotel-name-filter">
              {t("searchLabel")}
            </label>
            <input
              id="hotel-name-filter"
              className="form-control"
              value={q}
              placeholder={t("searchPlaceholder")}
              onChange={(event) => setQ(event.target.value)}
            />
          </div>

          <div className="p-3 border-bottom">
            <h6 className="mb-2">
              <i className="isax isax-ranking me-2 text-primary" />
              {t("stars")}
            </h6>
            {(facets?.stars ?? []).map((item) => (
              <div className="form-check d-flex align-items-center ps-0 mb-2" key={item.stars}>
                <input
                  className="form-check-input ms-0 mt-0"
                  type="radio"
                  name="minStars"
                  id={`stars-${item.stars}`}
                  checked={minStars === String(item.stars)}
                  onChange={() => setMinStars(String(item.stars))}
                />
                <label className="form-check-label ms-2" htmlFor={`stars-${item.stars}`}>
                  {t("starAndUp", { count: item.stars })} ({item.count})
                </label>
              </div>
            ))}
          </div>

          {Object.entries(groups).map(([category, items]) => (
            <div className="p-3 border-bottom" key={category}>
              <h6 className="mb-2">
                <i className="isax isax-candle me-2 text-primary" />
                {category}
              </h6>
              {items.map((item) => (
                <div className="form-check d-flex align-items-center ps-0 mb-2" key={item.code}>
                  <input
                    className="form-check-input ms-0 mt-0"
                    type="radio"
                    name="amenity"
                    id={`amenity-${item.code}`}
                    checked={amenity === item.code}
                    onChange={() => setAmenity(item.code)}
                  />
                  <label className="form-check-label ms-2" htmlFor={`amenity-${item.code}`}>
                    {item.name} ({item.count})
                  </label>
                </div>
              ))}
            </div>
          ))}

          <div className="p-3 d-flex gap-2">
            <button type="submit" className="btn btn-primary flex-grow-1">
              {t("apply")}
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                setQ("");
                setMinStars("");
                setAmenity("");
                router.push(pathname);
              }}
            >
              {t("reset")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
