import { getTranslations } from "next-intl/server";
import ImageWithBasePath from "@/components/image-with-base-path";
import { Link } from "@/i18n/navigation";
import { getBlogPost, getRelatedBlogPosts } from "../infrastructure/blog-api";

export async function BlogDetailView({
  locale,
  slug
}: {
  locale: string;
  slug: string;
}) {
  const t = await getTranslations({ locale, namespace: "common" });
  const post = await getBlogPost(locale, slug);

  if (!post) {
    return (
      <section className="section">
        <div className="container">
          <p className="text-center text-gray-6">{t("noResults")}</p>
        </div>
      </section>
    );
  }

  const related = await getRelatedBlogPosts(locale, slug, 3);

  return (
    <section className="section">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-8">
            <article className="card blog-details border-0 shadow-sm">
              <div className="card-body p-4 p-lg-5">
                <div className="blog-content">
                  <div className="d-flex align-items-center flex-wrap gap-3 mb-3">
                    <span className="text-gray-6">
                      <i className="isax isax-user me-1" />
                      {t("author")}
                    </span>
                    <span className="text-gray-6">
                      <i className="isax isax-calendar-2 me-1" />
                      {post.publishedAt
                        ? new Intl.DateTimeFormat(locale, {
                            dateStyle: "medium"
                          }).format(new Date(post.publishedAt))
                        : ""}
                    </span>
                    <span className="badge badge-primary">{t("blog")}</span>
                  </div>
                  <h1 className="mb-3">{post.title}</h1>
                  <div className="blog-image mb-4">
                    <ImageWithBasePath
                      src={post.coverUrl ?? "assets/img/blog/blog-01.jpg"}
                      alt={post.title}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="text-gray-7" style={{ whiteSpace: "pre-wrap" }}>
                    {post.body}
                  </div>
                  <div className="d-flex align-items-center gap-4 border-top pt-3 mt-4">
                    <span className="text-gray-6">
                      <i className="isax isax-eye me-1" />
                      {post.viewCount}
                    </span>
                    <span className="text-gray-6">
                      <i className="isax isax-like me-1" />
                      {post.likeCount}
                    </span>
                    <span className="text-gray-6">
                      <i className="isax isax-message me-1" />
                      {post.commentCount}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <aside className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="mb-3">{t("relatedPosts")}</h5>
                <div className="d-flex flex-column gap-3">
                  {related.map((item) => (
                    <Link
                      key={item.postId}
                      href={`/blog/${encodeURIComponent(item.slug)}`}
                      className="d-flex gap-3 align-items-start"
                    >
                      <ImageWithBasePath
                        src={item.coverUrl ?? "assets/img/blog/blog-02.jpg"}
                        alt={item.title}
                        className="rounded"
                        width={80}
                        height={60}
                      />
                      <span>
                        <strong className="d-block">{item.title}</strong>
                        <span className="text-gray-6 fs-14">{item.excerpt}</span>
                      </span>
                    </Link>
                  ))}
                  {related.length === 0 && (
                    <p className="text-gray-6 mb-0">{t("noResults")}</p>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
