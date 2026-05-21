/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { TrendingUp, Activity, Package2, FileCheck, AlertTriangle, ArrowUpRight, ArrowDown, ChevronRight, Download, Filter, Search, MoreVertical, Coins } from "lucide-react";

interface AdminDashboardViewProps {
  onNavigateToQueue: () => void;
  onAuditClaim: (claimId: string) => void;
}

export default function AdminDashboardView({ onNavigateToQueue, onAuditClaim }: AdminDashboardViewProps) {
  const [selectedRange, setSelectedRange] = useState<"7D" | "30D" | "90D">("30D");

  // Mock Anomaly Logs
  const flaggedClaims = [
    {
      id: "CLM-98210",
      policyholder: "Everett Finance Corp",
      reason: "Identity Mismatch",
      amount: 142500.00,
      risk: "Critical",
      score: 88,
    },
    {
      id: "CLM-98214",
      policyholder: "Sarah J. Miller",
      reason: "Duplication Detection",
      amount: 2140.00,
      risk: "High",
      score: 65,
    },
    {
      id: "CLM-98221",
      policyholder: "Beacon Logistics Ltd.",
      reason: "Manual Verify Required",
      amount: 56900.00,
      risk: "Medium",
      score: 42,
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Hero Welcome */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-on-background tracking-tight">
            Claims Intelligence Admin
          </h1>
          <p className="text-base font-normal text-on-surface-variant max-w-2xl mt-1">
            Enterprise overview of straight-through processing rates, active automated models, and flagged risk vectors.
          </p>
        </div>
        <button
          onClick={onNavigateToQueue}
          className="bg-primary text-on-primary font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          View Live Queue
          <ChevronRight size={16} />
        </button>
      </div>

      {/* 2. Top Statistics Bento Grid Rows */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Metric 1: Operational Efficiency - 8 Columns */}
        <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col justify-between hover:shadow-sm transition-all">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase">
                Operational Efficiency
              </p>
              <h3 className="text-2xl font-bold text-on-surface mt-1">
                Avg. Processing Speed
              </h3>
            </div>
            <div className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <TrendingUp size={14} />
              12% Improvement
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
            <div className="col-span-1">
              <span className="text-5xl font-extrabold text-primary tracking-tight">2.4</span>
              <span className="text-sm font-semibold text-on-surface-variant ml-2 leading-none">hours / claim</span>
            </div>
            
            {/* Visual interactive graph Wave */}
            <div className="col-span-2 h-20 w-full relative mb-1 pr-4">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
                <defs>
                  <linearGradient id="primaryWaveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(0, 106, 97, 0.15)" />
                    <stop offset="100%" stopColor="rgba(0, 106, 97, 0.0)" />
                  </linearGradient>
                </defs>
                {/* Under Fill */}
                <path
                  d="M0,80 Q50,65 100,45 T200,60 T300,25 T400,15 L400,100 L0,100 Z"
                  fill="url(#primaryWaveGrad)"
                />
                {/* Secondary SLA Reference Line */}
                <path
                  d="M0,85 Q50,75 100,55 T200,68 T300,40 T400,30"
                  fill="none"
                  stroke="#c6c6cd"
                  strokeDasharray="4 4"
                  strokeWidth="1.5"
                />
                {/* Primary Trend Line */}
                <path
                  d="M0,80 Q50,65 100,45 T200,60 T300,25 T400,15"
                  fill="none"
                  stroke="#006a61"
                  strokeWidth="2.5"
                />
                {/* Active node coordinate indicator */}
                <circle cx="400" cy="15" r="5" className="fill-secondary stroke-white stroke-2 animate-pulse" />
              </svg>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-outline-variant/60 flex items-center justify-start gap-8">
            <div>
              <span className="text-xs text-on-surface-variant block font-medium">Target Speed</span>
              <strong className="text-base text-on-surface font-extrabold">3.0 hrs</strong>
            </div>
            <div className="border-l border-outline-variant/60 h-8"></div>
            <div>
              <span className="text-xs text-on-surface-variant block font-medium">Record Low</span>
              <strong className="text-base text-on-surface font-extrabold">1.8 hrs</strong>
            </div>
            <div className="border-l border-outline-variant/60 h-8"></div>
            <div>
              <span className="text-xs text-on-surface-variant block font-medium">SLA Compliance</span>
              <strong className="text-base text-secondary font-extrabold">99.4%</strong>
            </div>
          </div>
        </div>

        {/* Metric 2: Live System Health Tracker - 4 Columns */}
        <div className="md:col-span-4 bg-primary-container text-[#f8f9ff] rounded-2xl p-6 flex flex-col justify-between hover:shadow-sm transition-all border border-outline-variant/10">
          <div>
            <div className="flex items-center justify-between mb-6">
              <Activity size={32} className="text-secondary-fixed" />
              <div className="flex items-center gap-1.5 bg-secondary-container/10 px-2.5 py-1 rounded-full text-xs font-medium border border-secondary-container/20">
                <span className="w-2.5 h-2.5 bg-secondary-fixed rounded-full animate-pulse mr-0.5"></span>
                System Active
              </div>
            </div>
            <h3 className="text-lg font-bold text-white tracking-wide">
              Network Status
            </h3>
            <p className="text-xs text-on-primary-container leading-relaxed mt-1">
              AI engines operational. All optical scanning layers response indexes are within target parameters.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-on-primary-container">API Response Index</span>
                <span className="text-secondary-fixed">142ms</span>
              </div>
              <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary-fixed h-full w-[85%] rounded-full"></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-on-primary-container">OCR Surcharges Queue</span>
                <span className="text-secondary-fixed">Normal</span>
              </div>
              <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary-fixed h-full w-[40%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 3. Three Columns of Distribution Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Box A: Total Volume Sorted */}
        <div className="bg-surface-container-low border border-outline-variant/60 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-surface-container-high rounded-xl text-primary">
                <Package2 size={18} />
              </div>
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Total Volume Sorted
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight">842,109</span>
              <span className="text-xs font-bold text-emerald-700">+4.2%</span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1.5">Fiscal year to date volume aggregates</p>
          </div>

          <div className="h-12 flex items-end gap-1 pt-4">
            <span className="bg-primary flex-grow h-[40%] rounded-sm"></span>
            <span className="bg-primary flex-grow h-[60%] rounded-sm"></span>
            <span className="bg-primary flex-grow h-[55%] rounded-sm"></span>
            <span className="bg-primary flex-grow h-[80%] rounded-sm"></span>
            <span className="bg-primary flex-grow h-[70%] rounded-sm"></span>
            <span className="bg-primary flex-grow h-[90%] rounded-sm"></span>
            <span className="bg-secondary flex-grow h-[100%] rounded-sm animate-pulse"></span>
          </div>
        </div>

        {/* Box B: Extraction Accuracy */}
        <div className="bg-white border border-outline-variant rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-secondary-container rounded-xl text-on-secondary-container">
                <FileCheck size={18} />
              </div>
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Extraction Accuracy
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-on-secondary-container tracking-tight">98.5%</span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1.5">Machine accuracy rate above 95% threshold</p>
          </div>

          <div className="flex items-center gap-3 mt-4 pt-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-300">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd03zqrdukpQiJ2twGC_reJI0kZ3k1U5SelOOFMJmlqdAaixWxN_kNrHUlXqQYQX_KKYRX4ZwKwy_I5-K_ZCiGxbNBALRpP0OAbaZsoB5cy4U-viMty4cRN8XbCO7Z_wltR9I-rquxLjFZif4MP4Bes6Oxcaoa6qzhzc4-Ul3PdtLYKz5TN5gK4ssCRtDFjbfwfAzufWyJDZW0PneHUOo-P6VqEG7OsUtlsh0QuU-U8FAh-Jb2CHSBX683DHckrSYUehRKXkM1qHoc" alt="user" className="w-full h-full object-cover" />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px]">
                JD
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center font-bold text-[10px] text-on-surface-variant">
                +14
              </div>
            </div>
            <span className="text-[11px] font-semibold text-on-surface-variant">Audited by 14 specialists today</span>
          </div>
        </div>

        {/* Box C: Automation Mix */}
        <div className="bg-surface-container-high/40 border border-outline-variant rounded-2xl p-6 flex flex-col justify-between">
          <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-4">
            Automation Mix
          </h4>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span>Straight-Through</span>
                <span>62%</span>
              </div>
              <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[62%] rounded-full"></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span>Assisted Processing</span>
                <span>31%</span>
              </div>
              <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[31%] rounded-full"></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-semibold text-error">
                <span>Manual Review Required</span>
                <span>7%</span>
              </div>
              <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden">
                <div className="bg-error h-full w-[7%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 4. Flagged Claims Table widget matching prompt */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-white/40 backdrop-blur-md">
          <div>
            <h2 className="text-lg font-bold text-on-surface">
              Flagged Claims for Review
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Refined analysis of anomalies requiring immediate executive oversight
            </p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors" title="Filter list">
              <Filter size={16} className="text-on-surface-variant" />
            </button>
            <button
              onClick={onNavigateToQueue}
              className="bg-primary text-on-primary font-bold text-xs py-2 px-4 rounded-xl hover:opacity-90"
            >
              View Full Queue
            </button>
          </div>
        </div>

        {/* Dynamic Activity Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-[#131b2e] text-[#f8f9ff]">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider">CLAIM ID</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider">POLICYHOLDER</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider">FLAG REASON</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider">AMOUNT</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider">RISK LEVEL</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant bg-white">
              {flaggedClaims.map((claim) => (
                <tr
                  key={claim.id}
                  onClick={() => onAuditClaim(claim.id)}
                  className="hover:border-l-[4px] hover:border-secondary hover:bg-surface-container-low/40 transition-all cursor-pointer group"
                >
                  <td className="px-6 py-4 font-semibold text-on-surface group-hover:text-secondary transition-colors font-mono text-xs">
                    {claim.id}
                  </td>
                  <td className="px-6 py-4 font-bold text-sm text-on-surface">
                    {claim.policyholder}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-red-100 text-red-800">
                      {claim.reason}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-on-surface">
                    ${claim.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-outline-variant/30 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            claim.risk === "Critical" ? "bg-error w-[90%]" : claim.risk === "High" ? "bg-error w-[65%]" : "bg-on-surface-variant w-[35%]"
                          }`}
                        ></div>
                      </div>
                      <span className={`text-xs font-bold ${claim.risk === "Critical" || claim.risk === "High" ? "text-error" : "text-on-surface-variant"}`}>
                        {claim.risk}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-secondary font-bold text-xs hover:underline">
                      Audit Claim &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
