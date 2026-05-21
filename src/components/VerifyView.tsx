/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Sparkles, ZoomIn, Download, CheckCircle, AlertTriangle, Lightbulb, Send, Plus, ArrowLeft, Info, HelpCircle } from "lucide-react";
import { Claim, ExtractedData } from "../types";

interface VerifyViewProps {
  initialData?: ExtractedData;
  onSaveDraft: (data: ExtractedData) => void;
  onSubmitClaim: (claim: Claim) => void;
  onCancel: () => void;
}

export default function VerifyView({
  initialData,
  onSaveDraft,
  onSubmitClaim,
  onCancel,
}: VerifyViewProps) {
  // Setup primary local state for active verification form
  const [vendor, setVendor] = useState(initialData?.merchant || "Global Logistics Inc.");
  const [claimDate, setClaimDate] = useState(initialData?.date || "10/14/2023");
  const [amount, setAmount] = useState(initialData?.amount?.toString() || "1245.50");
  const [category, setCategory] = useState(initialData?.category || "Shipping & Logistics");
  const [invoiceNo] = useState(initialData?.invoiceNo || "#INV-99201-B");
  const [lineItems, setLineItems] = useState(initialData?.lineItems || [
    { description: "Freight Services (Express)", amount: 1120.00 },
    { description: "Surcharge", amount: 125.50 }
  ]);

  // Anomalies triggers
  const [hasTaxAnomaly, setHasTaxAnomaly] = useState(true);
  const [hasDuplicateAnomaly, setHasDuplicateAnomaly] = useState(true);
  const [taxValue, setTaxValue] = useState<number>(0);
  const [taxInputVisible, setTaxInputVisible] = useState(false);

  // Quick action: Accept duplicate warning
  const handleDismissDuplicate = () => {
    setHasDuplicateAnomaly(false);
  };

  // Add tax breakdown manually
  const handleAddTax = () => {
    if (taxValue > 0) {
      const parsedTax = parseFloat(taxValue.toString());
      setLineItems((prev) => [...prev, { description: "Manually Added Tax", amount: parsedTax }]);
      // Re-sum total amount
      const currentTotal = lineItems.reduce((sum, item) => sum + item.amount, 0) + parsedTax;
      setAmount(currentTotal.toFixed(2));
      setHasTaxAnomaly(false);
      setTaxInputVisible(false);
    }
  };

  const handleFinalSubmit = () => {
    const claimPayload: Claim = {
      id: "CLM-" + Math.floor(1000 + Math.random() * 9000) + "-11",
      incidentDate: claimDate,
      category: category,
      merchant: vendor,
      amount: parseFloat(amount) || 1245.50,
      status: "Verified",
    };
    onSubmitClaim(claimPayload);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Visual Back Trigger */}
      <button
        onClick={onCancel}
        className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant hover:text-secondary group transition-all"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to Upload Workspace</span>
      </button>

      {/* Header section matches design screenshot */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-secondary mb-1.5">
            <Sparkles size={16} className="text-secondary" />
            <span className="text-xs font-extrabold tracking-wider uppercase">
              AI EXTRACTION COMPLETE
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-on-background tracking-tight">
            Verify Claim Details
          </h1>
          <p className="text-sm font-normal text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
            Our AI has extracted the following information from your uploaded receipt. Please review and correct any anomalies before final submission.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onSaveDraft({
              merchant: vendor,
              date: claimDate,
              amount: parseFloat(amount) || 1245.50,
              category: category,
              invoiceNo,
              lineItems,
              hasAnomalies: hasDuplicateAnomaly || hasTaxAnomaly,
            })}
            className="px-5 py-2 border border-outline text-on-surface text-xs font-bold rounded-xl hover:bg-surface-container transition-colors"
          >
            Save Draft
          </button>
          <button
            onClick={handleFinalSubmit}
            className="px-6 py-2.5 bg-primary text-on-primary text-xs font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-md"
          >
            Submit Claim
          </button>
        </div>
      </div>

      {/* Bento Grid Layout Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
        
        {/* Left column: Source Document mock receipt */}
        <div className="lg:col-span-5 bg-white border border-outline-variant rounded-2xl overflow-hidden flex flex-col shadow-sm">
          <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <span className="text-xs font-bold text-on-surface">Source Document</span>
            <div className="flex gap-1.5">
              <button className="p-1.5 hover:bg-surface-container rounded-lg" title="Zoom In">
                <ZoomIn size={16} className="text-on-surface-variant" />
              </button>
              <button className="p-1.5 hover:bg-surface-container rounded-lg" title="Download Source">
                <Download size={16} className="text-on-surface-variant" />
              </button>
            </div>
          </div>

          <div className="flex-grow p-6 bg-slate-50 flex items-center justify-center min-h-[460px]">
            {/* High-fidelity Mock Receipt matching screenshot */}
            <div className="w-full max-w-sm aspect-[3/4] bg-white shadow-xl rounded p-6 border border-slate-200 relative overflow-hidden select-none font-sans">
              
              {/* Receipt Logo Emblem */}
              <div className="text-center mb-6">
                <div className="h-8 w-8 bg-slate-900 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-[10px] text-white font-extrabold font-mono">G</span>
                </div>
                <p className="text-xs font-extrabold tracking-wide text-slate-900">{vendor.toUpperCase()}</p>
                <p className="text-[9px] text-slate-500 font-medium">123 Industrial Way, Port Haven</p>
              </div>

              {/* Invoice details section */}
              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-500">Invoice No:</span>
                  <span className="font-mono text-slate-900 font-semibold">{invoiceNo}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-500">Date:</span>
                  <span className="text-slate-900 font-semibold">{claimDate}</span>
                </div>

                <div className="pt-3 space-y-2">
                  {lineItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-[11px]">
                      <span className="text-slate-600">{item.description}</span>
                      <span className="font-semibold text-slate-900">${item.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t-2 border-dashed border-slate-300">
                  <div className="flex justify-between font-extrabold text-sm text-slate-900">
                    <span>TOTAL</span>
                    <span>${parseFloat(amount).toLocaleString("en", { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              {/* Visually highlit teal overlays matching screenshot! */}
              {/* Highlight 1: Extracted Date area */}
              <div
                className="absolute top-[162px] left-[70px] w-32 h-6 border-2 border-secondary/40 bg-secondary/10 rounded-sm hover:bg-secondary/20 transition-all cursor-help"
                title="Extracted Date Overlay"
              ></div>

              {/* Highlight 2: Extracted Total area */}
              <div
                className="absolute bottom-[48px] right-[24px] w-24 h-8 border-2 border-secondary/40 bg-secondary/10 rounded-sm hover:bg-secondary/20 transition-all cursor-help"
                title="Extracted Total Overlay"
              ></div>

            </div>
          </div>
        </div>

        {/* Right column: Form checklist and Flag warnings */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Verification checklist card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-secondary-container text-on-secondary-container rounded-full">
                <CheckCircle size={24} className="text-on-secondary-container" />
              </div>
              <div>
                <h3 className="text-md font-bold text-on-surface">Verification Checklist</h3>
                <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                  We've verified fields. Please review flags requiring manual checks.
                </p>
              </div>
            </div>

            {/* Editable Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Vendor info */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Vendor Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    className="w-full bg-white border border-outline px-3 py-3 rounded-lg text-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-semibold pr-10"
                  />
                  <CheckCircle size={18} className="absolute right-3.5 top-3.5 text-secondary fill-secondary-container/20" />
                </div>
              </div>

              {/* Claim date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Claim Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={claimDate}
                    onChange={(e) => setClaimDate(e.target.value)}
                    className="w-full bg-white border border-outline px-3 py-3 rounded-lg text-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-semibold pr-10"
                  />
                  <CheckCircle size={18} className="absolute right-3.5 top-3.5 text-secondary fill-secondary-container/20" />
                </div>
              </div>

              {/* Claim price amount - Highlighted red warning for duplicates! */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Amount (USD)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-full bg-white border px-3 py-3 rounded-lg text-sm text-on-surface focus:ring-1 transition-all outline-none font-bold pr-10 ${
                      hasDuplicateAnomaly ? "border-error focus:ring-error text-error" : "border-outline focus:ring-secondary"
                    }`}
                  />
                  {hasDuplicateAnomaly ? (
                    <AlertTriangle size={18} className="absolute right-3.5 top-3.5 text-error fill-red-50" />
                  ) : (
                    <CheckCircle size={18} className="absolute right-3.5 top-3.5 text-secondary" />
                  )}
                </div>
              </div>

              {/* claim Category dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-outline px-3 py-3 rounded-lg text-sm font-semibold text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
                >
                  <option>Shipping & Logistics</option>
                  <option>Travel</option>
                  <option>Office Supplies</option>
                  <option>Medical Care</option>
                  <option>Property Damage</option>
                  <option>Vehicle Incident</option>
                </select>
              </div>

            </div>
          </div>

          {/* Warnings & Anomalies listings section below checklist */}
          <div className="space-y-4">
            
            {/* Box 1: Potential duplicate alert */}
            {hasDuplicateAnomaly && (
              <div className="bg-[#ba1a1a]/5 border border-error rounded-2xl p-5 flex gap-4">
                <AlertTriangle size={22} className="text-error flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-xs font-bold text-error uppercase tracking-widest">
                    POTENTIAL DUPLICATE FOUND
                  </p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    A claim for <strong>${parseFloat(amount).toLocaleString()}</strong> with <strong>Global Logistics Inc.</strong> was submitted on 10/15/2023. Please verify if this is a unique transaction.
                  </p>
                  <div className="flex gap-4 pt-1">
                    <button className="text-xs font-bold text-error hover:underline text-left">
                      View Similar Claim
                    </button>
                    <button
                      onClick={handleDismissDuplicate}
                      className="text-xs font-semibold text-on-surface-variant hover:text-primary text-left bg-surface-container py-1 px-3 rounded-lg"
                    >
                      This is a separate charge
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Box 2: Missing line item details audit */}
            {hasTaxAnomaly && (
              <div className="bg-slate-700/[0.03] border border-slate-300 rounded-2xl p-5 flex gap-4">
                <Info size={22} className="text-slate-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                    MISSING LINE-ITEM DETAIL
                  </p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    The AI couldn't resolve the tax breakdown. You can manually enter it or proceed with the total amount.
                  </p>
                  
                  {taxInputVisible ? (
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="number"
                        placeholder="Tax amount..."
                        value={taxValue === 0 ? "" : taxValue}
                        onChange={(e) => setTaxValue(parseFloat(e.target.value) || 0)}
                        className="border border-outline px-2.5 py-1 text-xs rounded-lg w-28 bg-white"
                      />
                      <button
                        onClick={handleAddTax}
                        className="bg-secondary text-on-secondary text-xs px-3 py-1 rounded-lg font-bold"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setTaxInputVisible(false)}
                        className="text-xs text-on-surface-variant"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setTaxInputVisible(true)}
                      className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-secondary hover:underline"
                    >
                      <Plus size={14} />
                      Add Tax Manually
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Pro Tip info block */}
          <div className="bg-surface-container-high rounded-2xl p-6 border border-outline-variant flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex gap-3.5 items-center">
              <div className="bg-white p-2.5 rounded-xl shadow-sm border border-outline-variant/20 flex-shrink-0 text-secondary">
                <Lightbulb size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">Pro-Tip for Quick Approval</p>
                <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
                  Attaching a clear photo of the shipping manifest speeds up processing by 40%.
                </p>
              </div>
            </div>
            <button className="text-secondary text-xs font-bold hover:bg-white/50 px-4 py-2 rounded-xl transition-colors shrink-0">
              Learn More
            </button>
          </div>

        </div>
      </div>

      {/* FOOTER ACTION STICKY MODULE matches design screenshot perfectly */}
      <div className="bg-white border-t border-outline-variant -mx-8 px-8 py-5 sticky bottom-0 glass-header flex items-center justify-between z-30 shadow-lg">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest">
              Total Amount
            </span>
            <span className="text-xl font-extrabold text-primary">
              ${parseFloat(amount || "1245.50").toLocaleString("en", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest">
              Status Flag
            </span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mt-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Ready for Review
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="px-6 py-3 text-xs font-bold border border-outline rounded-xl hover:bg-surface-container transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleFinalSubmit}
            className="px-10 py-3 text-xs font-bold bg-primary text-on-primary rounded-xl hover:shadow-lg active:scale-[0.98] transition-all flex items-center gap-2"
          >
            Submit Claim
            <Send size={14} />
          </button>
        </div>
      </div>

    </div>
  );
}
