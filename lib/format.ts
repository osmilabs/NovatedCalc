/** Whole dollars with thousands separators, no sign: 12,345 */
export function amount(n: number) {
  return Math.round(Math.abs(n)).toLocaleString("en-AU");
}

export function money(n: number) {
  return `${n < 0 ? "-" : ""}$${amount(n)}`;
}

export function percent(rate: number, digits = 0) {
  return `${(rate * 100).toFixed(digits)}%`;
}
