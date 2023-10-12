import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ko"],

  // Used when no locale matches
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
