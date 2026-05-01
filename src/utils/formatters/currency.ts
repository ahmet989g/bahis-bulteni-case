export function formatCurrency(
  value: number,
  locale = "tr-TR",
  currency = "TRY"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}