import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const apiOrigin =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5099";
const apiWsOrigin = apiOrigin.replace(/^http/, "ws");
const isProduction = process.env.NODE_ENV === "production";

const sensitivePath =
  /\/(admin|agent|user|checkout|login|register|visa\/visa-application|visa\/visa-booking-confirmation)(\/|$)/i;

function contentSecurityPolicy(nonce: string | null): string {
  const scriptSource = nonce
    ? `'self' 'nonce-${nonce}' 'strict-dynamic'`
    : "'self' 'unsafe-inline'";
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    `script-src ${scriptSource}${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline' https:",
    "style-src-attr 'unsafe-inline'",
    `img-src 'self' data: blob: https: ${apiOrigin}`,
    "font-src 'self' data: https:",
    `connect-src 'self' ${apiOrigin} ${apiWsOrigin} https: wss:`,
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "media-src 'self' https:",
    isProduction ? "upgrade-insecure-requests" : ""
  ]
    .filter(Boolean)
    .join("; ");
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const strict = sensitivePath.test(pathname);
  const nonce = strict
    ? Buffer.from(crypto.randomUUID()).toString("base64")
    : null;
  const csp = contentSecurityPolicy(nonce);

  const requestHeaders = new Headers(request.headers);
  if (nonce) {
    requestHeaders.set("x-nonce", nonce);
    requestHeaders.set("Content-Security-Policy", csp);
  }

  const response = intlMiddleware(
    new NextRequest(request, { headers: requestHeaders })
  );
  response.headers.set("Content-Security-Policy", csp);
  if (nonce) {
    response.headers.set("x-nonce", nonce);
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|assets|.*\\..*).*)"]
};
