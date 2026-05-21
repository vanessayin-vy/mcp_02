/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Search, Filter, XCircle, ChevronLeft, ChevronRight, HelpCircle, AlertTriangle, CheckCircle, Clock, Ban, MoreVertical, Sparkles } from "lucide-react";

interface AdminQueueViewProps {
  onSelectClaim: (claimId: string) => void;
}

export interface QueueClaim {
  id: string;
  submittedDate: string;
  claimantName: string;
  claimantInitials: string;
  status: "Flagged" | "Verified" | "Pending" | "Missing Info";
  priorityScore: number;
}

export default function AdminQueueView({ onSelectClaim }: AdminQueueViewProps) {
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | "Flagged" | "Missing Info">("All");

  const originalClaims: QueueClaim[] = [
    {
      id: "#CLM-98234-AX",
      submittedDate: "Oct 24, 2023 · 14:22",
      claimantName: "Jonathan Davis",
      claimantInitials: "JD",
      status: "Flagged",
      priorityScore: 92,
    },
    {
      id: "#CLM-98235-BY",
      submittedDate: "Oct 24, 2023 · 15:45",
      claimantName: "Maria Williams",
      claimantInitials: "MW",
      status: "Verified",
      priorityScore: 45,
    },
    {
      id: "#CLM-98236-CZ",
      submittedDate: "Oct 24, 2023 · 16:10",
      claimantName: "Arthur Knight",
      claimantInitials: "AK",
      status: "Pending",
      priorityScore: 68,
    },
    {
      id: "#CLM-98237-DR",
      submittedDate: "Oct 25, 2023 · 09:04",
      claimantName: "Sarah Miller",
      claimantInitials: "SM",
      status: "Missing Info",
      priorityScore: 81,
    },
    {
      id: "#CLM-98238-ET",
      submittedDate: "Oct 25, 2023 · 10:15",
      claimantName: "Brian Lee",
      claimantInitials: "BL",
      status: "Verified",
      priorityScore: 22,
    }
  ];

  // Apply search term and active pill filters
  const filteredClaims = originalClaims.filter((claim) => {
    const matchesSearch =
      claim.id.toLowerCase().includes(searchText.toLowerCase()) ||
      claim.claimantName.toLowerCase().includes(searchText.toLowerCase());

    if (activeFilter === "All") return matchesSearch;
    if (activeFilter === "Flagged") return matchesSearch && claim.status === "Flagged";
    if (activeFilter === "Missing Info") return matchesSearch && claim.status === "Missing Info";
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header with Stats Counter */}
      <div>
        <h1 className="text-3xl font-extrabold text-on-background tracking-tight">
          Intelligent Queue
        </h1>
        <p className="text-sm font-normal text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
          Operational priorities calculated in real-time based on risk metrics, extraction confidence levels, and claimant priority weights.
        </p>
      </div>

      {/* 2. Intelligent Queue Table Section Container */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden flex flex-col shadow-sm">
        
        {/* Table Header / Filters Option Controls */}
        <div className="p-6 border-b border-outline-variant flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 text-on-surface-variant/70" size={16} />
              <input
                type="text"
                placeholder="Search claims, names, or IDs..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl w-full md:w-80 text-sm focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-outline-variant rounded-xl text-xs font-bold hover:bg-surface-container transition-all">
              <Filter size={14} className="text-on-surface-variant" />
              <span>Filters</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveFilter(activeFilter === "Flagged" ? "All" : "Flagged")}
              className={`px-4 py-2 text-xs font-bold rounded-full flex items-center gap-1.5 transition-all ${
                activeFilter === "Flagged"
                  ? "bg-secondary text-white shadow-sm"
                  : "bg-surface-container-low text-on-surface-variant border border-outline-variant/30"
              }`}
            >
              Flagged Priority
              {activeFilter === "Flagged" && <XCircle size={12} className="ml-0.5" />}
            </button>

            <button
              onClick={() => setActiveFilter(activeFilter === "Missing Info" ? "All" : "Missing Info")}
              className={`px-4 py-2 text-xs font-bold rounded-full flex items-center gap-1.5 transition-all ${
                activeFilter === "Missing Info"
                  ? "bg-secondary text-white shadow-sm"
                  : "bg-surface-container-low text-on-surface-variant border border-outline-variant/30"
              }`}
            >
              Missing Information
              {activeFilter === "Missing Info" && <XCircle size={12} className="ml-0.5" />}
            </button>

            <div className="hidden sm:block w-[1px] h-6 bg-outline-variant/60 mx-2"></div>
            <span className="text-xs font-medium text-on-surface-variant italic">
              Showing {filteredClaims.length} of {originalClaims.length} claims
            </span>
          </div>
        </div>

        {/* Main interactive claims list table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-[#131b2e] text-[#f8f9ff]">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider">CLAIM ID</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider">SUBMITTED DATE</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider">CLAIMANT NAME</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider">EXTRACTION STATUS</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-right">PRIORITY SCORE</th>
                <th className="px-6 py-4 w-12 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant bg-white">
              {filteredClaims.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-sm text-on-surface-variant font-medium">
                    No active claims meet the currently applied selection.
                  </td>
                </tr>
              ) : (
                filteredClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    onClick={() => onSelectClaim(claim.id)}
                    className="hover:border-l-[4px] hover:border-secondary hover:bg-surface-container-low/40 transition-all cursor-pointer group"
                  >
                    <td className="px-6 py-4 text-xs font-mono font-bold text-on-surface-variant group-hover:text-secondary">
                      {claim.id}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-on-surface/80">
                      {claim.submittedDate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                          {claim.claimantInitials}
                        </div>
                        <span className="text-sm font-bold text-on-surface">
                          {claim.claimantName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase gap-1 ${
                          claim.status === "Flagged"
                            ? "bg-red-100 text-red-900"
                            : claim.status === "Verified"
                            ? "bg-emerald-100 text-emerald-900"
                            : claim.status === "Missing Info"
                            ? "bg-amber-100 text-amber-900"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {claim.status === "Flagged" ? (
                          <AlertTriangle size={11} />
                        ) : claim.status === "Verified" ? (
                          <CheckCircle size={11} />
                        ) : claim.status === "Missing Info" ? (
                          <HelpCircle size={11} />
                        ) : (
                          <Clock size={11} />
                        )}
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3.5">
                        <div className="w-24 bg-surface-container h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              claim.priorityScore >= 80
                                ? "bg-error"
                                : claim.priorityScore >= 50
                                ? "bg-on-surface-variant"
                                : "bg-secondary"
                            }`}
                            style={{ width: `${claim.priorityScore}%` }}
                          ></div>
                        </div>
                        <span
                          className={`text-xs font-extrabold font-mono ${
                            claim.priorityScore >= 80 ? "text-error" : "text-on-surface"
                          }`}
                        >
                          {claim.priorityScore}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary p-1 rounded-lg hover:bg-surface-container transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination footer */}
        <div className="p-4 border-t border-outline-variant bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-on-surface-variant font-medium">Rows per page:</span>
            <select className="bg-transparent border-none text-xs font-bold text-on-surface cursor-pointer focus:ring-0">
              <option>10</option>
              <option selected>25</option>
              <option>50</option>
            </select>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs text-on-surface-variant font-medium">1-5 of 5 claims audited</span>
            <div className="flex items-center gap-1.5">
              <button disabled className="p-1.5 border border-outline-variant/30 rounded bg-white/40 opacity-50 cursor-not-allowed">
                <ChevronLeft size={16} />
              </button>
              <button disabled className="p-1.5 border border-outline-variant/30 rounded bg-white/40 opacity-50 cursor-not-allowed">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Tips Smart Card */}
      <div className="bg-secondary-container/10 border border-secondary-container p-4 rounded-2xl flex items-center gap-3">
        <Sparkles size={20} className="text-secondary shrink-0" />
        <p className="text-xs text-on-secondary-container leading-relaxed">
          <strong>Tip</strong>: High Priority score matches claim submissions where digital OCR confidence dropped below 80% or where potential duplicate invoices were found. Filter to **Flagged Priority** to isolate urgent tasks.
        </p>
      </div>

    </div>
  );
}
