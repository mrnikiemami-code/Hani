const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

export async function apiGet<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${apiBase}${path}`, {
      cache: "no-store",
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export function formatMoney(
  amount: number | null | undefined,
  currency: string | null | undefined,
  locale = "fa"
): string {
  if (amount == null) {
    return "—";
  }

  if (!currency) {
    return new Intl.NumberFormat(locale).format(amount);
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0
    }).format(amount);
  } catch {
    return `${new Intl.NumberFormat(locale).format(amount)} ${currency}`;
  }
}
