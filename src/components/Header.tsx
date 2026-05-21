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
}

export default function Header({
  currentTab,
  onTabChange,
  searchText,
  onSearchChange,
  onOpenNotifications,
  userName,
  userAvatar,
}: HeaderProps) {
  return (
    <header className="glass-header flex justify-between items-center w-full px-8 h-16 bg-surface border-b border-outline-variant z-40 fixed top-0 left-0">
      {/* Brand Launcher Logo */}
      <button 
        onClick={() => onTabChange("dashboard")} 
        className="flex items-center gap-2 hover:opacity-85 transition-opacity"
      >
        <span className="text-xl font-bold tracking-tight text-primary font-sans">
          ClaimsPortal
        </span>
      </button>

      {/* Center Search Inputs or View Toggle Links */}
      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-8 mr-4">
          <button
            onClick={() => onTabChange("dashboard")}
            className={`text-sm tracking-wide font-semibold transition-colors ${
              currentTab === "dashboard"
                ? "text-secondary font-bold"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onTabChange("settings")}
            className={`text-sm tracking-wide font-semibold transition-colors ${
              currentTab === "settings"
                ? "text-secondary font-bold"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            My Profile
          </button>
        </div>

        {/* Global Right Action Icons */}
        <div className="flex items-center gap-4">
          {/* Quick Search Panel */}
          <div className="hidden sm:flex items-center bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant/30">
            <Search size={16} className="text-on-surface-variant/70 mr-1.5" />
            <input
              type="text"
              placeholder="Search claims..."
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

          {/* User Profile Avatar */}
          <div 
            onClick={() => onTabChange("settings")}
            className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant cursor-pointer hover:border-secondary transition-all"
            title={`${userName}'s profile`}
          >
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-surface-container-highest flex items-center justify-center text-on-surface">
                <User size={16} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
