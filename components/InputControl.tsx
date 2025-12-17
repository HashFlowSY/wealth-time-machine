"use client";

import { Info } from "lucide-react";
import { InputControlProps } from "../types/types";
export default function InputControl({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  tooltip,
}: InputControlProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
          {label}
          {tooltip && (
            <div className="group relative">
              <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
              <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {tooltip}
              </div>
            </div>
          )}
        </label>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          {min}
          {unit ? unit : ""} - {max}
          {unit ? unit : ""}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="grow h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="relative">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => {
              const val = Number(e.target.value);
              // Allow user to type freely, clamp only on blur if strictness needed,
              // but for live calc we pass the raw number
              onChange(val);
            }}
            className="w-28 pl-3 pr-8 py-2 text-right border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold text-slate-900 shadow-sm transition-all"
          />
          <span className="absolute right-3 top-2 text-slate-400 text-sm pointer-events-none">
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
}
