/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlusSquare, FileText, FolderClosed, Settings, AlertOctagon, HelpCircle } from "lucide-react";

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onTriggerEmergency: () => void;
}

export default function Sidebar({ currentTab, onTabChange, onTriggerEmergency }: SidebarProps) {
  const menuItems = [
    { id: "new-claim", label: "New Claim", icon: PlusSquare },
    { id: "dashboard", label: "My Claims", icon: FileText },
    { id: "documents", label: "Documents", icon: FolderClosed },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-surface-container-low border-r border-outline-variant flex flex-col py-8 gap-4 flex-shrink-0 h-full">
      {/* Policyholder Brand Header */}
      <div className="px-6 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl font-extrabold tracking-tight text-on-surface">
            TrustAssure
          </span>
        </div>
        <p className="text-sm font-semibold tracking-wider uppercase text-on-surface-variant/70">
          Policyholder Portal
        </p>
      </div>

      {/* Navigation Menu Links */}
      <nav className="flex-grow space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id || (item.id === "new-claim" && currentTab === "verify");
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
              <Icon size={20} className={isActive ? "text-secondary" : "text-on-surface-variant/80"} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions Support Group */}
      <div className="mt-auto px-6 space-y-4">
        <button
          onClick={onTriggerEmergency}
          className="w-full bg-secondary text-on-secondary text-sm font-semibold py-3 px-4 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <AlertOctagon size={16} />
          Emergency Support
        </button>
        <button
          onClick={() => onTabChange("help")}
          className={`w-full flex items-center gap-3 py-2 text-on-surface-variant hover:text-primary transition-colors text-left text-sm ${
            currentTab === "help" ? "text-secondary font-semibold" : ""
          }`}
        >
          <HelpCircle size={20} className="text-on-surface-variant/80" />
          <span>Help Center</span>
        </button>
      </div>
    </aside>
  );
}
