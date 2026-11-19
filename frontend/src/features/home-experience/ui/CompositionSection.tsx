"use client";

import Link from "next/link";
import type { PageSection } from "../domain/page-composition";

/** Renders a composed section that is not owned by a fixed home component. */
export function CompositionSection({ section }: { section: PageSection }) {
  if (!section.enabled) return null;

  const image = section.fallbackImageUrl;
  const title = section.title;
  const subtitle = section.subtitle;
  const body = section.body;
  const cta =
    section.ctaLabel && section.ctaHref ? (
      <Link href={section.ctaHref} className="btn btn-primary mt-3">
        {section.ctaLabel}
      </Link>
    ) : null;

  return (
    <section className="section recommended-sec" id={section.id}>
      <div className="container">
        {title || subtitle ? (
          <div className="section-header-eight">
            {title ? <h2>{title}</h2> : null}
            {subtitle ? <p className="text-gray-6 mb-0">{subtitle}</p> : null}
          </div>
        ) : null}
        {image ? (
          <div className="mb-4">
            <img
              src={image}
              alt={title || "Hani"}
              width={1200}
              height={500}
              loading="lazy"
              className="img-fluid w-100 rounded"
              style={{ objectFit: "cover", maxHeight: 520 }}
            />
          </div>
        ) : null}
        {body ? (
          <p className="text-gray-6 mb-0" style={{ whiteSpace: "pre-line" }}>
            {body}
          </p>
        ) : null}
        {cta}
      </div>
    </section>
  );
}
