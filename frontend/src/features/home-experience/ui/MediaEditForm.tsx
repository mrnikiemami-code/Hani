"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { formatIsoInstant } from "@/lib/hani/calendar";
import { useMessageBox } from "@/components/hani/message-provider";
import type { MediaAsset, MediaFolder } from "../domain/media";
import {
  replaceMedia,
  updateMediaMetadata
} from "../application/media-actions";
import { TagInput } from "@/components/hani/tag-input";
import { HaniMediaImage, MEDIA_SIZES } from "./HaniMediaImage";
import { MediaFolderSelect } from "./MediaFolderSelect";

function numberOrNull(value: string): number | null {
  if (!value.trim()) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(100, Math.max(0, parsed)) : null;
}

/**
 * Dedicated media edit form for metadata, tags, focal point, and replacement
 * of the binary. The delete action stays in the list table.
 */
export function MediaEditForm({
  locale,
  media,
  initialFolders
}: {
  locale: string;
  media: MediaAsset;
  initialFolders: MediaFolder[];
}) {
  const t = useTranslations("adminMedia");
  const messages = useMessageBox();
  const router = useRouter();
  const [asset, setAsset] = useState(media);
  const [folders, setFolders] = useState(initialFolders);
  const [folderId, setFolderId] = useState(media.folderId ?? "");
  const [altText, setAltText] = useState(media.altText);
  const [caption, setCaption] = useState(media.caption ?? "");
  const [credit, setCredit] = useState(media.credit ?? "");
  const [tags, setTags] = useState<string[]>(media.tags);
  const [focalX, setFocalX] = useState(media.focalX?.toString() ?? "");
  const [focalY, setFocalY] = useState(media.focalY?.toString() ?? "");
  const [pending, startTransition] = useTransition();

  const save = () => {
    startTransition(async () => {
      const result = await updateMediaMetadata(asset.id, {
        altText: altText.trim(),
        caption,
        credit,
        folderId: folderId || null,
        tags,
        focalX: numberOrNull(focalX),
        focalY: numberOrNull(focalY)
      });
      if (result.ok && result.data) {
        setAsset(result.data);
        messages.toast({ kind: "success", message: t("saved") });
        router.refresh();
      } else {
        messages.toast({ kind: "error", message: t("error") });
      }
    });
  };

  const replace = (file: File) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("altText", altText);
    formData.append("caption", caption);
    formData.append("credit", credit);
    formData.append("folderId", folderId);
    formData.append("tags", tags.join(","));
    formData.append("focalX", focalX);
    formData.append("focalY", focalY);
    startTransition(async () => {
      const result = await replaceMedia(asset.id, formData);
      if (result.ok && result.data) {
        setAsset(result.data);
        messages.toast({ kind: "success", message: t("saved") });
        router.refresh();
      } else {
        messages.toast({ kind: "error", message: t("error") });
      }
    });
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <h2 className="h5 mb-1">{t("editTitle")}</h2>
          <p className="fs-13 text-gray-6 mb-0" dir="ltr">
            {asset.originalFileName}
          </p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <Link href="/admin/media" className="btn btn-light btn-sm">
            <i className="isax isax-arrow-left-2 me-1" />
            {t("backToList")}
          </Link>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={save}
            disabled={pending || !altText.trim()}
          >
            {pending ? t("saving") : t("save")}
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="border rounded p-2 bg-light">
              <HaniMediaImage
                media={asset}
                sizes={MEDIA_SIZES.detail}
                className="img-fluid rounded w-100"
                style={{ maxHeight: 360, objectFit: "contain" }}
              />
            </div>
            <p className="fs-12 text-gray-6 mt-2 mb-1">
              {asset.width}×{asset.height} · {(asset.sizeBytes / 1024).toFixed(0)} KB ·{" "}
              {asset.variants.length} {t("variants")}
            </p>
            <p className="fs-12 text-gray-6 mb-2">
              {t("createdAt")}:{" "}
              {formatIsoInstant(asset.createdAt, locale, { dateStyle: "medium" })}
            </p>
            <a
              href={asset.url}
              target="_blank"
              rel="noreferrer"
              className="fs-12 d-block text-truncate"
              dir="ltr"
            >
              {asset.url}
            </a>
            <label className="btn btn-light btn-sm mt-3 w-100">
              {t("replace")}
              <input
                type="file"
                className="d-none"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) replace(file);
                  event.target.value = "";
                }}
              />
            </label>
          </div>

          <div className="col-lg-7">
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label" htmlFor="media-alt">
                  {t("altText")}
                </label>
                <input
                  id="media-alt"
                  className="form-control"
                  value={altText}
                  maxLength={300}
                  onChange={(event) => setAltText(event.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="media-caption">
                  {t("caption")}
                </label>
                <input
                  id="media-caption"
                  className="form-control"
                  value={caption}
                  maxLength={500}
                  onChange={(event) => setCaption(event.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="media-credit">
                  {t("credit")}
                </label>
                <input
                  id="media-credit"
                  className="form-control"
                  value={credit}
                  maxLength={200}
                  onChange={(event) => setCredit(event.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="media-folder">
                  {t("folder")}
                </label>
                <MediaFolderSelect
                  folders={folders}
                  value={folderId}
                  onChange={setFolderId}
                  onFolderCreated={(folder) =>
                    setFolders((current) => [...current, folder])
                  }
                  selectId="media-folder"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">{t("tags")}</label>
                <TagInput
                  tags={tags}
                  onChange={setTags}
                  placeholder={t("tagPlaceholder")}
                  addLabel={t("addTag")}
                  removeLabel={t("removeTag")}
                />
                <p className="fs-12 text-gray-6 mb-0 mt-1">{t("tagsHint")}</p>
              </div>
              <div className="col-12 mt-2">
                <h3 className="h6 mb-0">{t("focalTitle")}</h3>
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="media-focal-x">
                  {t("focalX")}
                </label>
                <input
                  id="media-focal-x"
                  className="form-control"
                  type="number"
                  min={0}
                  max={100}
                  value={focalX}
                  onChange={(event) => setFocalX(event.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="media-focal-y">
                  {t("focalY")}
                </label>
                <input
                  id="media-focal-y"
                  className="form-control"
                  type="number"
                  min={0}
                  max={100}
                  value={focalY}
                  onChange={(event) => setFocalY(event.target.value)}
                />
              </div>
              <div className="col-md-4 d-flex align-items-end">
                <p className="fs-12 text-gray-6 mb-2">{t("focalHint")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
