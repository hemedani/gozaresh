import { getTranslations } from "next-intl/server";
import { getUsers } from "@/app/actions/user/getUsers";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { UsersTable } from "./users-table";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; level?: string };
}) {
  const t = await getTranslations("admin");
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";
  const level = searchParams.level || "all";

  const setQuery: any = { page, limit: 10 };
  if (search) setQuery.search = search;
  if (level !== "all") setQuery.levels = level;

  // Fetch users
  const response = await getUsers(setQuery, {
    _id: 1,
    first_name: 1,
    last_name: 1,
    email: 1,
    level: 1,
    createdAt: 1,
  });

  const users = response?.list || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("usersManagement") || "Users Management"}</h1>
          <p className="text-muted-foreground">{t("usersManagementDescription") || "Manage user accounts and roles"}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <form method="GET" className="flex flex-wrap gap-4 w-full items-start sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              name="search"
              placeholder={t("searchUsers") || "Search users..."}
              defaultValue={search}
              className="pl-8"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select name="level" defaultValue={level}>
              <SelectTrigger>
                <SelectValue placeholder={t("level")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allLevels") || "All Levels"}</SelectItem>
                <SelectItem value="Ghost">{t("level_Ghost") || "Ghost"}</SelectItem>
                <SelectItem value="Manager">{t("level_Manager") || "Manager"}</SelectItem>
                <SelectItem value="Editor">{t("level_Editor") || "Editor"}</SelectItem>
                <SelectItem value="Ordinary">{t("level_Ordinary") || "Ordinary"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" variant="secondary">
            {t("search") || "Search"}
          </Button>
        </form>
      </div>

      <UsersTable users={users} />

      <div className="flex items-center justify-end space-x-2 py-4">
        {page > 1 ? (
          <Button variant="outline" size="sm" asChild>
            <Link
              href={`/admin/users?page=${page - 1}${search ? `&search=${search}` : ""}${level !== "all" ? `&level=${level}` : ""}`}
            >
              {t("previous") || "Previous"}
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            {t("previous") || "Previous"}
          </Button>
        )}
        {users.length >= 10 ? (
          <Button variant="outline" size="sm" asChild>
            <Link
              href={`/admin/users?page=${page + 1}${search ? `&search=${search}` : ""}${level !== "all" ? `&level=${level}` : ""}`}
            >
              {t("next") || "Next"}
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            {t("next") || "Next"}
          </Button>
        )}
      </div>
    </div>
  );
}
