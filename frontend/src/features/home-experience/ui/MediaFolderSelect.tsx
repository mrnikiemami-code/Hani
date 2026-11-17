"use client";

import { useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import type { MediaFolder } from "../domain/media";
import { createMediaFolder } from "../application/media-actions";

/**
 * Folder select with an inline add-folder action and a centered modal.
 */
export function MediaFolderSelect({
  folders,
  value,
  onChange,
  onFolderCreated,
  selectId = "media-folder",
  name = "folderId"
}: {
  folders: MediaFolder[];
  value: string;
  onChange: (value: string) => void;
  onFolderCreated: (folder: MediaFolder) => void;
  selectId?: string;
  name?: string;
}) {
  const t = useTranslations("adminMedia");
  const [open, setOpen] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [error, setError] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const create = () => {
    if (!nameValue.trim()) return;
    startTransition(async () => {
      const result = await createMediaFolder(nameValue.trim());
      if (result.ok && result.data) {
        onFolderCreated(result.data);
        onChange(result.data.id);
        setNameValue("");
        setError(false);
        setOpen(false);
      } else {
        setError(true);
      }
    });
  };

  return (
    <>
      <div className="d-flex gap-2 media-folder-select-row">
        <select
          id={selectId}
          className="form-select"
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">{t("noFolder")}</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn btn-light text-nowrap media-folder-add"
          onClick={() => {
            setError(false);
            setOpen(true);
          }}
        >
          {t("addFolder")}
        </button>
      </div>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              className="modal fade show d-block"
              role="dialog"
              aria-modal="true"
              aria-labelledby="media-folder-modal-title"
              tabIndex={-1}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setOpen(false);
              }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="media-folder-modal-title">
                      {t("addFolderTitle")}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label={t("cancel")}
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <div className="modal-body">
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {t("error")}
                      </div>
                    )}
                    <label className="form-label" htmlFor="media-new-folder">
                      {t("newFolder")}
                    </label>
                    <input
                      id="media-new-folder"
                      className="form-control"
                      value={nameValue}
                      autoFocus
                      maxLength={120}
                      onChange={(event) => setNameValue(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && nameValue.trim()) {
                          event.preventDefault();
                          create();
                        }
                      }}
                    />
                    <p className="fs-12 text-gray-6 mb-0 mt-2">
                      {t("addFolderHint")}
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => setOpen(false)}
                    >
                      {t("cancel")}
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={create}
                      disabled={pending || !nameValue.trim()}
                    >
                      {t("addFolder")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show" />
          </>,
          document.body
        )}
    </>
  );
}
