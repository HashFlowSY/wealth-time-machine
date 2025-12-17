"use client";
import { useState, useMemo } from "react";
import { InputState } from "../types/types";
import { calculateWealth } from "../utils/calculation";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Wallet, Info, Banknote, PiggyBank } from "lucide-react";
import InputControl from "../components/InputControl";
import CustomTooltip from "../components/CustomTooltip";
import { formatCurrency } from "../utils/calculation";

export default function DataWrapper() {
  const [inputs, setInputs] = useState<InputState>({
    initialPrincipal: 100000,
    annualDeposit: 60000,
    annualRate: 5,
    years: 20,
    inflationRate: 2.5,
  });

  const handleInputChange = (key: keyof InputState, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  // 2. Core Calculation
  const { chartData, summary } = useMemo(() => {
    return calculateWealth(
      inputs.initialPrincipal,
      inputs.annualDeposit,
      inputs.annualRate,
      inputs.years,
      inputs.inflationRate
    );
  }, [inputs]);

  // Derived Insight
  const inflationEatenPercent =
    summary.finalAssetNominal > 0
      ? ((summary.inflationDrag / summary.finalAssetNominal) * 100).toFixed(1)
      : "0";

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Input Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
              参数设置
            </h2>

            <InputControl
              label="初始本金 (P)"
              value={inputs.initialPrincipal}
              onChange={(v) => handleInputChange("initialPrincipal", v)}
              min={0}
              max={10000000}
              step={1000}
              unit="¥"
            />

            <InputControl
              label="每年定投 (PMT)"
              value={inputs.annualDeposit}
              onChange={(v) => handleInputChange("annualDeposit", v)}
              min={0}
              max={1000000}
              step={1000}
              unit="¥"
              tooltip="每年年底投入的固定金额"
            />

            <div className="h-px bg-slate-100 my-6"></div>

            <InputControl
              label="预期年化收益率 (r)"
              value={inputs.annualRate}
              onChange={(v) => handleInputChange("annualRate", v)}
              min={-10}
              max={50}
              step={0.1}
              unit="%"
            />

            <InputControl
              label="定投年限 (n)"
              value={inputs.years}
              onChange={(v) => handleInputChange("years", v)}
              min={1}
              max={50}
              unit="年"
            />

            <InputControl
              label="预估通胀率 (i)"
              value={inputs.inflationRate}
              onChange={(v) => handleInputChange("inflationRate", v)}
              min={0}
              max={20}
              step={0.1}
              unit="%"
              tooltip="用于计算货币购买力缩水程度"
            />
          </div>

          {/* Helper Card */}
          <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-5">
            <h3 className="text-blue-800 font-bold text-sm mb-3 flex items-center gap-2">
              <Info className="w-4 h-4" />
              名词解释
            </h3>
            <ul className="text-xs text-blue-900/80 space-y-3">
              <li className="flex gap-2">
                <span className="font-bold shrink-0">名义资产:</span>
                <span>账面上的金额数字，未扣除通胀影响。</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold shrink-0">真实购买力:</span>
                <span>扣除通胀后，相当于现在的实际价值。</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold shrink-0">持有现金:</span>
                <span>
                  如果本金不进行投资（收益率0%），在通胀下缩水后的价值。
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Results & Charts */}
        <div className="lg:col-span-8 space-y-6">
          {/* Dashboard Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Investment Real Value */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <TrendingUp className="w-16 h-16 text-emerald-600" />
              </div>
              <div className="flex items-center justify-between mb-3 relative z-10">
                <p className="text-sm font-bold text-slate-500">
                  真实购买力 (理财)
                </p>
                <div className="bg-emerald-100 p-1.5 rounded-md">
                  <Wallet className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight relative z-10">
                {formatCurrency(summary.finalAssetReal)}
              </p>
              <div className="mt-2 text-xs font-medium text-emerald-600 bg-emerald-50 inline-block px-2 py-0.5 rounded relative z-10">
                名义金额: {formatCurrency(summary.finalAssetNominal)}
              </div>
            </div>

            {/* Card 2: Cash Real Value */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Banknote className="w-16 h-16 text-rose-600" />
              </div>
              <div className="flex items-center justify-between mb-3 relative z-10">
                <p className="text-sm font-bold text-slate-500">
                  本金购买力 (现金)
                </p>
                <div className="bg-rose-100 p-1.5 rounded-md">
                  <PiggyBank className="w-4 h-4 text-rose-600" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight relative z-10">
                {formatCurrency(summary.finalPrincipalReal)}
              </p>
              <div className="mt-2 text-xs font-medium text-rose-600 bg-rose-50 inline-block px-2 py-0.5 rounded relative z-10">
                仅持有现金的价值
              </div>
            </div>

            {/* Card 3: Net Real Gain */}
            <div
              className={`rounded-xl p-5 shadow-sm border relative overflow-hidden ${
                summary.netRealGain >= 0
                  ? "bg-linear-to-br from-emerald-500 to-teal-600 text-white border-emerald-600"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <p
                  className={`text-sm font-bold ${
                    summary.netRealGain >= 0
                      ? "text-emerald-50"
                      : "text-slate-500"
                  }`}
                >
                  理财实际增值
                </p>
                <TrendingUp
                  className={`w-5 h-5 ${
                    summary.netRealGain >= 0 ? "text-white" : "text-emerald-500"
                  }`}
                />
              </div>
              <p
                className={`text-2xl font-black tracking-tight ${
                  summary.netRealGain >= 0 ? "text-white" : "text-emerald-600"
                }`}
              >
                {summary.netRealGain > 0 ? "+" : ""}
                {formatCurrency(summary.netRealGain)}
              </p>
              <div
                className={`mt-2 text-xs font-medium inline-block px-2 py-0.5 rounded ${
                  summary.netRealGain >= 0
                    ? "bg-white/20 text-white"
                    : "text-slate-500 bg-slate-100"
                }`}
              >
                通胀吞噬了 {inflationEatenPercent}% 的名义收益
              </div>
            </div>
          </div>

          {/* Main Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  资产价值与通胀侵蚀分析
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  比较名义金额、实际购买力与现金持有价值
                </p>
              </div>

              {/* Custom Legend */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500"></div>
                  <span className="text-slate-600">名义资产(账面)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-1 bg-emerald-700 rounded-full"></div>
                  <span className="text-slate-900 font-bold">真实购买力</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-0 border-t-2 border-dashed border-slate-400"></div>
                  <span className="text-slate-500">累计投入本金</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-0 border-t-2 border-dotted border-rose-500"></div>
                  <span className="text-rose-600">本金购买力(现金)</span>
                </div>
              </div>
            </div>

            <div className="h-100 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorNominal"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="year"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    tickMargin={10}
                  />
                  <YAxis
                    tickFormatter={(value) => {
                      if (value >= 100000000)
                        return `${(value / 100000000).toFixed(1)}亿`;
                      if (value >= 10000)
                        return `${(value / 10000).toFixed(0)}万`;
                      return value;
                    }}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    width={40}
                  />
                  <Tooltip content={<CustomTooltip />} />

                  {/* Series 1: Nominal Asset (Area) */}
                  <Area
                    type="monotone"
                    dataKey="assetNominal"
                    name="名义资产"
                    stroke="#10b981"
                    strokeWidth={1}
                    fillOpacity={1}
                    fill="url(#colorNominal)"
                  />

                  {/* Series 3: Nominal Principal (Dashed Line) - Render before Real Asset to stay behind if overlapping */}
                  <Line
                    type="monotone"
                    dataKey="principalNominal"
                    name="累计投入本金"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />

                  {/* Series 4: Real Principal (Dotted Line) - "Cash Drag" */}
                  <Line
                    type="monotone"
                    dataKey="principalReal"
                    name="本金购买力"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    dot={false}
                  />

                  {/* Series 2: Real Purchasing Power (Solid Thick Line) - The Truth */}
                  <Line
                    type="monotone"
                    dataKey="assetReal"
                    name="真实购买力"
                    stroke="#047857"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
