import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes and Next.js internals
  // - files with an extension (e.g. /media/logo-white.png, favicon.png)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
