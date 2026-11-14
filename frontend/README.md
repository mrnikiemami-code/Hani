# Hani Frontend

Next.js 16 / React 19 frontend for the Hani API-first marketplace.

## Local development

```powershell
cd frontend
copy .env.example .env.local
npm install
npm run dev
```

Set `API_BASE_URL` to the Hani API (default `http://localhost:5099`).

## Routes

- `/[locale]` — home aggregation from `GET /market/v1/home`
- `/[locale]/tours` and `/[locale]/tours/[slug]`
- `/[locale]/hotels` and `/[locale]/hotels/[slug]`
- `/[locale]/visa` and `/[locale]/visa/[slug]`
- `/[locale]/blog`, `/[locale]/itineraries`, `/[locale]/videos`
- `/[locale]/agencies` and `/[locale]/agencies/[slug]`
- `/[locale]/u/[username]` — author aggregate profile
- `/[locale]/restaurants`, `/[locale]/attractions`
- `/[locale]/flights`

Locales: `fa`, `en`, `ar`; FA/AR render RTL.

## Production

```powershell
npm run build
npm run start
```

The Dockerfile builds a standalone Next.js image:

```powershell
docker build -t hani-frontend .
docker run -p 3000:3000 -e API_BASE_URL=http://hani-api:8080 hani-frontend
```
