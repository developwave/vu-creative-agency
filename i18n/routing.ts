import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "es"],

  // Used when no locale matches
  defaultLocale: "en",

  // Detect locale from browser Accept-Language header
  localeDetection: true,

  // Prefix locales in the URL (always show /en or /es)
  localePrefix: "always",
});
