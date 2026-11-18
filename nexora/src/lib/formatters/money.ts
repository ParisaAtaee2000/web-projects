/** The storefront displays Toman; domain/API amounts are integer IRR (10 IRR = 1 Toman). */
export function formatToman(amountIrr: number): string {
  return new Intl.NumberFormat('fa-IR').format(Math.round(amountIrr / 10))
}
