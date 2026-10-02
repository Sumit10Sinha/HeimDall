"use client";

import React from "react";
import { useWorkspace, Role } from "@/context/WorkspaceContext";

interface Props {
  children: React.ReactNode;
  activeNav: string;
}

export default function DashboardLayout({ children, activeNav }: Props) {
  const { role, setRole, currentUser, theme, setTheme } = useWorkspace();

  // Problem 17: Build navigation array dynamically based on role
  const navItems = [
    "Overview", "People", "Departments", "Projects", "Tasks", 
    "Documents", "Contracts", "Communication"
  ];
  
  if (role !== "employee") {
    navItems.push("Announcements");
  }
  
  navItems.push("Reports", "AI Assistant", "Settings");

  return (
    <div className="flex min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100 font-sans transition-all duration-300 ease-in-out">
      
      <aside className="w-64 border-r border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0a0a] flex flex-col justify-between transition-all duration-300 ease-in-out">
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-slate-300 dark:border-slate-800 flex items-center space-x-3 transition-colors duration-300">
            <img src="/logo.png" alt="HeimDall Logo" className="w-10 h-10 object-contain" />
            <div>
              <span className="font-bold tracking-wider text-lg block leading-none">HEIMDALL</span>
              <span className="text-[11px] text-slate-500 uppercase tracking-widest">Stay Ahead</span>
            </div>
          </div>

          <nav className="p-2 space-y-1 overflow-y-auto flex-1">
            {navItems.map((item) => {
              const isActive = item.toLowerCase() === activeNav.toLowerCase();
              return (
                <button
                  key={item}
                  className={`w-full text-left px-3 py-2 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-black"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </nav>

          <div className="p-3 border-t border-slate-300 dark:border-slate-800 transition-colors duration-300">
            <div className="text-xs text-slate-500 uppercase font-bold mb-2">Theme Preference</div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setTheme("light")} 
                className={`flex-1 py-1.5 text-sm font-bold border transition-all duration-300 ${
                  theme === "light" 
                    ? "bg-slate-800 text-white border-slate-800 dark:bg-slate-200 dark:text-black dark:border-slate-200" 
                    : "bg-transparent text-slate-600 dark:text-slate-400 border-slate-400 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                Light
              </button>
              <button 
                onClick={() => setTheme("dark")} 
                className={`flex-1 py-1.5 text-sm font-bold border transition-all duration-300 ${
                  theme === "dark" 
                    ? "bg-slate-800 text-white border-slate-800 dark:bg-slate-200 dark:text-black dark:border-slate-200" 
                    : "bg-transparent text-slate-600 dark:text-slate-400 border-slate-400 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                Dark
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-slate-300 dark:border-slate-800 bg-slate-200 dark:bg-slate-900 transition-colors duration-300">
          <div className="text-xs text-slate-500 uppercase font-bold">Active Profile</div>
          <div className="text-sm font-bold truncate">{currentUser.name}</div>
          {/* Problem 16: Ensure HR is fully capitalized instead of 'Hr' */}
          <div className={`text-xs text-slate-600 dark:text-slate-400 ${currentUser.role === 'hr' ? 'uppercase' : 'capitalize'}`}>
            {currentUser.role}
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0a0a] px-6 flex items-center justify-between transition-colors duration-300">
          <div className="text-sm font-bold text-slate-500 dark:text-slate-400">
            HeimDall &gt; <span className="capitalize">{activeNav}</span> &gt; <span className="capitalize text-slate-900 dark:text-white">{role} Dashboard</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase text-slate-500 mr-2">Demo Role:</span>
            {(["employee", "manager", "hr", "executive"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-2.5 py-1 text-xs uppercase font-bold border transition-all duration-300 ${
                  role === r
                    ? "bg-slate-800 text-white border-slate-800 dark:bg-slate-200 dark:text-black dark:border-slate-200"
                    : "bg-transparent text-slate-600 dark:text-slate-400 border-slate-400 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}