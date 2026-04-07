import { defineRouting } from "next-intl/routing";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["fa", "en", "ar"],
  defaultLocale: "fa",
  localePrefix: "always",
  localeDetection: true,
});

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing);
