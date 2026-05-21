/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plus, Filter, Download, MoreVertical, AlertTriangle, BadgeAlert, Coins, Sparkles, FolderSync } from "lucide-react";
import { Claim } from "../types";

interface DashboardViewProps {
  claims: Claim[];
  onStartNewClaim: () => void;
  onSelectClaim: (claim: Claim) => void;
  onNavigateToAttentionClaim: (claimId: string) => void;
}

export default function DashboardView({
  claims,
  onStartNewClaim,
  onSelectClaim,
  onNavigateToAttentionClaim,
}: DashboardViewProps) {
  // Current datetime greeting
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  };

  const activeClaimsCount = claims.filter((c) => c.status !== "Draft").length;
  const totalReimbursed = claims
    .filter((c) => c.status === "Verified")
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="space-y-8 animate-fadeIn md:p-1">
      {/* Welcome Banner Actions Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-on-background tracking-tight">
            {getGreeting()}, Sarah
          </h1>
          <p className="text-base font-normal text-on-surface-variant max-w-2xl mt-1">
            Your claim status is being monitored in real-time. We've updated your dashboard with the latest reimbursement data.
          </p>
        </div>
        <button
          onClick={onStartNewClaim}
          className="bg-primary text-on-primary font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Start New Claim
        </button>
      </div>

      {/* Bento Grid Analytics Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Claims Box */}
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl flex flex-col justify-between hover:border-secondary hover:shadow-sm transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-secondary-container p-3 rounded-xl text-on-secondary-container">
              <FolderSync size={24} />
            </div>
            <span className="text-xs font-bold text-secondary bg-secondary-container/30 px-2.5 py-1 rounded-full">
              +2 this month
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase">
              Active Claims
            </p>
            <h3 className="text-3xl font-bold text-on-surface mt-1">
              {activeClaimsCount < 10 ? `0${activeClaimsCount}` : activeClaimsCount}
            </h3>
          </div>
        </div>

        {/* Total Reimbursed Summary Box */}
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl flex flex-col justify-between hover:border-secondary hover:shadow-sm transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-surface-container-high p-3 rounded-xl text-primary">
              <Coins size={24} />
            </div>
            <span className="text-xs font-bold text-on-surface-variant bg-surface-container/60 px-2.5 py-1 rounded-full">
              YTD Summary
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase">
              Total Reimbursed
            </p>
            <h3 className="text-3xl font-bold text-on-surface mt-1">
              ${totalReimbursed.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
        </div>

        {/* Attention Needed Action Alarm Card */}
        <div className="bg-inverse-surface text-inverse-on-surface p-6 rounded-2xl relative overflow-hidden group border border-outline/20">
          <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-error-container p-2.5 rounded-xl text-on-error-container">
                <AlertTriangle size={20} className="text-error" />
              </div>
              <span className="bg-error text-on-error font-bold text-[10px] px-2.5 py-0.5 rounded-full animate-pulse flex items-center gap-1">
                <BadgeAlert size={10} />
                ACTION
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider text-surface-variant uppercase">
                Attention Needed
              </p>
              <h3 className="text-md font-bold text-white mt-1 leading-snug">
                Claim #9928-11 requires verification docs.
              </h3>
            </div>
            <button
              onClick={() => onNavigateToAttentionClaim("CLM-9928-11")}
              className="mt-3 text-sm font-bold text-secondary-fixed hover:text-white transition-colors text-left flex items-center gap-1.5 underline decoration-2 underline-offset-4"
            >
              Review Docs &rarr;
            </button>
          </div>
          <div className="absolute -right-3 -bottom-3 opacity-[0.05] group-hover:scale-110 transition-transform duration-500 text-white">
            <Sparkles size={110} />
          </div>
        </div>
      </section>

      {/* Claims List Activity Dashboard Panel */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
        {/* Panel Header */}
        <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-white/40 backdrop-blur-md">
          <h2 className="text-lg font-bold text-on-surface">
            Recent Claims Activity
          </h2>
          <div className="flex gap-2">
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors" title="Filter list">
              <Filter size={16} className="text-on-surface-variant" />
            </button>
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors" title="Download report">
              <Download size={16} className="text-on-surface-variant" />
            </button>
          </div>
        </div>

        {/* Dynamic Activity Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-[#131b2e] text-[#f8f9ff]">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider">CLAIM ID</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider">INCIDENT DATE</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider">CATEGORY</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider">AMOUNT</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider">STATUS</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant bg-white">
              {claims.map((claim) => (
                <tr
                  key={claim.id}
                  onClick={() => onSelectClaim(claim)}
                  className="hover:border-l-[4px] hover:border-secondary hover:bg-surface-container-low/40 transition-all cursor-pointer group"
                >
                  <td className="px-6 py-4 font-semibold text-on-surface group-hover:text-secondary transition-colors">
                    {claim.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">
                    {claim.incidentDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">
                    {claim.category}
                  </td>
                  <td className="px-6 py-4 font-bold text-on-surface">
                    ${claim.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        claim.status === "Verified"
                          ? "bg-emerald-500/10 text-emerald-800"
                          : claim.status === "Flagged"
                          ? "bg-coral-500/10 text-error bg-red-100/40"
                          : "bg-slate-500/10 text-slate-700 bg-slate-100"
                      }`}
                    >
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-on-surface-variant hover:text-primary p-1 rounded hover:bg-surface-container transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer Actions Link */}
        <div className="p-4 bg-surface-container-low text-center">
          <button className="text-secondary font-bold text-sm tracking-wide hover:underline">
            View All Historical Claims
          </button>
        </div>
      </section>
    </div>
  );
}
