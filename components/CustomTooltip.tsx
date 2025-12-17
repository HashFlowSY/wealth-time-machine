"use client";

import { formatCurrency } from "../utils/calculation";
import { CustomTooltipInfo, PayloadItem } from "../types/types";

// Custom Tooltip
export default function CustomTooltip({
  active,
  payload,
  label,
}: CustomTooltipInfo) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur shadow-xl border border-slate-100 p-4 rounded-lg text-sm min-w-60">
        <p className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">
          第 {label} 年
        </p>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-emerald-600">
            <span className="flex items-center gap-2 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
              名义资产
            </span>
            <span className="font-mono font-bold">
              {formatCurrency(
                payload.find((p: PayloadItem) => p.dataKey === "assetNominal")
                  ?.value || 0
              )}
            </span>
          </div>
          <div className="flex justify-between items-center text-emerald-800">
            <span className="flex items-center gap-2 text-xs font-medium">
              <div className="w-3 h-0.5 bg-emerald-800"></div> 真实购买力
            </span>
            <span className="font-mono font-bold">
              {formatCurrency(
                payload.find((p: PayloadItem) => p.dataKey === "assetReal")
                  ?.value || 0
              )}
            </span>
          </div>
          <div className="border-t border-dashed border-slate-200 my-1"></div>
          <div className="flex justify-between items-center text-slate-500">
            <span className="flex items-center gap-2 text-xs">
              <div className="w-3 h-0.5 bg-slate-400 border-t border-dashed"></div>{" "}
              累计本金
            </span>
            <span className="font-mono">
              {formatCurrency(
                payload.find(
                  (p: PayloadItem) => p.dataKey === "principalNominal"
                )?.value || 0
              )}
            </span>
          </div>
          <div className="flex justify-between items-center text-rose-500">
            <span className="flex items-center gap-2 text-xs">
              <div className="w-3 h-0.5 bg-rose-500 border-t border-dotted"></div>{" "}
              现金持有价值
            </span>
            <span className="font-mono">
              {formatCurrency(
                payload.find((p: PayloadItem) => p.dataKey === "principalReal")
                  ?.value || 0
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
