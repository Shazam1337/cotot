export const SOL_USD_RATE = 100;

const solNumber = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 4,
});

export function usdToSol(usdAmount: number) {
  return usdAmount / SOL_USD_RATE;
}

export function formatSol(solAmount: number) {
  return `${solNumber.format(solAmount)} SOL`;
}
