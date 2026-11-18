"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { formatIsoInstant } from "@/lib/hani/calendar";
import { useMessageBox } from "@/components/hani/message-provider";
import type {
  PagedPending,
  PendingMedia,
  PendingReview
} from "../domain/admin-moderation";
import { moderateMedia, moderateReview } from "../application/moderation-actions";

/** Review and user-photo moderation queue. */
export function ModerationManager({
  locale,
  reviews,
  media
}: {
  locale: string;
  reviews: PagedPending<PendingReview>;
  media: PagedPending<PendingMedia>;
}) {
  const t = useTranslations("adminModeration");
  const messages = useMessageBox();
  const [reviewItems, setReviewItems] = useState(reviews.items);
  const [mediaItems, setMediaItems] = useState(media.items);
  const [pending, startTransition] = useTransition();

  const reviewAction = async (
    review: PendingReview,
    action: "publish" | "reject"
  ) => {
    const confirmed = await messages.confirm({
      kind: action === "publish" ? "question" : "warning",
      title: action === "publish" ? t("publishConfirm") : t("rejectConfirm"),
      message: review.comment.slice(0, 180),
      confirmLabel: action === "publish" ? t("publish") : t("reject")
    });
    if (!confirmed) return;
    startTransition(async () => {
      const result = await moderateReview(
        review.reviewId,
        action,
        t("rejectReason")
      );
      if (result.ok) {
        setReviewItems((current) =>
          current.filter((item) => item.reviewId !== review.reviewId)
        );
        messages.toast({ kind: "success", message: t("done") });
      } else {
        messages.toast({ kind: "error", message: t("error") });
      }
    });
  };

  const mediaAction = async (
    item: PendingMedia,
    action: "approve" | "reject"
  ) => {
    const confirmed = await messages.confirm({
      kind: action === "approve" ? "question" : "warning",
      title: action === "approve" ? t("approveConfirm") : t("rejectConfirm"),
      message: item.url,
      confirmLabel: action === "approve" ? t("approve") : t("reject")
    });
    if (!confirmed) return;
    startTransition(async () => {
      const result = await moderateMedia(
        item.mediaId,
        action,
        t("rejectReason")
      );
      if (result.ok) {
        setMediaItems((current) =>
          current.filter((entry) => entry.mediaId !== item.mediaId)
        );
        messages.toast({ kind: "success", message: t("done") });
      } else {
        messages.toast({ kind: "error", message: t("error") });
      }
    });
  };

  return (
    <div className="d-flex flex-column gap-4">
      <div className="card border-0 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("reviewsTitle")}</h2>
          <span className="badge badge-warning">{reviews.totalCount}</span>
        </div>
        <div className="card-body p-0">
          <div className="admin-table-wrap">
            <table className="table admin-data-table content-data-table align-middle mb-0">
              <thead className="thead-light">
                <tr>
                  <th>{t("author")}</th>
                  <th>{t("rating")}</th>
                  <th className="d-none d-lg-table-cell">{t("target")}</th>
                  <th className="d-none d-md-table-cell">{t("createdAt")}</th>
                  <th className="text-end">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {reviewItems.map((review) => (
                  <tr key={review.reviewId}>
                    <td>
                      <strong className="d-block">{review.authorDisplayName}</strong>
                      <span className="fs-12 text-gray-6 d-block text-truncate" style={{ maxWidth: 320 }}>
                        {review.comment}
                      </span>
                    </td>
                    <td>{review.rating}</td>
                    <td className="d-none d-lg-table-cell">
                      {review.targetType}
                    </td>
                    <td className="d-none d-md-table-cell text-nowrap">
                      {formatIsoInstant(review.createdAt, locale, {
                        dateStyle: "medium"
                      })}
                    </td>
                    <td>
                      <div className="d-flex justify-content-end gap-1">
                        <button
                          type="button"
                          className="btn btn-light btn-sm"
                          disabled={pending}
                          onClick={() => reviewAction(review, "publish")}
                        >
                          {t("publish")}
                        </button>
                        <button
                          type="button"
                          className="btn btn-light btn-sm text-danger"
                          disabled={pending}
                          onClick={() => reviewAction(review, "reject")}
                        >
                          {t("reject")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {reviewItems.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-6 py-4">
                      {t("emptyReviews")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("mediaTitle")}</h2>
          <span className="badge badge-warning">{media.totalCount}</span>
        </div>
        <div className="card-body p-0">
          <div className="admin-table-wrap">
            <table className="table admin-data-table content-data-table align-middle mb-0">
              <thead className="thead-light">
                <tr>
                  <th>{t("media")}</th>
                  <th className="d-none d-md-table-cell">{t("kind")}</th>
                  <th className="d-none d-md-table-cell">{t("createdAt")}</th>
                  <th className="text-end">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {mediaItems.map((item) => (
                  <tr key={item.mediaId}>
                    <td>
                      <a href={item.url} target="_blank" rel="noreferrer" dir="ltr">
                        {item.url}
                      </a>
                    </td>
                    <td className="d-none d-md-table-cell">{item.kind}</td>
                    <td className="d-none d-md-table-cell text-nowrap">
                      {formatIsoInstant(item.createdAt, locale, {
                        dateStyle: "medium"
                      })}
                    </td>
                    <td>
                      <div className="d-flex justify-content-end gap-1">
                        <button
                          type="button"
                          className="btn btn-light btn-sm"
                          disabled={pending}
                          onClick={() => mediaAction(item, "approve")}
                        >
                          {t("approve")}
                        </button>
                        <button
                          type="button"
                          className="btn btn-light btn-sm text-danger"
                          disabled={pending}
                          onClick={() => mediaAction(item, "reject")}
                        >
                          {t("reject")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {mediaItems.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-6 py-4">
                      {t("emptyMedia")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
