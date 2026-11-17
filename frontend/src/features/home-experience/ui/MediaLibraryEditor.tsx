"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import type { MediaAsset } from "../domain/media";
import {
  deleteMedia,
  updateMediaAlt,
  uploadMedia
} from "../application/media-actions";

export function MediaLibraryEditor({
  initialItems,
  total
}: {
  initialItems: MediaAsset[];
  total: number;
}) {
  const t = useTranslations("adminMedia");
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [status, setStatus] = useState<"idle" | "uploaded" | "error">("idle");
  const [pending, startTransition] = useTransition();

  const upload = (formData: FormData) => {
    startTransition(async () => {
      const result = await uploadMedia(formData);
      if (result.ok && result.data) {
        setItems((current) => [result.data!, ...current]);
        setStatus("uploaded");
        router.refresh();
      } else {
        setStatus("error");
      }
    });
  };

  const saveAlt = (id: string, altText: string) => {
    startTransition(async () => {
      const result = await updateMediaAlt(id, altText);
      if (result.ok && result.data) {
        setItems((current) =>
          current.map((item) => (item.id === id ? result.data! : item))
        );
      } else {
        setStatus("error");
      }
    });
  };

  const remove = (id: string) => {
    if (!window.confirm(t("deleteConfirm"))) {
      return;
    }

    startTransition(async () => {
      const result = await deleteMedia(id);
      if (result.ok) {
        setItems((current) => current.filter((item) => item.id !== id));
      } else {
        setStatus("error");
      }
    });
  };

  return (
    <div>
      {status === "uploaded" && (
        <div className="alert alert-success" role="status">
          {t("uploaded")}
        </div>
      )}
      {status === "error" && (
        <div className="alert alert-danger" role="alert">
          {t("error")}
        </div>
      )}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header">
          <h2 className="h4 mb-1">{t("uploadTitle")}</h2>
          <p className="text-gray-6 mb-0">{t("uploadHint")}</p>
        </div>
        <div className="card-body">
          <form
            className="row g-3"
            action={(formData) => upload(formData)}
          >
            <div className="col-lg-5">
              <label className="form-label" htmlFor="media-file">
                {t("file")}
              </label>
              <input
                id="media-file"
                className="form-control"
                type="file"
                name="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                required
              />
              <p className="fs-12 text-gray-6 mb-0 mt-1">{t("fileHint")}</p>
            </div>
            <div className="col-lg-4">
              <label className="form-label" htmlFor="media-alt">
                {t("altText")}
              </label>
              <input
                id="media-alt"
                className="form-control"
                name="altText"
                required
                maxLength={300}
              />
            </div>
            <div className="col-lg-3 d-flex align-items-end">
              <button className="btn btn-primary w-100" disabled={pending}>
                {pending ? t("uploading") : t("upload")}
              </button>
            </div>
            <div className="col-lg-6">
              <label className="form-label" htmlFor="media-caption">
                {t("caption")}
              </label>
              <input
                id="media-caption"
                className="form-control"
                name="caption"
                maxLength={500}
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label" htmlFor="media-credit">
                {t("credit")}
              </label>
              <input
                id="media-credit"
                className="form-control"
                name="credit"
                maxLength={200}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="h4 mb-0">{t("libraryTitle")}</h2>
        <span className="text-gray-6 fs-14">{t("count", { count: total })}</span>
      </div>

      {items.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-gray-6">{t("empty")}</div>
        </div>
      ) : (
        <div className="row g-4">
          {items.map((item) => (
            <div className="col-xl-4 col-md-6" key={item.id}>
              <div className="card border-0 shadow-sm h-100">
                <img
                  src={item.url}
                  alt={item.altText}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  decoding="async"
                  className="card-img-top"
                  style={{ aspectRatio: "4 / 3", objectFit: "cover" }}
                />
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                    <strong className="text-truncate" title={item.originalFileName}>
                      {item.originalFileName}
                    </strong>
                    <span className="badge badge-soft-info">WebP</span>
                  </div>
                  <p className="fs-12 text-gray-6 mb-2">
                    {item.width}×{item.height} ·{" "}
                    {(item.sizeBytes / 1024).toFixed(0)} KB ·{" "}
                    {item.variants.length} {t("variants")}
                  </p>
                  <label className="form-label fs-13" htmlFor={`alt-${item.id}`}>
                    {t("altText")}
                  </label>
                  <div className="input-group">
                    <input
                      id={`alt-${item.id}`}
                      className="form-control"
                      defaultValue={item.altText}
                      onBlur={(event) => {
                        if (event.target.value.trim() !== item.altText) {
                          saveAlt(item.id, event.target.value.trim());
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => remove(item.id)}
                      aria-label={t("delete")}
                    >
                      ×
                    </button>
                  </div>
                  <a
                    className="fs-12 d-inline-block mt-2 text-truncate w-100"
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    dir="ltr"
                  >
                    {item.url}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
