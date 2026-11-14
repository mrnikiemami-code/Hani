import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet } from "@/lib/api";
import type { BlogDetail } from "@/lib/types";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const post = await apiGet<BlogDetail>(
    `/market/v1/content/blog/${slug}?locale=${locale}`
  );

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          {!post ? (
            <p className="muted">{t("noResults")}</p>
          ) : (
            <article>
              <h1>{post.title}</h1>
              <p className="muted">{post.excerpt}</p>
              <div style={{ whiteSpace: "pre-wrap" }}>{post.body}</div>
            </article>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
