import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type { AdminUserListResponse } from "@/features/home-experience/domain/admin-user";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { UserManager } from "@/features/home-experience/ui/UserManager";

const PAGE_SIZE = 20;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminUsers" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminUsersPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    q?: string;
    role?: string;
    status?: string;
  }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminUsers" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const role = ["Customer", "Author", "AgencyStaff", "Admin"].includes(
    sp.role ?? ""
  )
    ? sp.role!
    : "";
  const status = ["Pending", "Active", "Blocked"].includes(sp.status ?? "")
    ? sp.status!
    : "";
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(PAGE_SIZE)
  });
  if (q) query.set("q", q);
  if (role) query.set("role", role);
  if (status) query.set("status", status);

  const result = await sessionGet<AdminUserListResponse>(
    `/internal/v1/admin/users?${query}`
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={t("title")}
        activeSection="users"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">
            {tHome("accessHint")}
          </div>
        </div>
      </AdminPageShell>
    );
  }

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
      activeSection="users"
    >
      <UserManager
        key={`${q}-${role}-${status}-${page}`}
        locale={locale}
        initial={
          result.data ?? {
            items: [],
            page,
            pageSize: PAGE_SIZE,
            total: 0
          }
        }
        filters={{ q, role, status }}
      />
    </AdminPageShell>
  );
}
