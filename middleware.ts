import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// External redirect URLs
const EXTERNAL_REDIRECTS: Record<string, string> = {
  "/docs": "https://rip-comm.github.io/sossoldi/",
  "/contribute": "https://rip-comm.github.io/sossoldi/contributing/PR-guide.html",
  "/community": "https://discord.com/invite/PcaUZnvPzS",
  "/repo": "https://github.com/RIP-Comm/sossoldi",
};

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle external redirects first
  for (const [path, url] of Object.entries(EXTERNAL_REDIRECTS)) {
    if (pathname === path || pathname.endsWith(path)) {
      return NextResponse.redirect(url);
    }
  }

  // Handle locale routing
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - api routes
    // - static files (e.g. /favicon.ico, /_next/...)
    // - internal Next.js routes
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
