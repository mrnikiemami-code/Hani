"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import type { MediaFolder } from "../domain/media";
import { uploadMedia } from "../application/media-actions";
import { TagInput } from "@/components/hani/tag-input";
import { MediaFolderSelect } from "./MediaFolderSelect";

/**
 * Dedicated media creation form. The list page stays a table; uploads live on
 * their own route and redirect to the edit page after success.
 */
export function MediaCreateForm({
  locale,
  initialFolders
}: {
  locale: string;
  initialFolders: MediaFolder[];
}) {
  const t = useTranslations("adminMedia");
  const router = useRouter();
  const [folders, setFolders] = useState(initialFolders);
  const [folderId, setFolderId] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "error">("idle");
  const [pending, startTransition] = useTransition();

  const upload = (formData: FormData) => {
    startTransition(async () => {
      const result = await uploadMedia(formData);
      if (result.ok && result.data) {
        router.push(`/${locale}/admin/media/${result.data.id}`);
        router.refresh();
      } else {
        setStatus("error");
      }
    });
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <h2 className="h5 mb-1">{t("uploadTitle")}</h2>
          <p className="fs-13 text-gray-6 mb-0">{t("uploadHint")}</p>
        </div>
        <Link href="/admin/media" className="btn btn-light btn-sm">
          <i className="isax isax-arrow-left-2 me-1" />
          {t("backToList")}
        </Link>
      </div>
      <div className="card-body">
        {status === "error" && (
          <div className="alert alert-danger" role="alert">
            {t("error")}
          </div>
        )}
        <form className="row g-3 media-upload-form" action={(fd) => upload(fd)}>
          <div className="col-lg-6">
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
          <div className="col-lg-6">
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
          <div className="col-lg-6">
            <label className="form-label" htmlFor="media-folder">
              {t("folder")}
            </label>
            <MediaFolderSelect
              folders={folders}
              value={folderId}
              onChange={setFolderId}
              onFolderCreated={(folder) => setFolders((current) => [...current, folder])}
            />
          </div>
          <div className="col-lg-6">
            <label className="form-label">{t("tags")}</label>
            <TagInput
              tags={tags}
              onChange={setTags}
              placeholder={t("tagPlaceholder")}
              addLabel={t("addTag")}
              removeLabel={t("removeTag")}
            />
            <p className="fs-12 text-gray-6 mb-0 mt-1">{t("tagsHint")}</p>
            <input type="hidden" name="tags" value={tags.join(",")} />
          </div>
          <div className="col-12 mt-2">
            <h3 className="h6 mb-0">{t("focalTitle")}</h3>
          </div>
          <div className="col-lg-3">
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
          <div className="col-lg-3">
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
          <div className="col-lg-6 d-flex align-items-end">
            <p className="fs-12 text-gray-6 mb-2">{t("focalHint")}</p>
          </div>
          <div className="col-12 d-flex justify-content-end gap-2">
            <Link href="/admin/media" className="btn btn-light">
              {t("cancel")}
            </Link>
            <button
              type="submit"
              className="btn btn-primary px-4 media-upload-submit"
              disabled={pending}
            >
              {pending ? t("uploading") : t("upload")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
