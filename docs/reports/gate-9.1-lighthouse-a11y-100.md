# Gate 9.1 — Home Parity+ Phase 4 Lighthouse Closure

Date: 2026-11-16

## Result

Lighthouse now reports 100 in Accessibility, Best Practices, and SEO for the
public home page and canonical tour listing in FA, EN, and AR.

| Page | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|
| `/fa` | 100 | 100 | 100 |
| `/en` | 100 | 100 | 100 |
| `/ar` | 100 | 100 | 100 |
| `/fa/tours?scope=domestic` | 100 | 100 | 100 |

The audit tool does not emulate a mobile device. Mobile layout is covered by
the Playwright 390px no-overflow test and the mobile screenshot.

## Fixes applied

### Tour listing / shared template

- Removed invalid `role="menu"` from tour search dropdown toggles.
- Replaced decorative `h5`/`h6` elements with non-heading elements or valid
  heading levels, preserving the template visual classes.
- Added an accessible name to the price slider handles via PrimeReact `pt`.
- Added `aria-label` to the hidden PrimeReact range input.
- Added accessible names to breadcrumb, view-mode, wishlist, expand-menu,
  dark/light mode, back-to-top, play-video, and social links.
- Darkened the `primary-900` button shade from `#D4483B` to `#C23B2F` so
  white-on-primary text meets WCAG AA (5.3:1).
- Added a `main` landmark and skip link in the locale layout.
- Added real labels for booking dropdowns, date ranges, and date pickers.

### SEO

- Absolute canonical and `hreflang` for FA/EN/AR.
- Open Graph and Twitter card metadata.
- JSON-LD graph: `Organization`, `WebSite`, `SearchAction`, `ItemList`,
  `BreadcrumbList`.
- Multilingual `sitemap.xml` with canonical tour scope URLs.
- `robots.txt` pointing at the sitemap.
- Topical home H1 replacing the decorative template word.
- Safe fallback for invalid `page` query values.

## Verification

- Playwright public smoke: 10 passed.
- Home metadata: canonical, 3 hreflang links, main landmark, H1, JSON-LD.
- Listing metadata: canonical, hreflang, `ItemList`, `BreadcrumbList`.
- Sitemap/robots: all locales and tour scopes present.
- Invalid `scope`/`page`: HTTP 200, no crash.
- Keyboard hero scope tabs: ArrowLeft/ArrowRight.
- API/unit/architecture/integration test suite: green.
- Frontend production build: green.
- `scripts/verify.ps1`: green.

## Screenshots

- `docs/reports/gate-9.1-home-default.png`
- `docs/reports/gate-9.1-home-en.png`
- `docs/reports/gate-9.1-home-ar.png`
- `docs/reports/gate-9.1-home-mobile-fa.png`
- `docs/reports/gate-9.1-tours-domestic-fa.png`
- `docs/reports/gate-9.1-tours-foreign-fa.png`

## Remaining external blockers

- Real PSP/sandbox credentials and production webhook.
- Flight provider, Lastgram, real SMS/Email, production storage, CDN/DNS/TLS.
