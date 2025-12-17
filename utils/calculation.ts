import { CalculationResult, SummaryData } from "../types/types";

/**
 * rounds a number to 2 decimal places to avoid floating point artifacts
 */
const round2 = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export const calculateWealth = (
  P: number, // Initial Principal
  PMT: number, // Annual Deposit
  rPercent: number, // Annual Yield %
  n: number, // Duration Years
  iPercent: number // Inflation %
): { chartData: CalculationResult[]; summary: SummaryData } => {
  const r = rPercent / 100;
  const i = iPercent / 100;

  const chartData: CalculationResult[] = [];

  for (let t = 0; t <= n; t++) {
    // 1. Nominal Asset (FV_nominal)
    let fvNominal = 0;
    if (r === 0) {
      fvNominal = P + PMT * t;
    } else {
      const compoundFactor = Math.pow(1 + r, t);
      fvNominal = P * compoundFactor + PMT * ((compoundFactor - 1) / r);
    }

    // 2. Real Purchasing Power (FV_real)
    const inflationFactor = Math.pow(1 + i, t);
    const fvReal = fvNominal / inflationFactor;

    // 3. Nominal Principal (Total_Principal)
    const principalNominal = P + PMT * t;

    // 4. Real Principal Power (Principal_real) - Value if kept in cash
    const principalReal = principalNominal / inflationFactor;

    chartData.push({
      year: t,
      principalNominal: round2(principalNominal),
      principalReal: round2(principalReal),
      assetNominal: round2(fvNominal),
      assetReal: round2(fvReal),
    });
  }

  const final = chartData[chartData.length - 1];

  return {
    chartData,
    summary: {
      finalPrincipalNominal: final.principalNominal,
      finalPrincipalReal: final.principalReal,
      finalAssetNominal: final.assetNominal,
      finalAssetReal: final.assetReal,
      netRealGain: round2(final.assetReal - final.principalReal),
      inflationDrag: round2(final.assetNominal - final.assetReal),
    },
  };
};

export const formatCurrency = (val: number) => {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(val);
};
