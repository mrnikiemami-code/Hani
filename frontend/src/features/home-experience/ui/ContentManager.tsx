"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import type { MediaAsset } from "../domain/media";
import type {
  ContentEntry,
  ContentEntryType,
  ContentEntryWrite
} from "../domain/content-entry";
import {
  changeContentStatus,
  saveContentEntry
} from "../application/content-actions";

const EMPTY: ContentEntryWrite = {
  type: "Page",
  slug: "",
  locale: "fa",
  title: "",
  excerpt: "",
  body: "",
  heroMediaId: null,
  heroImageUrl: "",
  seoTitle: "",
  seoDescription: ""
};

export function ContentManager({
  locale,
  initialEntries,
  mediaAssets
}: {
  locale: string;
  initialEntries: ContentEntry[];
  mediaAssets: MediaAsset[];
}) {
  const t = useTranslations("adminContent");
  const [entries, setEntries] = useState(initialEntries);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<ContentEntryWrite>({ ...EMPTY, locale });
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [pending, startTransition] = useTransition();

  const select = (entry: ContentEntry) => {
    setSelectedId(entry.id);
    setForm({
      type: entry.type,
      slug: entry.slug,
      locale: entry.locale,
      title: entry.title,
      excerpt: entry.excerpt ?? "",
      body: entry.body,
      heroMediaId: entry.heroMediaId,
      heroImageUrl: entry.heroImageUrl ?? "",
      seoTitle: entry.seoTitle ?? "",
      seoDescription: entry.seoDescription ?? ""
    });
    setStatus("idle");
  };

  const createNew = () => {
    setSelectedId(null);
    setForm({ ...EMPTY, locale });
    setStatus("idle");
  };

  const set = <K extends keyof ContentEntryWrite>(
    key: K,
    value: ContentEntryWrite[K]
  ) => setForm((current) => ({ ...current, [key]: value }));

  const save = () => {
    startTransition(async () => {
      const result = await saveContentEntry(selectedId, form);
      if (result.ok && result.data) {
        setEntries((current) => {
          const exists = current.some((entry) => entry.id === result.data!.id);
          return exists
            ? current.map((entry) =>
                entry.id === result.data!.id ? result.data! : entry
              )
            : [result.data!, ...current];
        });
        setSelectedId(result.data.id);
        setStatus("saved");
      } else {
        setStatus("error");
      }
    });
  };

  const changeStatus = (
    entry: ContentEntry,
    action: "publish" | "unpublish" | "delete"
  ) => {
    if (action === "delete" && !window.confirm(t("deleteConfirm"))) {
      return;
    }

    startTransition(async () => {
      const result = await changeContentStatus(entry.id, action);
      if (!result.ok) {
        setStatus("error");
        return;
      }

      if (action === "delete") {
        setEntries((current) => current.filter((item) => item.id !== entry.id));
        if (selectedId === entry.id) createNew();
      } else if (result.data) {
        setEntries((current) =>
          current.map((item) => (item.id === entry.id ? result.data! : item))
        );
      }
    });
  };

  return (
    <div className="row g-4">
      <div className="col-xl-4">
        <div className="card border-0 shadow-sm">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h2 className="h5 mb-0">{t("entries")}</h2>
            <button type="button" className="btn btn-primary btn-sm" onClick={createNew}>
              {t("new")}
            </button>
          </div>
          <div className="list-group list-group-flush">
            {entries.map((entry) => (
              <button
                type="button"
                key={entry.id}
                className={`list-group-item list-group-item-action text-start ${
                  selectedId === entry.id ? "active" : ""
                }`}
                onClick={() => select(entry)}
              >
                <div className="d-flex justify-content-between gap-2">
                  <strong className="text-truncate">{entry.title}</strong>
                  <span className="badge badge-light text-dark">
                    {entry.status}
                  </span>
                </div>
                <small className="d-block text-truncate">
                  {entry.type} · /{entry.slug} · {entry.locale} · v
                  {entry.revisionCount}
                </small>
              </button>
            ))}
            {entries.length === 0 && (
              <div className="p-3 text-gray-6">{t("empty")}</div>
            )}
          </div>
        </div>
      </div>

      <div className="col-xl-8">
        <div className="card border-0 shadow-sm">
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
            <h2 className="h5 mb-0">
              {selectedId ? t("edit") : t("create")}
            </h2>
            <div className="d-flex gap-2">
              {selectedId && (
                <>
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={() =>
                      changeStatus(
                        entries.find((entry) => entry.id === selectedId)!,
                        "publish"
                      )
                    }
                    disabled={pending}
                  >
                    {t("publish")}
                  </button>
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={() =>
                      changeStatus(
                        entries.find((entry) => entry.id === selectedId)!,
                        "unpublish"
                      )
                    }
                    disabled={pending}
                  >
                    {t("unpublish")}
                  </button>
                  <button
                    type="button"
                    className="btn btn-light btn-sm text-danger"
                    onClick={() =>
                      changeStatus(
                        entries.find((entry) => entry.id === selectedId)!,
                        "delete"
                      )
                    }
                    disabled={pending}
                  >
                    {t("delete")}
                  </button>
                </>
              )}
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={save}
                disabled={pending || !form.title.trim() || !form.slug.trim()}
              >
                {pending ? t("saving") : t("save")}
              </button>
            </div>
          </div>
          <div className="card-body">
            {status === "saved" && (
              <div className="alert alert-success" role="status">
                {t("saved")}
              </div>
            )}
            {status === "error" && (
              <div className="alert alert-danger" role="alert">
                {t("error")}
              </div>
            )}

            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label" htmlFor="content-type">
                  {t("type")}
                </label>
                <select
                  id="content-type"
                  className="form-select"
                  value={form.type}
                  onChange={(event) =>
                    set("type", event.target.value as ContentEntryType)
                  }
                >
                  {["Page", "Banner", "Article", "Section"].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="content-locale">
                  {t("locale")}
                </label>
                <select
                  id="content-locale"
                  className="form-select"
                  value={form.locale}
                  onChange={(event) => set("locale", event.target.value)}
                >
                  <option value="fa">fa</option>
                  <option value="en">en</option>
                  <option value="ar">ar</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="content-slug">
                  {t("slug")}
                </label>
                <input
                  id="content-slug"
                  className="form-control"
                  dir="ltr"
                  value={form.slug}
                  onChange={(event) => set("slug", event.target.value)}
                />
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="content-title">
                  {t("titleField")}
                </label>
                <input
                  id="content-title"
                  className="form-control"
                  value={form.title}
                  onChange={(event) => set("title", event.target.value)}
                />
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="content-excerpt">
                  {t("excerpt")}
                </label>
                <textarea
                  id="content-excerpt"
                  className="form-control"
                  rows={2}
                  value={form.excerpt ?? ""}
                  onChange={(event) => set("excerpt", event.target.value)}
                />
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="content-body">
                  {t("body")}
                </label>
                <textarea
                  id="content-body"
                  className="form-control"
                  rows={8}
                  value={form.body}
                  onChange={(event) => set("body", event.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="content-hero-media">
                  {t("heroMedia")}
                </label>
                <select
                  id="content-hero-media"
                  className="form-select"
                  value={form.heroMediaId ?? ""}
                  onChange={(event) => {
                    const media = mediaAssets.find(
                      (item) => item.id === event.target.value
                    );
                    set("heroMediaId", media?.id ?? null);
                    set("heroImageUrl", media?.url ?? "");
                  }}
                >
                  <option value="">{t("noHeroMedia")}</option>
                  {mediaAssets.map((media) => (
                    <option key={media.id} value={media.id}>
                      {media.altText || media.originalFileName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="content-hero-url">
                  {t("heroUrl")}
                </label>
                <input
                  id="content-hero-url"
                  className="form-control"
                  dir="ltr"
                  value={form.heroImageUrl ?? ""}
                  onChange={(event) => set("heroImageUrl", event.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="content-seo-title">
                  {t("seoTitle")}
                </label>
                <input
                  id="content-seo-title"
                  className="form-control"
                  value={form.seoTitle ?? ""}
                  onChange={(event) => set("seoTitle", event.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="content-seo-description">
                  {t("seoDescription")}
                </label>
                <textarea
                  id="content-seo-description"
                  className="form-control"
                  rows={2}
                  value={form.seoDescription ?? ""}
                  onChange={(event) => set("seoDescription", event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
