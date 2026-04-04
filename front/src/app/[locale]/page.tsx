import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Home() {
  const t = useTranslations("home");
  const nav = useTranslations("nav");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/reports/new"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            {t("ctaButton")}
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-md border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            {nav("login")}
          </Link>
        </div>
      </div>
    </main>
  );
}
