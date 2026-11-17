"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { RichTextEditor } from "./RichTextEditor";
import { ContentSeoPanel } from "./ContentSeoPanel";
import type { MediaAsset } from "../domain/media";
import type {
  ContentEntry,
  ContentEntryType,
  ContentEntryWrite
} from "../domain/content-entry";
import {
  changeContentStatus,
  saveContentEntry,
  scheduleContent
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

/**
 * Full-page content editor. The list page owns the table and row actions; this
 * component is mounted on dedicated create/edit routes.
 */
export function ContentEditor({
  locale,
  entry,
  mediaAssets
}: {
  locale: string;
  entry: ContentEntry | null;
  mediaAssets: MediaAsset[];
}) {
  const t = useTranslations("adminContent");
  const router = useRouter();
  const [entryId, setEntryId] = useState(entry?.id ?? null);
  const [entryStatus, setEntryStatus] = useState(entry?.status ?? "Draft");
  const [form, setForm] = useState<ContentEntryWrite>(
    entry
      ? {
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
        }
      : { ...EMPTY, locale }
  );
  const [scheduleAt, setScheduleAt] = useState(entry?.scheduledAt ?? "");
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof ContentEntryWrite>(
    key: K,
    value: ContentEntryWrite[K]
  ) => setForm((current) => ({ ...current, [key]: value }));

  const save = () => {
    startTransition(async () => {
      const result = await saveContentEntry(entryId, form);
      if (result.ok && result.data) {
        setEntryId(result.data.id);
        setEntryStatus(result.data.status);
        if (!entryId) {
          router.push(`/${locale}/admin/content/${result.data.id}`);
        } else {
          setStatus("saved");
        }
        router.refresh();
      } else {
        setStatus("error");
      }
    });
  };

  const changeStatus = (action: "publish" | "unpublish") => {
    if (!entryId) return;
    startTransition(async () => {
      const result = await changeContentStatus(entryId, action);
      if (result.ok && result.data) {
        setEntryStatus(result.data.status);
        setStatus("saved");
      } else {
        setStatus("error");
      }
    });
  };

  const schedule = () => {
    if (!entryId || !scheduleAt) return;
    startTransition(async () => {
      const result = await scheduleContent(entryId, scheduleAt);
      if (result.ok && result.data) {
        setEntryStatus(result.data.status);
        setScheduleAt(result.data.scheduledAt ?? "");
        setStatus("saved");
      } else {
        setStatus("error");
      }
    });
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <h2 className="h5 mb-1">{entryId ? t("edit") : t("create")}</h2>
          {entryId && (
            <p className="fs-13 text-gray-6 mb-0">
              {entryStatus} · /{form.slug}
            </p>
          )}
        </div>
        <div className="d-flex flex-wrap gap-2">
          <Link href="/admin/content" className="btn btn-light btn-sm">
            <i className="isax isax-arrow-left-2 me-1" />
            {t("backToList")}
          </Link>
          {entryId && (
            <>
              <button
                type="button"
                className="btn btn-light btn-sm"
                onClick={() => changeStatus("publish")}
                disabled={pending}
              >
                {t("publish")}
              </button>
              <button
                type="button"
                className="btn btn-light btn-sm"
                onClick={() => changeStatus("unpublish")}
                disabled={pending}
              >
                {t("unpublish")}
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

        {entryId && (
          <div className="d-flex gap-2 align-items-end mb-3 flex-wrap">
            <div className="flex-grow-1">
              <label className="form-label" htmlFor="content-schedule">
                {t("schedule")}
              </label>
              <input
                id="content-schedule"
                type="datetime-local"
                className="form-control"
                value={scheduleAt ? scheduleAt.slice(0, 16) : ""}
                onChange={(event) => setScheduleAt(event.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-light"
              onClick={schedule}
              disabled={pending || !scheduleAt}
            >
              {t("scheduleButton")}
            </button>
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
            <RichTextEditor
              value={form.body}
              onChange={(value) => set("body", value)}
              ariaLabel={t("body")}
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

        <ContentSeoPanel form={form} />
      </div>
    </div>
  );
}
