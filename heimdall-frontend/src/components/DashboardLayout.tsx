"use client";

import React, { useState } from "react";
import { useWorkspace, Role } from "@/context/WorkspaceContext";

interface Props {
  children: React.ReactNode;
  activeNav: string;
}

export default function DashboardLayout({ children, activeNav }: Props) {
  const { role, setRole, currentUser, logout } = useWorkspace();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    "Overview", "People", "Departments", "Projects", "Tasks", 
    "Documents", "Contracts", "Communication"
  ];
  
  if (role !== "employee") navItems.push("Announcements");
  navItems.push("Reports", "AI Assistant", "Settings");

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f3f5ef] text-[#10201e] font-sans transition-colors duration-300 relative">
      
      {/* MOBILE TOP NAVIGATION BAR */}
      <div className="md:hidden flex items-center justify-between bg-[#032f2b] text-[#e8f0e7] border-b border-[#49645d] p-5 absolute top-0 w-full z-40">
        <div className="flex items-center space-x-3">
          <span className="grid place-items-center w-8 h-8 bg-[#a3e635] text-[#02221f] font-black text-lg">H</span>
          <span className="font-black tracking-widest text-xl leading-none uppercase">Heimdall</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-[#a3e635]">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeLinejoin="miter" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#10201e]/80 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* RESPONSIVE SIDEBAR (v0 Deep Green Aesthetic) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#032f2b] text-[#e8f0e7] flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-8 pb-4 flex items-center space-x-4">
            <span className="grid place-items-center w-10 h-10 bg-[#a3e635] text-[#02221f] font-black text-2xl">H</span>
            <span className="font-black tracking-widest text-2xl block leading-none uppercase">Heimdall</span>
          </div>

          <div className="px-8 mt-6 mb-4 text-base font-black tracking-widest uppercase text-[#93aaa0]">Workspace</div>

          <nav className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = item.toLowerCase() === activeNav.toLowerCase();
              return (
                <button
                  key={item}
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={`w-full text-left px-8 py-3 text-lg transition-colors flex items-center gap-4 border-l-4 ${
                    isActive
                      ? "bg-[#a3e635] text-[#02221f] font-black border-[#d9ff8d]"
                      : "text-[#c8d8cf] hover:bg-[#02221f] border-transparent font-bold"
                  }`}
                >
                  <span className={`w-2 h-2 border ${isActive ? 'border-[#02221f]' : 'border-[#c8d8cf]'}`}></span>
                  {item}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-[#49645d] flex flex-col gap-2">
          <div className="text-base text-[#93aaa0] uppercase font-black tracking-widest">Signed In As</div>
          <div className="text-xl font-black truncate text-white">{currentUser.name}</div>
          <div className="text-base text-[#a4bcb0] font-bold capitalize">{currentUser.role}</div>
          <button onClick={logout} className="mt-4 w-full border border-[#49645d] py-2 text-base font-bold text-[#c8d8cf] hover:bg-[#02221f] transition-colors">Sign Out</button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 pt-[88px] md:pt-0 bg-[#f3f5ef]">
        
        {/* TOPBAR WITH ROLE SWITCHER */}
        <header className="min-h-[78px] border-b border-[#bdc7bd] bg-[#032f2b] px-6 md:px-10 flex items-center justify-between">
          <div className="text-lg font-black uppercase tracking-widest text-[#93aaa0] hidden md:block">
            Layer 0{["employee", "manager", "hr", "executive"].indexOf(role) + 1}
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto hide-scrollbar w-full md:w-auto">
            {(["employee", "manager", "hr", "executive"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-2.5 text-base uppercase font-bold border transition-colors ${
                  role === r
                    ? "bg-[#a3e635] text-[#02221f] border-[#a3e635] font-black"
                    : "bg-transparent text-[#c8d8cf] border-[#527067] hover:bg-[#02221f]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </header>

        <main className="flex-1 overflow-y-scroll">{children}</main>
      </div>
    </div>
  );
}