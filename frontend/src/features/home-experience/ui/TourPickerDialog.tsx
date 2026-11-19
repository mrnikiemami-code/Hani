"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { searchTours } from "@/features/tours/infrastructure/tours-api";
import type { TourScopeValue, TourSearchItem } from "@/features/tours/domain/tour-search";
import type { TourCollection } from "../domain/home-page-settings";

type PickerFilters = {
  q: string;
  minPrice: string;
  maxPrice: string;
  tourType: string;
  scope: "" | TourScopeValue;
  sort: "newest" | "price-asc" | "price-desc" | "rating";
};

type SelectedMeta = Record<
  string,
  { title: string; image?: string | null; agency?: string | null }
>;

const EMPTY_FILTERS: PickerFilters = {
  q: "",
  minPrice: "",
  maxPrice: "",
  tourType: "",
  scope: "",
  sort: "newest"
};

/**
 * Admin-only tour picker for manual home-section curation.
 *
 * Searches the full tour catalog through the public search API (server-side
 * filtering and pagination), keeps selections across pages, and supports
 * reusable id collections so an editor never has to load a 100k-row list.
 */
export function TourPickerDialog({
  locale,
  scope,
  initialSelectedIds,
  collections,
  onSaveCollection,
  onDeleteCollection,
  onClose,
  onApply
}: {
  locale: string;
  scope?: TourScopeValue;
  initialSelectedIds: string[];
  collections: TourCollection[];
  onSaveCollection: (name: string, ids: string[]) => void;
  onDeleteCollection: (id: string) => void;
  onClose: () => void;
  onApply: (ids: string[]) => void;
}) {
  const t = useTranslations("adminHome");
  const [draft, setDraft] = useState<PickerFilters>({
    ...EMPTY_FILTERS,
    scope: scope ?? ""
  });
  const [applied, setApplied] = useState<PickerFilters>({
    ...EMPTY_FILTERS,
    scope: scope ?? ""
  });
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<TourSearchItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selected, setSelected] = useState<string[]>(() =>
    Array.from(new Set(initialSelectedIds))
  );
  const [selectedMeta, setSelectedMeta] = useState<SelectedMeta>({});
  const [collectionName, setCollectionName] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setApplied(draft), 400);
    return () => window.clearTimeout(timer);
  }, [draft]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError(false);
    searchTours(locale, page, 20, {
      scope: applied.scope || undefined,
      q: applied.q.trim() || undefined,
      minPrice: applied.minPrice ? Number(applied.minPrice) : undefined,
      maxPrice: applied.maxPrice ? Number(applied.maxPrice) : undefined,
      tourType: applied.tourType.trim() || undefined,
      sort: applied.sort
    })
      .then((result) => {
        if (!active) return;
        setItems(result.items);
        setTotalPages(result.totalPages);
        setTotalCount(result.totalCount);
      })
      .catch(() => {
        if (!active) return;
        setItems([]);
        setTotalPages(0);
        setLoadError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [locale, page, applied]);

  const pageAllSelected = useMemo(
    () =>
      items.length > 0 &&
      items.every((item) => selected.includes(item.productId)),
    [items, selected]
  );

  const updateDraft = (patch: Partial<PickerFilters>) => {
    setPage(1);
    setDraft((current) => ({ ...current, ...patch }));
  };

  const remember = (item: TourSearchItem) =>
    setSelectedMeta((current) => ({
      ...current,
      [item.productId]: {
        title: item.title,
        image: item.coverImageUrl,
        agency: item.agencyName
      }
    }));

  const toggle = (item: TourSearchItem) => {
    remember(item);
    setSelected((current) =>
      current.includes(item.productId)
        ? current.filter((id) => id !== item.productId)
        : [...current, item.productId]
    );
  };

  const togglePage = () => {
    if (pageAllSelected) {
      const pageIds = new Set(items.map((item) => item.productId));
      setSelected((current) => current.filter((id) => !pageIds.has(id)));
      return;
    }
    items.forEach(remember);
    setSelected((current) =>
      Array.from(new Set([...current, ...items.map((item) => item.productId)]))
    );
  };

  const removeSelected = (id: string) =>
    setSelected((current) => current.filter((item) => item !== id));

  const saveCollection = () => {
    const name = collectionName.trim();
    if (!name || selected.length === 0) return;
    onSaveCollection(name, selected);
    setCollectionName("");
  };

  const estimatedTotal =
    totalPages > 1 ? (totalPages - 1) * 20 + items.length : totalCount;

  return (
    <div
      className="hani-date-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-picker-title"
    >
      <button
        type="button"
        className="hani-date-modal__backdrop"
        aria-label={t("close")}
        onClick={onClose}
      />
      <div
        className="hani-date-modal__panel"
        style={{ maxWidth: 1060, width: "100%" }}
      >
        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
          <div>
            <h3 className="h5 mb-1" id="tour-picker-title">
              {t("tourPickerTitle")}
            </h3>
            <p className="fs-13 text-gray-6 mb-0">{t("tourPickerHint")}</p>
          </div>
          <button type="button" className="btn btn-light btn-sm" onClick={onClose}>
            {t("close")}
          </button>
        </div>

        <div className="row g-2 mb-2">
          <div className="col-lg-4 col-md-6">
            <input
              className="form-control"
              placeholder={t("tourSearchPlaceholder")}
              value={draft.q}
              onChange={(event) => updateDraft({ q: event.target.value })}
            />
          </div>
          <div className="col-lg-2 col-md-3 col-6">
            <input
              className="form-control"
              type="number"
              min={0}
              placeholder={t("minPrice")}
              value={draft.minPrice}
              onChange={(event) => updateDraft({ minPrice: event.target.value })}
            />
          </div>
          <div className="col-lg-2 col-md-3 col-6">
            <input
              className="form-control"
              type="number"
              min={0}
              placeholder={t("maxPrice")}
              value={draft.maxPrice}
              onChange={(event) => updateDraft({ maxPrice: event.target.value })}
            />
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <select
              className="form-select"
              value={draft.scope}
              onChange={(event) =>
                updateDraft({ scope: event.target.value as PickerFilters["scope"] })
              }
            >
              <option value="">{t("scopeAll")}</option>
              <option value="Domestic">{t("scopeDomestic")}</option>
              <option value="Foreign">{t("scopeForeign")}</option>
            </select>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <select
              className="form-select"
              value={draft.sort}
              onChange={(event) =>
                updateDraft({ sort: event.target.value as PickerFilters["sort"] })
              }
            >
              <option value="newest">{t("sortNewest")}</option>
              <option value="price-asc">{t("sortPriceAsc")}</option>
              <option value="price-desc">{t("sortPriceDesc")}</option>
              <option value="rating">{t("sortRating")}</option>
            </select>
          </div>
          <div className="col-lg-2 col-md-4 col-12">
            <input
              className="form-control"
              placeholder={t("tourType")}
              value={draft.tourType}
              onChange={(event) => updateDraft({ tourType: event.target.value })}
            />
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center gap-2 mb-2 flex-wrap">
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-light btn-sm"
              onClick={togglePage}
              disabled={items.length === 0}
            >
              {pageAllSelected ? t("clearPage") : t("selectPage")}
            </button>
            <span className="badge bg-primary-transparent text-primary">
              {t("selectedCount", { count: selected.length })}
            </span>
          </div>
          <span className="fs-12 text-gray-6">
            {loading
              ? t("loading")
              : t("tourResults", { count: estimatedTotal })}
          </span>
        </div>

        <div
          className="border rounded"
          style={{ maxHeight: 360, overflow: "auto" }}
          aria-busy={loading}
        >
          {loadError ? (
            <div className="p-4 text-center text-gray-6">{t("tourLoadError")}</div>
          ) : items.length === 0 ? (
            <div className="p-4 text-center text-gray-6">
              {loading ? t("loading") : t("noTourResults")}
            </div>
          ) : (
            <div className="d-flex flex-column">
              {items.map((item) => (
                <label
                  key={item.productId}
                  className="d-flex align-items-center gap-3 p-2 border-bottom"
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="checkbox"
                    className="form-check-input mt-0 flex-shrink-0"
                    checked={selected.includes(item.productId)}
                    onChange={() => toggle(item)}
                  />
                  {item.coverImageUrl ? (
                    <img
                      src={item.coverImageUrl}
                      alt=""
                      width={56}
                      height={40}
                      className="rounded object-fit-cover flex-shrink-0"
                    />
                  ) : (
                    <span
                      className="rounded bg-light d-inline-block flex-shrink-0"
                      style={{ width: 56, height: 40 }}
                    />
                  )}
                  <span className="flex-grow-1 min-w-0">
                    <strong className="d-block fs-14 text-truncate">
                      {item.title}
                    </strong>
                    <span className="fs-12 text-gray-6 d-block text-truncate">
                      {[item.agencyName, item.destinationNames?.[0]]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </span>
                  <span className="fs-12 text-gray-6 text-nowrap">
                    {item.minPrice !== null
                      ? `${item.minPrice.toLocaleString(locale)} ${
                          item.currency ?? ""
                        }`
                      : "—"}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
          <div className="d-flex gap-2 align-items-center">
            <button
              type="button"
              className="btn btn-light btn-sm"
              disabled={page <= 1 || loading}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              {t("previous")}
            </button>
            <span className="fs-13 align-self-center">
              {t("pageOf", { page, total: Math.max(1, totalPages) })}
            </span>
            <button
              type="button"
              className="btn btn-light btn-sm"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((current) => current + 1)}
            >
              {t("next")}
            </button>
          </div>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            disabled={selected.length === 0}
            onClick={() => {
              setSelected([]);
              setSelectedMeta({});
            }}
          >
            {t("clearSelection")}
          </button>
        </div>

        {selected.length > 0 ? (
          <div className="border rounded p-2 mt-2" style={{ maxHeight: 96, overflow: "auto" }}>
            <div className="fs-12 text-gray-6 mb-1">{t("selectedTray")}</div>
            <div className="d-flex flex-wrap gap-1">
              {selected.map((id) => (
                <span
                  key={id}
                  className="badge bg-light text-gray-9 d-inline-flex align-items-center gap-1"
                >
                  <span className="text-truncate" style={{ maxWidth: 220 }}>
                    {selectedMeta[id]?.title ?? `${t("tourFallback")} ${id.slice(0, 8)}`}
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm p-0 lh-1 border-0"
                    aria-label={t("remove")}
                    onClick={() => removeSelected(id)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="row g-2 mt-2 align-items-end">
          <div className="col-md-6">
            <label className="fs-12 text-gray-6 mb-1">{t("collections")}</label>
            <div className="input-group">
              <input
                className="form-control"
                placeholder={t("collectionNamePlaceholder")}
                value={collectionName}
                onChange={(event) => setCollectionName(event.target.value)}
              />
              <button
                type="button"
                className="btn btn-light"
                disabled={!collectionName.trim() || selected.length === 0}
                onClick={saveCollection}
              >
                {t("saveCollection")}
              </button>
            </div>
          </div>
          <div className="col-md-6">
            {collections.length === 0 ? (
              <p className="fs-12 text-gray-6 mb-0">{t("collectionsEmpty")}</p>
            ) : (
              <div className="d-flex flex-wrap gap-1">
                {collections.map((collection) => (
                  <span
                    key={collection.id}
                    className="badge bg-light text-gray-9 d-inline-flex align-items-center gap-1"
                  >
                    <button
                      type="button"
                      className="btn btn-sm p-0 border-0"
                      title={t("applyCollection")}
                      onClick={() =>
                        setSelected((current) =>
                          Array.from(new Set([...current, ...collection.ids]))
                        )
                      }
                    >
                      {collection.name} ({collection.ids.length})
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm p-0 lh-1 border-0 text-danger"
                      aria-label={t("deleteCollection")}
                      onClick={() => onDeleteCollection(collection.id)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button type="button" className="btn btn-light btn-sm" onClick={onClose}>
            {t("cancel")}
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => onApply(selected)}
          >
            {t("applySelection", { count: selected.length })}
          </button>
        </div>
      </div>
    </div>
  );
}
