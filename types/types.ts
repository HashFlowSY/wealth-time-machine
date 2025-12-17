export interface CalculationResult {
  year: number;
  principalNominal: number; // 累计投入本金 (Nominal Principal)
  principalReal: number; // 本金购买力 (Real Principal Power - Cash held)
  assetNominal: number; // 名义资产 (Nominal Asset)
  assetReal: number; // 真实购买力 (Real Purchasing Power - Investment)
}

export interface SummaryData {
  finalPrincipalNominal: number;
  finalPrincipalReal: number;
  finalAssetNominal: number;
  finalAssetReal: number;
  netRealGain: number; // finalAssetReal - finalPrincipalReal
  inflationDrag: number; // finalAssetNominal - finalAssetReal
}

export interface InputState {
  initialPrincipal: number;
  annualDeposit: number;
  annualRate: number;
  years: number;
  inflationRate: number;
}

export interface InputControlProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  tooltip?: string;
}

export interface CustomTooltipInfo {
  active?: boolean;
  payload?: PayloadItem[];
  label?: number;
}

export interface PayloadItem {
  dataKey: string;
  value: number;
}
