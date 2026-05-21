/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { CloudUpload, Camera, Image as ImageIcon, FileText, AlertCircle, CheckCircle, Info, HelpCircle, ArrowRight, Loader } from "lucide-react";
import { UploadedFile } from "../types";

interface NewClaimViewProps {
  files: UploadedFile[];
  onUploadFile: (file: File) => Promise<void>;
  onRemoveFile: (id: string) => void;
  onFixFile: (file: UploadedFile) => void;
  onContinueToDetails: () => void;
  onSaveDraft: () => void;
  isProcessing: boolean;
}

export default function NewClaimView({
  files,
  onUploadFile,
  onRemoveFile,
  onFixFile,
  onContinueToDetails,
  onSaveDraft,
  isProcessing,
}: NewClaimViewProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop events handlers
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files) as File[];
      for (const file of droppedFiles) {
        await onUploadFile(file);
      }
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFiles = Array.from(e.target.files) as File[];
      for (const file of selectedFiles) {
        await onUploadFile(file);
      }
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Compute stats based on files uploaded
  const totalScannedValue = files
    .filter((f) => f.status === "verified" && f.extractedData)
    .reduce((sum, f) => sum + (f.extractedData?.amount || 0), 0);
  
  const estimatedPayout = totalScannedValue * 0.85; // Simulated payout ratio e.g. co-payment threshold

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Stepper Progress Documentation Header */}
      <div className="bg-white rounded-2xl p-6 border border-outline-variant flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-secondary">
              Step 1: Documentation & Evidence
            </span>
            <span className="text-sm font-medium text-on-surface-variant">
              25% Complete
            </span>
          </div>
          <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
            <div className="bg-secondary h-full w-1/4 rounded-full transition-all duration-700 ease-out"></div>
          </div>
        </div>

        {/* Stepper circles */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-sm">
              1
            </div>
          </div>
          <div className="w-8 h-0.5 bg-outline-variant"></div>
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-bold text-sm">
              2
            </div>
          </div>
          <div className="w-8 h-0.5 bg-outline-variant"></div>
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-bold text-sm">
              3
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Bento Grid Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Segment: Drag-Drop Upload Context */}
        <div className="lg:col-span-8 space-y-6">
          
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={triggerFileSelect}
            className={`cursor-pointer border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all h-[360px] select-none ${
              dragActive
                ? "border-secondary bg-surface-container-low"
                : "border-outline-variant hover:border-secondary h-min bg-surface-container-lowest"
            }`}
          >
            <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mb-4 text-on-secondary-container">
              <CloudUpload size={32} />
            </div>
            
            <h2 className="text-lg font-bold text-on-surface mb-1">
              Upload Receipts & Evidence
            </h2>
            <p className="text-sm text-on-surface-variant max-w-sm mb-6">
              Drag and drop your files here, or click to browse. AI will automatically scan and verify your documents in real-time.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); triggerFileSelect(); }}
                className="bg-primary text-on-primary font-bold text-xs px-5 py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all"
              >
                Select Files
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); triggerFileSelect(); }}
                className="bg-surface-container-high text-on-surface font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-surface-variant transition-colors"
              >
                <Camera size={14} />
                Use Camera
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,.pdf"
              className="hidden"
              multiple
            />
          </div>

          {/* AI Active Processing Engine Console Queue */}
          <div className="bg-white rounded-2xl border border-outline-variant overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-secondary rounded-full animate-ping mr-0.5"></span>
                Processing Engine
              </h3>
              <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                Active Intelligence
              </span>
            </div>

            <div className="p-6 space-y-4">
              {files.length === 0 ? (
                <div className="text-center py-6 text-on-surface-variant text-sm">
                  Drag in files to start automatic neural data extraction.
                </div>
              ) : (
                files.map((file) => (
                  <div
                    key={file.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border ${
                      file.status === "verified"
                        ? "border-emerald-500/20 bg-emerald-50/20"
                        : file.status === "flagged"
                        ? "border-error/20 bg-red-50/20"
                        : "border-outline-variant/30 bg-surface-container-lowest"
                    }`}
                  >
                    {/* File icon preview */}
                    <div className="w-11 h-11 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant flex-shrink-0">
                      {file.type.startsWith("image/") ? (
                        <ImageIcon size={20} />
                      ) : (
                        <FileText size={20} />
                      )}
                    </div>

                    {/* Progress details */}
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <h4 className="text-sm font-bold text-on-surface truncate pr-2">
                          {file.name}
                        </h4>
                        <span
                          className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide ${
                            file.status === "verified"
                              ? "bg-emerald-100 text-emerald-800"
                              : file.status === "flagged"
                              ? "bg-error-container text-on-error-container"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {file.status === "verifying" ? "Verifying..." : file.status}
                        </span>
                      </div>

                      {file.status === "verifying" ? (
                        <div className="mt-2 w-full h-1.5 bg-surface-container rounded-full relative overflow-hidden">
                          <div className="shimmer absolute inset-0 w-full h-full"></div>
                        </div>
                      ) : file.status === "verified" ? (
                        <p className="text-xs text-emerald-800 flex items-center gap-1 mt-0.5">
                          <CheckCircle size={12} className="fill-emerald-800 text-white" />
                          {file.confidence}% confidence - Valid Claim Item
                        </p>
                      ) : (
                        <p className="text-xs text-error flex items-center gap-1 mt-0.5">
                          <AlertCircle size={12} className="fill-error text-white" />
                          {file.message || "Manual input verification required."}
                        </p>
                      )}
                    </div>

                    {/* Quick Action Button for bad files */}
                    {file.status === "flagged" && (
                      <button
                        onClick={() => onFixFile(file)}
                        className="bg-primary text-on-primary px-3.5 py-1.5 rounded-lg text-xs font-bold shadow hover:opacity-95"
                      >
                        FIX
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Quick stats lists, instructions, help prompts */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Dynamic Analysis sidebar box */}
          <div className="bg-inverse-surface text-inverse-on-surface rounded-2xl p-6 space-y-5 shadow-md">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-outline-variant/10 pb-2">
              Real-time Analysis
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-outline/20 pb-2">
                <span className="text-xs text-surface-variant">Total Detected Value</span>
                <span className="text-lg font-bold text-white">
                  ${totalScannedValue > 0 ? totalScannedValue.toLocaleString("en-US", { minimumFractionDigits: 2 }) : "1,420.50"}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-outline/20 pb-2">
                <span className="text-xs text-surface-variant">Items Scanned</span>
                <span className="text-sm font-semibold">{files.length} of {files.length || 3}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-surface-variant">Estimated Payout</span>
                <span className="text-sm font-bold text-secondary-container">
                  ~ ${estimatedPayout > 0 ? estimatedPayout.toLocaleString("en-US", { minimumFractionDigits: 2 }) : "1,100.00"}
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl leading-relaxed">
              <p className="text-xs italic text-surface-variant">
                "Scanning complete. Please review any flagged items to ensure maximum compliance and quick reimbursement."
              </p>
            </div>
          </div>

          {/* Guideline checklist checks */}
          <div className="bg-surface-container-high rounded-2xl p-6 border border-outline-variant/30 shadow-sm">
            <h4 className="text-sm font-bold text-on-surface mb-3 flex items-center gap-2">
              <Info size={16} className="text-secondary" />
              Best Practices
            </h4>
            <ul className="space-y-2.5 text-xs text-on-surface-variant">
              <li className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
                <span>Ensure all four corners of receipts are visible in images.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
                <span>Include itemized lists, not just the total balance.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
                <span>PDF formats are preferred for digital statements.</span>
              </li>
            </ul>
          </div>

          {/* Support floating card helpful */}
          <div className="bg-white rounded-2xl p-5 border border-outline-variant flex items-center gap-4 cursor-pointer hover:shadow-md hover:border-secondary transition-all group">
            <div className="w-11 h-11 bg-surface-container rounded-full flex items-center justify-center text-on-surface flex-shrink-0">
              <HelpCircle size={20} />
            </div>
            <div className="flex-grow min-w-0">
              <h5 className="text-xs font-bold text-on-surface">Need assistance?</h5>
              <p className="text-[10px] text-on-surface-variant">Live chat is available 24/7</p>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Global Stepper Stepper Footer Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-outline-variant gap-4 bg-surface mt-8">
        <button
          onClick={onSaveDraft}
          className="w-full md:w-auto px-6 py-3 rounded-xl border border-outline-variant text-on-surface text-sm font-bold hover:bg-surface-container-high transition-colors text-center"
        >
          Save as Draft
        </button>
        <button
          onClick={onContinueToDetails}
          disabled={files.length === 0 || isProcessing}
          className="w-full md:w-auto px-10 py-3 rounded-xl bg-secondary text-on-secondary text-sm font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <Loader size={16} className="animate-spin" />
              Processing AI Scan...
            </>
          ) : (
            <>
              Continue to Details
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>

    </div>
  );
}
