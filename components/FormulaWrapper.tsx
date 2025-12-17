"use client";

import { useState } from "react";
import { Calculator, BookOpen, X, Sigma } from "lucide-react";
export default function FormulaWrapper() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* Formula Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-1.5 rounded-lg">
                  <Sigma className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg">
                  计算原理与公式
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-8">
              {/* Formula 1 */}
              <section>
                <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
                    1
                  </span>
                  名义资产 (Nominal Asset)
                </h4>
                <p className="text-sm text-slate-500 mb-3">
                  基于复利增长和期末年金公式计算。假设收益按年复利，定投金额在每年年末投入。
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 font-mono text-sm text-slate-700 overflow-x-auto">
                  FV_nominal = P × (1 + r)^n + PMT × [ ((1 + r)^n - 1) / r ]
                </div>
                <div className="mt-2 text-xs text-slate-400 grid grid-cols-2 gap-2">
                  <span>P = 初始本金</span>
                  <span>r = 年化收益率</span>
                  <span>PMT = 每年定投额</span>
                  <span>n = 年数</span>
                </div>
              </section>

              {/* Formula 2 */}
              <section>
                <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                    2
                  </span>
                  真实购买力 (Real Purchasing Power)
                </h4>
                <p className="text-sm text-slate-500 mb-3">
                  将未来的名义金额，按照通胀率折现回今天的价值。这代表了这笔钱在未来的实际消费能力。
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 font-mono text-sm text-slate-700 overflow-x-auto">
                  FV_real = FV_nominal / (1 + i)^n
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  <span>i = 通胀率</span>
                </div>
              </section>

              {/* Formula 3 */}
              <section>
                <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs">
                    3
                  </span>
                  本金购买力 (Real Principal Value)
                </h4>
                <p className="text-sm text-slate-500 mb-3">
                  如果您不进行投资，而是持有现金，这部分本金在未来折现后的价值。也就是现金的“缩水”程度。
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 font-mono text-sm text-slate-700 overflow-x-auto">
                  Principal_real = (P + PMT × n) / (1 + i)^n
                </div>
              </section>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 text-center text-xs text-slate-400">
              *此计算器用于长期投资规划参考，实际收益受市场波动影响。
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg shadow-sm">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                定投收益率计算器
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Real-Wealth SIP Calculator
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">计算原理</span>
            </button>
            <div className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-500 px-2">
              <span>通胀风险可视化版</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
