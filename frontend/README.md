# Hani Frontend (Dreamstour Template Base)

This app uses the purchased Dreamstour Next.js template as the single visual
source. Hani platform code is integrated inside the template.

## Local development

```powershell
cd frontend
copy .env.example .env.local
npm ci
npm run dev
```

Environment:

- `API_BASE_URL` — Hani API base URL (default `http://localhost:5099`)
- `NEXT_PUBLIC_BASE_PATH` — optional deployment base path

## Routes

Locale-prefixed:

```text
/fa/...
/en/...
/ar/...
```

- `/` redirects to `/fa`
- `/[locale]` — selected Home Experience
- `/[locale]/settings/experience` — choose one of 12 Home Experiences
- Template routes are available under the locale prefix, for example:
  `/fa/tour/tour-grid`, `/fa/hotel/hotel-grid`, `/fa/visa/visa-grid`

## Architecture

- Template app: `src/app`, `src/views`, `src/components`, `src/core`,
  `src/style`
- Hani integration: `src/features`, `src/lib/hani`, `src/i18n`, `src/messages`
- Home Experience registry:
  `src/features/home-experience/infrastructure/registry.ts`
- Locale routing: `src/i18n/routing.ts`, `src/proxy.ts`

## Build

```powershell
npm run build
npm run start
```
