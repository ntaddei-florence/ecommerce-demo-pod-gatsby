export function formatAmountWithCurrency(amountInCents: number, currency: string) {
  return `${amountInCents / 100}${currency}`;
}
