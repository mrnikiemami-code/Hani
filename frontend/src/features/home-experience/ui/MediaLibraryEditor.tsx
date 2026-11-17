"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import type { MediaAsset, MediaFolder } from "../domain/media";
import { TagInput } from "@/components/hani/tag-input";
import { HaniMediaImage, MEDIA_SIZES } from "./HaniMediaImage";
import {
  bulkDeleteMedia,
  createMediaFolder,
  deleteMedia,
  replaceMedia,
  updateMediaAlt,
  uploadMedia
} from "../application/media-actions";

export function MediaLibraryEditor({
  initialItems,
  initialFolders,
  total
}: {
  initialItems: MediaAsset[];
  initialFolders: MediaFolder[];
  total: number;
}) {
  const t = useTranslations("adminMedia");
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [folders, setFolders] = useState(initialFolders);
  const [newFolder, setNewFolder] = useState("");
  const [uploadTags, setUploadTags] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
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

  const addFolder = () => {
    if (!newFolder.trim()) return;
    startTransition(async () => {
      const result = await createMediaFolder(newFolder.trim());
      if (result.ok && result.data) {
        setFolders((current) => [...current, result.data!]);
        setNewFolder("");
      } else {
        setStatus("error");
      }
    });
  };

  const removeSelected = () => {
    if (selectedIds.length === 0 || !window.confirm(t("bulkDeleteConfirm"))) {
      return;
    }

    startTransition(async () => {
      const result = await bulkDeleteMedia(selectedIds);
      if (result.ok) {
        setItems((current) =>
          current.filter((item) => !selectedIds.includes(item.id))
        );
        setSelectedIds([]);
      } else {
        setStatus("error");
      }
    });
  };

  const replace = (id: string, file: File) => {
    const item = items.find((current) => current.id === id);
    if (!item) return;

    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("altText", item.altText);
    formData.append("caption", item.caption ?? "");
    formData.append("credit", item.credit ?? "");
    formData.append("folderId", item.folderId ?? "");
    formData.append("tags", item.tags.join(","));
    formData.append("focalX", String(item.focalX ?? ""));
    formData.append("focalY", String(item.focalY ?? ""));

    startTransition(async () => {
      const result = await replaceMedia(id, formData);
      if (result.ok && result.data) {
        setItems((current) =>
          current.map((currentItem) =>
            currentItem.id === id ? result.data! : currentItem
          )
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
    <div className="media-library-editor">
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
            className="row g-3 media-upload-form"
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
            <div className="col-lg-4">
              <label className="form-label" htmlFor="media-folder">
                {t("folder")}
              </label>
              <select id="media-folder" className="form-select" name="folderId">
                <option value="">{t("noFolder")}</option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-lg-4">
              <label className="form-label">{t("tags")}</label>
              <TagInput
                tags={uploadTags}
                onChange={setUploadTags}
                placeholder={t("tagPlaceholder")}
                addLabel={t("addTag")}
                removeLabel={t("removeTag")}
              />
              <p className="fs-12 text-gray-6 mb-0 mt-1">{t("tagsHint")}</p>
              <input type="hidden" name="tags" value={uploadTags.join(",")} />
            </div>
            <div className="col-12 mt-2">
              <h3 className="h6 mb-0">{t("focalTitle")}</h3>
            </div>
            <div className="col-lg-2">
              <label className="form-label" htmlFor="media-focal-x">
                {t("focalX")}
              </label>
              <input
                id="media-focal-x"
                className="form-control"
                name="focalX"
                type="number"
                min={0}
                max={100}
              />
            </div>
            <div className="col-lg-2">
              <label className="form-label" htmlFor="media-focal-y">
                {t("focalY")}
              </label>
              <input
                id="media-focal-y"
                className="form-control"
                name="focalY"
                type="number"
                min={0}
                max={100}
              />
            </div>
            <div className="col-12">
              <p className="fs-12 text-gray-6 mb-2">{t("focalHint")}</p>
            </div>
            <div className="col-12 d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-primary px-4 media-upload-submit"
                disabled={pending}
              >
                {pending ? t("uploading") : t("upload")}
              </button>
            </div>
          </form>
          <div className="d-flex gap-2 mt-3 media-folder-row">
            <input
              className="form-control"
              value={newFolder}
              placeholder={t("newFolder")}
              onChange={(event) => setNewFolder(event.target.value)}
            />
            <button
              type="button"
              className="btn btn-light"
              onClick={addFolder}
              disabled={pending || !newFolder.trim()}
            >
              {t("addFolder")}
            </button>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3 media-library-heading">
        <h2 className="h4 mb-0">{t("libraryTitle")}</h2>
        <span className="text-gray-6 fs-14">{t("count", { count: total })}</span>
      </div>

      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3 media-selection-toolbar">
        <span className="text-gray-6 fs-14">
          {t("selected", { count: selectedIds.length })}
        </span>
        <button
          type="button"
          className="btn btn-light btn-sm"
          disabled={selectedIds.length === 0 || pending}
          onClick={removeSelected}
        >
          {t("bulkDelete")}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-gray-6">{t("empty")}</div>
        </div>
      ) : (
        <div className="row g-4">
          {items.map((item) => (
            <div className="col-xl-4 col-md-6" key={item.id}>
              <div className="card border-0 shadow-sm h-100 position-relative media-card">
                <div className="position-absolute p-2 media-select-box" style={{ zIndex: 2 }}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    aria-label={t("select")}
                    checked={selectedIds.includes(item.id)}
                    onChange={(event) => {
                      setSelectedIds((current) =>
                        event.target.checked
                          ? [...current, item.id]
                          : current.filter((id) => id !== item.id)
                      );
                    }}
                  />
                </div>
                <HaniMediaImage
                  media={item}
                  sizes={MEDIA_SIZES.card}
                  className="card-img-top media-card-image"
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
                  <label className="btn btn-light btn-sm mt-2 w-100 media-replace">
                    {t("replace")}
                    <input
                      type="file"
                      className="d-none"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) replace(item.id, file);
                        event.target.value = "";
                      }}
                    />
                  </label>
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
