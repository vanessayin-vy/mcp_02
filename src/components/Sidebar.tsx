/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileText, FolderClosed, Settings, BarChart3, ListCollapse, MessageSquareDot, Plus } from "lucide-react";

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  portalMode: "policyholder" | "admin";
}

export default function Sidebar({ currentTab, onTabChange, portalMode }: SidebarProps) {
  
  // Clean Navigation Options for Policyholder Portal
  const policyholderItems = [
    { id: "dashboard", label: "Dashboard", icon: FileText },
    { id: "documents", label: "Documents", icon: FolderClosed },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Clean Navigation Options for Enterprise Admin Portal
  const adminItems = [
    { id: "admin-dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "admin-queue", label: "Intelligent Queue", icon: ListCollapse },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const menuItems = portalMode === "admin" ? adminItems : policyholderItems;

  return (
    <aside className="w-64 bg-surface-container-low border-r border-outline-variant flex flex-col py-8 gap-4 flex-shrink-0 h-screen">
      
      {/* Policyholder / Admin Portal Header Branding */}
      <div className="px-6 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl font-extrabold tracking-tight text-on-surface">
            {portalMode === "admin" ? "ClaimFlow AI" : "Trust"}
          </span>
        </div>
        <p className="text-[10px] font-extrabold tracking-widest uppercase text-on-surface-variant/70">
          {portalMode === "admin" ? "Enterprise Workspace" : "Claim Agent"}
        </p>
      </div>

      {/* Navigation Menu Links */}
      <nav className="flex-grow space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentTab === item.id ||
            (item.id === "admin-queue" && currentTab === "admin-verify") ||
            (item.id === "dashboard" && (currentTab === "new-claim" || currentTab === "verify"));
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-all text-left ${
                isActive
                  ? "text-primary font-bold border-l-4 border-secondary bg-surface-container-highest"
                  : "text-on-surface-variant pl-7 hover:bg-surface-container-highest/60 hover:text-on-surface"
              }`}
            >
              <Icon size={18} className={isActive ? "text-secondary font-extrabold" : "text-on-surface-variant/80"} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Action Section */}
      {portalMode === "policyholder" && (
        <div className="px-6 mt-auto">
          <button
            onClick={() => onTabChange("new-claim")}
            className={`w-full text-sm font-bold py-3 px-4 rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
              currentTab === "new-claim"
                ? "bg-secondary text-on-secondary shadow-md"
                : "bg-[#131b2e] text-white hover:bg-[#1f2d4d] hover:shadow-md"
            }`}
          >
            <Plus size={14} />
            <span>New Claim</span>
          </button>
        </div>
      )}
    </aside>
  );
}
