"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import type { ContentEntryWrite } from "../domain/content-entry";

type Check = {
  id: string;
  status: "good" | "warn" | "bad";
  weight: number;
  detail: string;
};

function textFromHtml(value: string): string {
  return value.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Lightweight SEO audit for the content editor. This is intentionally
 * deterministic and runs locally; no content leaves the browser.
 */
export function ContentSeoPanel({ form }: { form: ContentEntryWrite }) {
  const t = useTranslations("adminContent");
  const checks = useMemo<Check[]>(() => {
    const bodyText = textFromHtml(form.body);
    const words = bodyText ? bodyText.split(/\s+/).filter(Boolean).length : 0;
    const title = form.seoTitle?.trim() || form.title.trim();
    const description = form.seoDescription?.trim() || form.excerpt?.trim() || "";
    const headings = (form.body.match(/<h[23][\s>]/gi) ?? []).length;
    const slug = form.slug.trim();
    const titleLength = title.length;
    const descriptionLength = description.length;

    return [
      {
        id: "title",
        weight: 18,
        status: titleLength >= 30 && titleLength <= 60 ? "good" : titleLength ? "warn" : "bad",
        detail: t("seoTitleLength", { count: titleLength })
      },
      {
        id: "description",
        weight: 18,
        status:
          descriptionLength >= 120 && descriptionLength <= 160
            ? "good"
            : descriptionLength
              ? "warn"
              : "bad",
        detail: t("seoDescriptionLength", { count: descriptionLength })
      },
      {
        id: "slug",
        weight: 12,
        status: /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? "good" : "bad",
        detail: t("seoSlug")
      },
      {
        id: "body",
        weight: 22,
        status: words >= 300 ? "good" : words >= 120 ? "warn" : "bad",
        detail: t("seoBodyLength", { count: words })
      },
      {
        id: "headings",
        weight: 10,
        status: headings >= 2 ? "good" : headings === 1 ? "warn" : "bad",
        detail: t("seoHeadings", { count: headings })
      },
      {
        id: "image",
        weight: 10,
        status: form.heroMediaId || form.heroImageUrl ? "good" : "bad",
        detail: t("seoImage")
      },
      {
        id: "excerpt",
        weight: 10,
        status: form.excerpt?.trim() ? "good" : "warn",
        detail: t("seoExcerpt")
      }
    ];
  }, [form, t]);

  const score = checks.reduce(
    (total, check) =>
      total + check.weight * (check.status === "good" ? 1 : check.status === "warn" ? 0.5 : 0),
    0
  );
  const suggestions = checks.filter((check) => check.status !== "good");

  return (
    <div className="border rounded p-3 mt-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div>
          <h3 className="h6 mb-1">{t("seoAuditTitle")}</h3>
          <p className="fs-12 text-gray-6 mb-0">{t("seoHint")}</p>
        </div>
        <span
          className={`badge ${
            score >= 80 ? "bg-success" : score >= 55 ? "bg-warning text-dark" : "bg-danger"
          } fs-14`}
        >
          {Math.round(score)}/100
        </span>
      </div>
      <div className="progress mb-3" style={{ height: 6 }}>
        <div
          className={`progress-bar ${
            score >= 80 ? "bg-success" : score >= 55 ? "bg-warning" : "bg-danger"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
      <ul className="list-unstyled mb-0">
        {suggestions.length === 0 ? (
          <li className="fs-13 text-success">{t("seoAllGood")}</li>
        ) : (
          suggestions.map((check) => (
            <li key={check.id} className="fs-13 text-gray-7 mb-1">
              <i className="isax isax-info-circle me-1" />
              {check.detail}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
