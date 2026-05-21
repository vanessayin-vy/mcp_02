/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bell, Search, User } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  searchText: string;
  onSearchChange: (text: string) => void;
  onOpenNotifications: () => void;
  userName: string;
  userAvatar: string;
  portalMode: "policyholder" | "admin";
  onTogglePortal: () => void;
}

export default function Header({
  currentTab,
  onTabChange,
  searchText,
  onSearchChange,
  onOpenNotifications,
  userName,
  userAvatar,
  portalMode,
  onTogglePortal,
}: HeaderProps) {
  return (
    <header className="glass-header flex justify-between items-center w-full px-8 h-16 bg-surface border-b border-outline-variant z-40 shrink-0">
      
      {/* Dynamic Tab Page Title */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold uppercase tracking-wider text-on-surface-variant/80">
          {currentTab === "dashboard" || currentTab === "admin-dashboard" ? "Dashboard" : 
           currentTab === "documents" ? "Documents" :
           currentTab === "settings" ? "Profile Settings" :
           currentTab === "new-claim" ? "New Claim Submission" :
           currentTab === "verify" ? "Claim Extraction Verification" :
           currentTab === "admin-queue" ? "Intelligent Claims Queue" :
           currentTab === "admin-verify" ? "Claim Verification & Audit" : "Workspace"}
        </span>
      </div>

      {/* Center Search Inputs and Right Actions */}
      <div className="flex items-center gap-8">
        
        {/* Global Right Action Icons */}
        <div className="flex items-center gap-4">
          
          {/* Quick Search Panel */}
          <div className="hidden sm:flex items-center bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant/30">
            <Search size={16} className="text-on-surface-variant/70 mr-1.5" />
            <input
              type="text"
              placeholder={portalMode === "admin" ? "Search queue..." : "Search claims..."}
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent border-none text-xs text-on-surface w-36 placeholder:text-on-surface-variant/50 focus:outline-none"
            />
          </div>

          {/* Alarm Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="p-2 hover:bg-surface-container-high rounded-full transition-colors relative"
            title="Notifications"
          >
            <Bell size={20} className="text-on-surface-variant" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full animate-pulse"></span>
          </button>

          {/* User Profile Avatar Icon button */}
          <button 
            onClick={() => onTabChange("settings")}
            className={`h-8 w-8 rounded-full overflow-hidden border transition-all flex items-center justify-center shrink-0 cursor-pointer ${
              currentTab === "settings"
                ? "bg-secondary-container/15 border-secondary text-secondary shadow-sm"
                : "border-outline-variant hover:border-secondary bg-surface-container-low"
            }`}
            title="My Profile"
          >
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-on-surface">
                <User size={16} />
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
