# ADR-0034: Content Media Library with WebP-First Storage

- Status: Accepted
- Date: 2026-11-17
- Gate: 9.1 / content platform

## Context

Hani needs a professional content/media library rather than static images and
ad-hoc URL fields. Images must be fast, SEO-safe, responsive, and portable
between local disk, S3-compatible storage, R2, or another provider.

## Decision

1. Content module owns media metadata; binaries live in a storage provider.
2. `IContentMediaStorage` abstracts storage. Phase 1 implements local disk.
   S3-compatible and cloud providers can be added without changing content.
3. Every uploaded raster image is converted to WebP and responsive variants
   (320/640/1280/1920 plus the source width) with EXIF removed.
4. Assets are stored under immutable content-addressed keys:
   `{hash-prefix}/{hash}/{width}.webp`.
5. Database stores metadata, hash, dimensions, alt/caption/credit, and variant
   records; it never stores blobs.
6. Alt text is required by the upload API.
7. Media admin endpoints are `Admin`-only; public files are served by the
   storage/CDN URL.
8. Future phases add folders, tags, usage, replacements, S3/R2, CDN, and the
   content CMS.

## Consequences

- One upload creates optimized WebP variants automatically.
- The same asset can be moved from local disk to cloud without content changes.
- SEO and CLS can use stored width/height and variant URLs.
- Existing template `<img>` usage is not automatically migrated; content
  surfaces should consume media DTOs in the next phase.
