"use client";

import React, { useState } from "react";
import { useWorkspace, Role } from "@/context/WorkspaceContext";

interface Props {
  children: React.ReactNode;
  activeNav: string;
}

export default function DashboardLayout({ children, activeNav }: Props) {
  const { role, setRole, currentUser, theme, setTheme } = useWorkspace();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-[#202124] text-slate-900 dark:text-slate-100 font-sans transition-all duration-300 ease-in-out relative">
      
      {/* 1. MOBILE TOP NAVIGATION BAR (Hamburger Menu) */}
      <div className="md:hidden flex items-center justify-between bg-slate-50 dark:bg-[#2f3033] border-b border-slate-300 dark:border-slate-800 p-4 absolute top-0 w-full z-40 transition-colors duration-300">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="HeimDall Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold tracking-wider text-lg leading-none">HEIMDALL</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* 2. MOBILE BACKDROP (Clicking outside closes the sidebar) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 3. RESPONSIVE SIDEBAR (Fixed Drawer on Mobile, Static on Desktop) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#2f3033] flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-4 border-b border-slate-300 dark:border-slate-800 flex items-center space-x-3 transition-colors duration-300">
            <img src="/logo.png" alt="HeimDall Logo" className="w-10 h-10 object-contain" />
            <div>
              <span className="font-bold tracking-wider text-lg block leading-none">HEIMDALL</span>
              <span className="text-[11px] text-slate-500 uppercase tracking-widest">Stay Ahead</span>
            </div>
          </div>

          <nav className="p-2 space-y-1 overflow-y-auto flex-1 hide-scrollbar">
            {navItems.map((item) => {
              const isActive = item.toLowerCase() === activeNav.toLowerCase();
              return (
                <button
                  key={item}
                  onClick={() => setIsMobileMenuOpen(false)} // Closes menu when a link is clicked on mobile
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

        <div className="p-3 border-t border-slate-300 dark:border-slate-800 bg-slate-200 dark:bg-[#202124] transition-colors duration-300">
          <div className="text-xs text-slate-500 uppercase font-bold">Active Profile</div>
          <div className="text-sm font-bold truncate">{currentUser.name}</div>
          {/* Problem 16: Ensure HR is fully capitalized instead of 'Hr' */}
          <div className={`text-xs text-slate-600 dark:text-slate-400 ${currentUser.role === 'hr' ? 'uppercase' : 'capitalize'}`}>
            {currentUser.role}
          </div>
        </div>
      </aside>

      {/* 4. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 pt-[72px] md:pt-0 bg-white dark:bg-[#202124] transition-colors duration-300">
        <header className="min-h-14 py-2 md:py-0 border-b border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#2f3033] px-4 md:px-6 flex flex-col md:flex-row md:items-center justify-center md:justify-between gap-3 transition-colors duration-300">
          
          <div className="text-sm font-bold text-slate-500 dark:text-slate-400 truncate">
            HeimDall &gt; <span className="capitalize">{activeNav}</span> &gt; <span className="capitalize text-slate-900 dark:text-white">{role} Dashboard</span>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
            <span className="text-xs font-bold uppercase text-slate-500 whitespace-nowrap">Demo Role:</span>
            {(["employee", "manager", "hr", "executive"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-2.5 py-1 text-xs uppercase font-bold border whitespace-nowrap transition-all duration-300 ${
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

        {/* Problem 28 Fix: overflow-y-scroll permanently locks the scrollbar track on all tabs */}
        <main className="p-4 md:p-6 flex-1 overflow-y-scroll">{children}</main>
      </div>
    </div>
  );
}