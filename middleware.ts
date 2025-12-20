import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// External redirect URLs
const EXTERNAL_REDIRECTS: Record<string, string> = {
  "/docs": "https://rip-comm.github.io/Sossoldi/",
  "/contribute": "https://github.com/RIP-Comm/Sossoldi/blob/main/CONTRIBUTING.md",
  "/community": "https://discord.gg/2A3SkHhw5H",
  "/repo": "https://github.com/RIP-Comm/Sossoldi",
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
