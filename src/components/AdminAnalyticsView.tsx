/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { TrendingUp, AlertTriangle, Timer, Shield, Info, Download, Filter, MapPin, MoreVertical, Sparkles } from "lucide-react";

export default function AdminAnalyticsView() {
  const [selectedRange, setSelectedRange] = useState<"7D" | "30D" | "90D">("30D");

  // Heatmap rows
  const heatmapRows = [
    { provider: "Tier 1 Partners", cells: [10, 20, 10, 5, 10, 30] },
    { provider: "Independent Adj.", cells: [40, 80, 50, 20, 10, 40], hasError: true },
    { provider: "Broker Network", cells: [10, 10, 20, 40, 70, 30] }
  ];

  // Dynamic cell opacity based on value weight
  const getHeatmapColor = (value: number) => {
    if (value <= 10) return "bg-secondary/10";
    if (value <= 20) return "bg-secondary/25";
    if (value <= 40) return "bg-secondary/50";
    if (value <= 70) return "bg-secondary/70";
    return "bg-secondary"; // Peak 80%+
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      
      {/* 1. Header Navigation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-on-background tracking-tight">
            Analytics & Reports
          </h1>
          <p className="text-sm font-normal text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
            Machine intelligence models diagnostic indexes, risk velocity vectors, and churn heatmap telemetry.
          </p>
        </div>
        <button className="bg-primary text-on-primary font-bold text-xs py-2.5 px-5 rounded-xl hover:opacity-90 flex items-center gap-1.5 shadow-md">
          <Download size={14} />
          Export Global PDF
        </button>
      </div>

      {/* 2. Key Metrics Widgets Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Active Claims */}
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-all hover:border-secondary">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Active Claims</span>
            <TrendingUp size={16} className="text-secondary" />
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">1,284</h2>
            <p className="text-xs font-bold text-secondary flex items-center gap-1 mt-1">
              <span>&uarr;</span>
              +12.5% vs last month
            </p>
          </div>
        </div>

        {/* Churn Risk */}
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-all hover:border-secondary">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Churn Risk Velocity</span>
            <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse"></span>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">4.2%</h2>
            <p className="text-xs font-bold text-error flex items-center gap-1 mt-1">
              <span>&uarr;</span>
              +0.8% alert threshold
            </p>
          </div>
        </div>

        {/* Processing time */}
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-all hover:border-secondary">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Avg. Processing Time</span>
            <Timer size={16} className="text-on-surface-variant/70" />
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">1.8d</h2>
            <p className="text-xs font-bold text-secondary flex items-center gap-1 mt-1">
              <span>&darr;</span>
              -14% improvement
            </p>
          </div>
        </div>

        {/* Anomaly flags */}
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-all hover:border-secondary">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Anomaly Flags</span>
            <Shield size={16} className="text-secondary" />
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">42</h2>
            <p className="text-xs font-semibold text-on-surface-variant mt-1">
              8 critical / 34 moderate
            </p>
          </div>
        </div>

      </section>

      {/* 3. Trend Graph & Radar Vectors Double Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Claims Volume Trend */}
        <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-md font-bold text-on-surface">Claims Volume Trend</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Automated forecasting for Q3 processing volume</p>
            </div>
            <div className="flex gap-1.5 shrink-0 bg-surface-container p-1 rounded-xl">
              {(["7D", "30D", "90D"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                    selectedRange === range ? "bg-white text-on-surface shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive custom SVG representation showing Solid forecasting curves */}
          <div className="h-64 relative w-full flex items-end justify-between px-2 pt-4">
            <svg className="absolute inset-0 w-full h-full px-4 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
              <defs>
                <linearGradient id="chartWaveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(0, 106, 97, 0.2)" />
                  <stop offset="95%" stopColor="rgba(0, 106, 97, 0.0)" />
                </linearGradient>
              </defs>
              {/* Solid History vector curve */}
              <path d="M0,150 Q100,120 200,140 T400,80 T600,110 T700,90" fill="none" stroke="#006a61" strokeWidth="3" />
              <path d="M0,150 Q100,120 200,140 T400,80 T600,110 T700,90 V200 H0 Z" fill="url(#chartWaveGrad)" />
              {/* Dashed forecast overlay curve representational */}
              <path d="M700,90 Q800,70 900,100 T1000,60" fill="none" stroke="#006a61" strokeDasharray="8 8" strokeWidth="3" />
            </svg>
            {/* Horizontal Gridlines */}
            <div className="absolute inset-y-0 left-0 right-0 flex flex-col justify-between py-6 pointer-events-none opacity-[0.05]">
              <div className="border-t border-on-surface-variant w-full"></div>
              <div className="border-t border-on-surface-variant w-full"></div>
              <div className="border-t border-on-surface-variant w-full"></div>
            </div>
          </div>
          <div className="flex justify-between px-4 pt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
            <span>May 01</span>
            <span>May 08</span>
            <span>May 15</span>
            <span>May 22</span>
            <span>May 29</span>
            <span>Jun 05 (Forecast)</span>
          </div>
        </div>

        {/* Anomaly vectors Radar Web - 4 cols */}
        <div className="lg:col-span-4 bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div>
            <h3 className="text-md font-bold text-on-surface">Anomaly Vectors</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">Suspicious pattern detection coordinate mapping</p>
          </div>

          <div className="aspect-square relative flex items-center justify-center my-6 max-w-[220px] mx-auto w-full">
            {/* Circular rings */}
            <div className="absolute inset-0 border border-outline-variant/30 rounded-full scale-[0.8]"></div>
            <div className="absolute inset-0 border border-outline-variant/30 rounded-full scale-[0.6]"></div>
            <div className="absolute inset-0 border border-outline-variant/30 rounded-full scale-[0.4]"></div>
            <div className="absolute inset-0 border border-outline-variant/30 rounded-full scale-[0.2]"></div>
            
            {/* Bounded Radar Poly */}
            <svg className="w-full h-full rotate-45" viewBox="0 0 100 100">
              <polygon fill="rgba(0, 106, 97, 0.15)" points="50,15 80,30 82,68 50,85 18,68 20,30" stroke="#006a61" strokeWidth="1" />
              <polygon fill="rgba(186, 26, 26, 0.2)" points="50,25 72,40 68,58 50,75 32,58 35,40" stroke="#ba1a1a" strokeWidth="1" />
            </svg>

            {/* Labels */}
            <span className="absolute top-1 text-[9px] font-extrabold text-on-surface-variant tracking-wider uppercase">DUPLICATE IDS</span>
            <span className="absolute right-1 text-[9px] font-extrabold text-on-surface-variant tracking-wider uppercase">LOC. MISMATCH</span>
            <span className="absolute bottom-1 text-[9px] font-extrabold text-on-surface-variant tracking-wider uppercase">FREQUENCY</span>
            <span className="absolute left-1 text-[9px] font-extrabold text-on-surface-variant tracking-wider uppercase">AMOUNT JUMP</span>
          </div>

          <p className="text-[10px] text-center text-on-surface-variant font-medium leading-normal bg-surface rounded-xl p-2">
            Solid line shows standard bounds. Outer nodes indicate abnormal occurrences in DUPLICATE IDs.
          </p>
        </div>

      </section>

      {/* 4. Provider Conflict Heatmap Grid Table */}
      <section className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-md font-bold text-on-surface">Churn Heatmap (Provider Friction)</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">Identifying drop-off points in the claims lifecycle across providers</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant tracking-wider uppercase shrink-0">
            <span>Low Risk</span>
            <div className="flex gap-0.5 h-3">
              <span className="w-5 bg-secondary/10 rounded-sm"></span>
              <span className="w-5 bg-secondary/30 rounded-sm"></span>
              <span className="w-5 bg-secondary/55 rounded-sm"></span>
              <span className="w-5 bg-secondary/80 rounded-sm"></span>
              <span className="w-5 bg-secondary rounded-sm"></span>
            </div>
            <span>Critical</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-[10px] font-bold tracking-wider text-on-surface-variant/70 uppercase">
                <th className="py-2 text-left w-36">Provider Type</th>
                <th className="py-2 text-center px-1">Intake</th>
                <th className="py-2 text-center px-1">Validation</th>
                <th className="py-2 text-center px-1">Adjustment</th>
                <th className="py-2 text-center px-1">Approval</th>
                <th className="py-2 text-center px-1">Payment</th>
                <th className="py-2 text-center px-1">Support</th>
              </tr>
            </thead>
            <tbody>
              {heatmapRows.map((row, index) => (
                <tr key={index} className="border-t border-outline-variant/30">
                  <td className="py-4 text-xs font-bold text-on-surface">
                    {row.provider}
                  </td>
                  {row.cells.map((cell, idx) => (
                    <td key={idx} className="p-1 text-center">
                      <div
                        className={`h-11 rounded-lg transition-transform hover:scale-[1.04] duration-200 ${getHeatmapColor(cell)} ${
                          row.hasError && idx === 1 ? "border-2 border-error" : ""
                        }`}
                        title={`${row.provider} > Stage ${idx + 1}: ${cell}% friction Index`}
                      ></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Anomaly Logs */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-outline-variant flex justify-between items-center">
          <h3 className="text-sm font-bold text-on-surface">Recent Anomaly Logs</h3>
          <span className="text-xs font-bold text-secondary flex items-center gap-1.5 cursor-pointer hover:underline">
            Export Report List &darr;
          </span>
        </div>
        
        <div className="divide-y divide-outline-variant/40 bg-white">
          <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-slate-50 transition-colors">
            <div className="flex gap-4 items-center">
              <span className="font-mono text-xs font-bold text-on-surface-variant">#CLM-98231</span>
              <div>
                <p className="text-sm font-bold text-on-surface">Global Health Ltd.</p>
                <p className="text-xs text-on-surface-variant">Location Mismatch Flag &bull; Risk Score 85%</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-red-100 text-error">
              FLAGGED
            </span>
          </div>

          <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-l-4 border-secondary hover:bg-slate-50 transition-colors">
            <div className="flex gap-4 items-center animate-pulse">
              <span className="font-mono text-xs font-bold text-on-surface-variant">#CLM-98245</span>
              <div>
                <p className="text-sm font-bold text-on-surface">Safe-Way Motors</p>
                <p className="text-xs text-on-surface-variant">Duplicate Vendor ID Flag &bull; Risk Score 42%</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
              PENDING RUN
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
