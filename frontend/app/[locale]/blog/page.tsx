import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet } from "@/lib/api";
import type { BlogSummary, PagedResult } from "@/lib/types";
import { Link } from "@/i18n/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function BlogPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const page = Math.max(1, Number(query.page ?? "1"));
  const data = await apiGet<PagedResult<BlogSummary>>(
    `/market/v1/content/blog?locale=${locale}&page=${page}&pageSize=20&q=${encodeURIComponent(
      query.q ?? ""
    )}`
  );

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          <h1>{t("blog")}</h1>
          <form className="filters" action={`/${locale}/blog`}>
            <input className="input" name="q" defaultValue={query.q ?? ""} placeholder={t("search")} />
            <button className="button" type="submit">
              {t("search")}
            </button>
          </form>
          <div className="grid">
            {(data?.items ?? []).map((post) => (
              <Link className="card" key={post.postId} href={`/blog/${post.slug}`}>
                <h3>{post.title}</h3>
                <p className="muted">{post.excerpt}</p>
                <span className="muted">{post.viewCount} views</span>
              </Link>
            ))}
          </div>
          {!data?.items.length && <p className="muted">{t("noResults")}</p>}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
