import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { formatMoney } from "@/lib/hani/money";
import { getMyWishlist } from "@/features/wishlist/infrastructure/wishlist-api";
import { removeWishlist } from "@/features/wishlist/application/wishlist-actions";
import { FinancePageShell } from "@/features/dashboard/ui/FinancePageShell";

export const dynamic = "force-dynamic";

export default async function WishlistPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "wishlist" });
  const items = await getMyWishlist();

  return (
    <FinancePageShell
      title={t("wishlistTitle")}
      subtitle={t("wishlistSubtitle")}
      active={t("wishlistTitle")}
    >
      <div className="card">
        <div className="card-body">
          {items.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-5">{t("empty")}</p>
              <Link className="btn btn-primary btn-sm" href={`/${locale}/tours`}>
                {t("browseTours")}
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="fs-13">{t("wishlistTitle")}</th>
                    <th className="fs-13">{t("price")}</th>
                    <th className="fs-13" />
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.productId}>
                      <td className="fs-14 fw-medium">
                        <Link href={`/${locale}/tours/${item.slug}`}>{item.title}</Link>
                      </td>
                      <td className="fs-14 text-gray-6">
                        {formatMoney(item.minPrice, item.currency, locale)}
                      </td>
                      <td className="text-end">
                        <form action={removeWishlist}>
                          <input type="hidden" name="locale" value={locale} />
                          <input type="hidden" name="productId" value={item.productId} />
                          <button className="btn btn-sm btn-outline-danger" type="submit">
                            {t("remove")}
                          </button>
                        </form>
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
