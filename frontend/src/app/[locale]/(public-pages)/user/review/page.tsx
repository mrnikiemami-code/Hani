import { getTranslations, setRequestLocale } from "next-intl/server";
import { getMyReviews } from "@/features/dashboard/infrastructure/reviews-api";
import { FinancePageShell } from "@/features/dashboard/ui/FinancePageShell";

export const dynamic = "force-dynamic";

export default async function ReviewPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "reviews" });
  const reviews = await getMyReviews();

  return (
    <FinancePageShell
      title={t("reviewsTitle")}
      subtitle={t("reviewsSubtitle")}
      active={t("reviewsTitle")}
    >
      <div className="card">
        <div className="card-body">
          {reviews.length === 0 ? (
            <p className="text-gray-5 mb-0">{t("noReviews")}</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="fs-13">{t("target")}</th>
                    <th className="fs-13">{t("rating")}</th>
                    <th className="fs-13">{t("comment")}</th>
                    <th className="fs-13">{t("status")}</th>
                    <th className="fs-13">{t("publishedAt")}</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review.reviewId}>
                      <td className="fs-14 fw-medium">
                        {review.targetType} · {review.targetId}
                      </td>
                      <td className="fs-14">{review.rating}</td>
                      <td className="fs-14 text-gray-6">
                        {review.title ?? review.comment}
                      </td>
                      <td>
                        <span className="badge badge-soft-info rounded-pill">
                          {review.status}
                        </span>
                      </td>
                      <td className="fs-14 text-gray-6">
                        {new Date(review.publishedAt ?? review.createdAt).toLocaleDateString(locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </FinancePageShell>
  );
}
