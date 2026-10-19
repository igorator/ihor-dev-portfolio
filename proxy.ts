import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  // Generated OG images are linked with the locale prefix; skip the
  // as-needed redirect so crawlers get the PNG directly
  matcher: ["/((?!api|_next|.*opengraph-image|.*\\..*|favicon.ico).*)"],
};
