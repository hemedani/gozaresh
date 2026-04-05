import { redirect } from "next/navigation";
import { getMe } from "@/app/actions/auth/actions";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AdminLayoutShell } from "@/components/layout/admin-layout-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { success, body: user } = await getMe();

  if (!success || !user) {
    redirect("/fa/login");
  }

  const isAdmin = ["Ghost", "Manager", "Editor"].includes(user.level);
  if (!isAdmin) {
    redirect("/fa/reports");
  }

  // Admin panel defaults to Persian (fa) since it has no locale prefix in the URL
  const messages = await getMessages({ locale: "fa" });

  return (
    <NextIntlClientProvider messages={messages} locale="fa">
      <AdminLayoutShell>
        {children}
      </AdminLayoutShell>
    </NextIntlClientProvider>
  );
}
