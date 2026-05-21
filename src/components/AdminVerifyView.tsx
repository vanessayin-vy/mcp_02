/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ZoomIn, ZoomOut, RotateCcw, CheckCircle, AlertTriangle, Info, ShieldAlert, ArrowLeft, Send } from "lucide-react";

interface AdminVerifyViewProps {
  claimId?: string;
  onBack: () => void;
  onVerify: (data: { vendor: string; amount: number; category: string; flagResolved: boolean }) => void;
  onEscalate: () => void;
}

export default function AdminVerifyView({ claimId = "#CLM-98234-AX", onBack, onVerify, onEscalate }: AdminVerifyViewProps) {
  // Input fields initial state matching the prompt screenshot and OCR
  const [vendor, setVendor] = useState("City Medical Plaza");
  const [date, setDate] = useState("10/24/2023");
  const [category, setCategory] = useState("Medical Services");
  const [amount, setAmount] = useState("$1,240.00");
  
  // OCR Box selection state highlight interaction
  const [activeOCRBox, setActiveOCRBox] = useState<string | null>(null);

  // Resolving indicators
  const [flagResolved, setFlagResolved] = useState(false);

  // Triggering visual feedback on box click
  const handleOCRBoxClick = (name: string, value: string) => {
    setActiveOCRBox(name);
    // Display dynamic effect
    if (name === "vendor") {
      setVendor(value);
    } else if (name === "date") {
      setDate(value);
    } else if (name === "amount") {
      setAmount(value);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Visual Back Trigger */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant hover:text-secondary group transition-all"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to Queue Workspace</span>
      </button>

      {/* Header section matches design screenshot */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-secondary mb-1.5">
            <span className="w-2.5 h-2.5 bg-secondary rounded-full animate-ping mr-1"></span>
            <span className="text-xs font-extrabold tracking-wider uppercase">
              ACTIVE NEURAL DIGITAL ASSET SCANNING
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-on-background tracking-tight">
            Audit Workspace: {claimId}
          </h1>
          <p className="text-sm font-normal text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
            Verify OCR extractions, cross-reference timeline mismatch indicators, and confirm compliance status.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-secondary/15 text-secondary border border-secondary/20 font-extrabold text-xs px-4 py-2 rounded-xl">
            94% CONFIDENCE
          </span>
          <span className="bg-red-100 text-red-800 font-extrabold text-xs px-3.5 py-2 rounded-xl">
            FLAGGED RISKS
          </span>
        </div>
      </div>

      {/* Main Grid split screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Digital Asset Scan Receipt) - 7 cols */}
        <section className="lg:col-span-7 bg-white border border-outline-variant rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-secondary">
              <span className="font-bold text-sm text-on-surface">Digital Asset Analysis</span>
            </div>
            
            {/* Control toolbar */}
            <div className="flex gap-1.5">
              <button className="p-2 border border-outline-variant rounded-xl hover:bg-surface-container transition-colors" title="Zoom In">
                <ZoomIn size={16} />
              </button>
              <button className="p-2 border border-outline-variant rounded-xl hover:bg-surface-container transition-colors" title="Zoom Out">
                <ZoomOut size={16} />
              </button>
              <button className="p-2 border border-outline-variant rounded-xl hover:bg-surface-container transition-colors" title="Rotate Asset">
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          <div className="flex-grow bg-slate-100 border border-outline-variant/60 rounded-xl overflow-auto relative p-6 min-h-[480px] flex items-center justify-center">
            {/* Visual Receipt container with OCR highlight zones absolute */}
            <div className="relative inline-block select-none shadow-xl border border-slate-300 rounded overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0Q6WMWGLKpHbpKQ1PQBm2-Q093duL8k2CVCcyuKXJHEsuwj0xCW8MiBeWuiqCXkpivf-DqG0kxN35uxUYfTNHXCw7zAyPgQcH0TFs5WGTvdwSqPMHqSF-Kfkjmid2J9VsKrsF7P8g-p_CmRBQsOxwRAchH4VV-kCGa5nPi7DtESi62vmeawOCa-IkvK45DP7GKv-4zFWrfGH7BebP49KrFXT-koi7abGM2gfmlftnS_Z5aIM0XUBe03e8JaGNa_H99HgDWNvPnSGa"
                alt="Receipt Document Analysis"
                className="max-w-full h-[450px] object-cover rounded-sm"
                referrerPolicy="no-referrer"
              />

              {/* Box 1 (Vendor name overlay) */}
              <div
                onClick={() => handleOCRBoxClick("vendor", "City Medical Plaza")}
                className={`absolute cursor-pointer border-2 transition-all ${
                  activeOCRBox === "vendor"
                    ? "border-secondary bg-secondary/30 scale-[1.02] shadow-lg"
                    : "border-secondary/40 bg-secondary/10 hover:bg-secondary/20"
                }`}
                style={{ top: "12%", left: "35%", width: "30%", height: "6%" }}
                title="OCR Match: City Medical Plaza (Click to load)"
              ></div>

              {/* Box 2 (Date overlay) */}
              <div
                onClick={() => handleOCRBoxClick("date", "10/24/2023")}
                className={`absolute cursor-pointer border-2 transition-all ${
                  activeOCRBox === "date"
                    ? "border-secondary bg-secondary/30 scale-[1.02] shadow-lg"
                    : "border-secondary/40 bg-secondary/10 hover:bg-secondary/20"
                }`}
                style={{ top: "25%", left: "15%", width: "20%", height: "4%" }}
                title="OCR Match: Oct 24, 2023 (Click to load)"
              ></div>

              {/* Box 3 (Duplicate entry overlay - Red) */}
              <div
                onClick={() => handleOCRBoxClick("amount", "$1,240.00")}
                className={`absolute cursor-pointer border-2 border-error/70 bg-error/10 hover:bg-error/20 transition-all`}
                style={{ top: "68%", left: "65%", width: "25%", height: "8%" }}
                title="Risk Alert: Duplicate Entry Detected (Click to audit)"
              ></div>

              {/* Box 4 (Itemized List Extraction overlay) */}
              <div
                onClick={() => setActiveOCRBox("itemized")}
                className={`absolute cursor-pointer border-2 transition-all ${
                  activeOCRBox === "itemized"
                    ? "border-secondary bg-secondary/30"
                    : "border-secondary/40 bg-secondary/5 hover:bg-secondary/10"
                }`}
                style={{ top: "80%", left: "10%", width: "80%", height: "12%" }}
                title="OCR Itemized: Routine checkups and Screening list overview"
              ></div>
            </div>
          </div>
        </section>

        {/* Right Column (Edit Verification Forms & Alerts) - 5 cols */}
        <section className="lg:col-span-5 space-y-6">
          
          {/* Form edit checklist card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
            <h3 className="text-md font-bold text-on-surface mb-4">Extracted Metadata</h3>
            
            <div className="space-y-4">
              {/* Vendor name input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Vendor Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    className="w-full bg-white border border-outline px-3.5 py-3 rounded-lg text-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
                  />
                  <CheckCircle size={16} className="absolute right-3.5 top-3.5 text-secondary" />
                </div>
              </div>

              {/* Date and Category Grid rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Date
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white border border-outline px-3.5 py-3 rounded-lg text-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-outline px-3.5 py-3 rounded-lg text-xs font-semibold text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-all focus:outline-none appearance-none"
                  >
                    <option>Medical Services</option>
                    <option>Pharmacy</option>
                    <option>Travel/Uber</option>
                    <option>Office Supplies</option>
                  </select>
                </div>
              </div>

              {/* Amount input block */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Amount (USD)
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white border border-outline px-3.5 py-3 rounded-lg text-sm font-mono font-bold text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* Anomaly Risk flag alerts */}
          <div className="space-y-4">
            
            {/* Box AA: Duplicate Entry warning alerts */}
            <div className="p-4 bg-red-50 border border-error/20 rounded-2xl flex gap-3">
              <AlertTriangle className="text-error shrink-0 mt-0.5 animate-pulse" size={20} />
              <div className="space-y-1">
                <p className="font-bold text-xs text-error uppercase tracking-wider">Duplicate Entry Detected</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Similar claim submitted on 10/12/2023 (Ref: CLM-9021). Please verify the service period.
                </p>
                {!flagResolved ? (
                  <button
                    onClick={() => setFlagResolved(true)}
                    className="text-[11px] font-bold text-secondary hover:underline underline-offset-4 mt-2 inline-block"
                  >
                    Mark Risk Checked / Dismiss Duplicate Alert
                  </button>
                ) : (
                  <span className="text-[11px] font-extrabold text-secondary flex items-center gap-1 mt-1">
                    <CheckCircle size={12} />
                    Verified as separate service transaction
                  </span>
                )}
              </div>
            </div>

            {/* Box BB: Trip Timings info bubble */}
            <div className="p-4 bg-slate-50 border border-slate-300 rounded-2xl flex gap-3">
              <Info className="text-slate-600 shrink-0 mt-0.5" size={20} />
              <div className="space-y-0.5">
                <p className="font-bold text-xs text-slate-700 uppercase tracking-wider">Inconsistent Trip Timings</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Check-in recorded at 09:15 AM, but travel receipt shows drop-off at 09:45 AM.
                </p>
              </div>
            </div>

          </div>

          {/* AI Policy recommendations insight card */}
          <div className="bg-secondary-container/10 border border-secondary p-4 rounded-2xl space-y-1.5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-extrabold text-secondary uppercase tracking-tight">AI Policy Match</span>
            </div>
            <p className="text-xs text-on-secondary-container leading-relaxed">
              Item covers standard policy section 4.2 (Diagnostic Imaging). Full reimbursement recommended upon verification of duplication flag.
            </p>
          </div>

          {/* Verification buttons */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              onClick={onEscalate}
              className="flex items-center justify-center gap-1.5 border border-error text-error py-3 rounded-xl font-bold text-xs hover:bg-red-50 transition-all active:scale-95"
            >
              <ShieldAlert size={14} />
              Escalate Flag
            </button>
            <button
              onClick={() => {
                const numericAmt = parseFloat(amount.replace(/[$,]/g, "")) || 1240.0;
                onVerify({ vendor, amount: numericAmt, category, flagResolved });
              }}
              className="flex items-center justify-center gap-1.5 bg-secondary text-on-secondary py-3 rounded-xl font-bold text-xs hover:brightness-110 shadow-md transition-all active:scale-95"
            >
              <CheckCircle size={14} />
              Verify & Approve
            </button>
          </div>

        </section>
      </div>

    </div>
  );
}
