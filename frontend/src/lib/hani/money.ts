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
