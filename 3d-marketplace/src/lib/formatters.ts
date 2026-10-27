export function formatPrice(value: number, currency = "تومان") {
  return new Intl.NumberFormat("fa-IR").format(value) + " " + currency;
}
