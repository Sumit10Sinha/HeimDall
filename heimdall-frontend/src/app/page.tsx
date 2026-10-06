"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useWorkspace, Role } from "@/context/WorkspaceContext";

export default function HomePage() {
  const { isAuthenticated, login, role, currentUser, tasks, contracts, projects, announcements, updateTaskStatus } = useWorkspace();
  
  const [chatInput, setChatInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [hrSearchQuery, setHrSearchQuery] = useState("");

  const allEmployees = [
    { name: "Swapnil Bej", role: "Employee", team: "Engineering", status: "Active" },
    { name: "Debasish Dey", role: "Manager", team: "Engineering", status: "Active" },
    { name: "Sumit Sinha", role: "Executive", team: "C-Suite", status: "Active" },
    { name: "Ankan Biswas", role: "HR", team: "People", status: "Active" },
    { name: "Anamitra Kundu", role: "Employee", team: "Design", status: "Away" }
  ];

  const filteredEmployees = allEmployees.filter(emp => 
    `${emp.name} ${emp.team} ${emp.role}`.toLowerCase().includes(hrSearchQuery.toLowerCase())
  );

  const handleAiSubmit = () => {
    if (!chatInput.trim() || isAiLoading) return;
    setIsAiLoading(true);
    setAiResponse(null);
    setTimeout(() => {
      setIsAiLoading(false);
      setAiResponse("I found 3 relevant workspace signals. Your next best action is to review the blocked vendor contract.");
      setChatInput("");
    }, 2000);
  };

  const aiWidgetJSX = (
    <aside className="border border-[#032f2b] bg-[#032f2b] text-[#dce8df] p-8 flex flex-col h-full sticky top-6 animate-fade-in">
      <div className="flex justify-start items-center gap-5 mb-8">
        <span className="grid place-items-center w-10 h-10 bg-[#a3e635] text-[#02221f] font-black text-2xl flex-shrink-0">H</span>
        <div>
          <p className="text-base uppercase tracking-widest font-black text-[#a3e635] m-0">Heimdall Intelligence</p>
          <h2 className="text-2xl font-black text-white m-0 tracking-tight">Ask your workspace</h2>
        </div>
      </div>
      
      <p className="text-lg leading-relaxed mb-8">Get a clear read on priorities, people, and progress.</p>

      <div className="flex-1 flex flex-col justify-end min-h-[120px] mb-8">
        {/* Strict Skeleton Loader Requirements */}
        {isAiLoading && (
          <div className="flex flex-col gap-3">
            <span className="block h-4 bg-[#6c8f7d] animate-pulse-custom"></span>
            <span className="block h-4 bg-[#6c8f7d] animate-pulse-custom w-3/4" style={{ animationDelay: '0.15s' }}></span>
          </div>
        )}
        {!isAiLoading && aiResponse && (
          <p className="text-lg leading-relaxed border-l-4 border-[#a3e635] pl-4 text-white font-bold">{aiResponse}</p>
        )}
      </div>

      <div className="flex border-2 border-[#91a99e] bg-[#032f2b]">
        <input 
          type="text" 
          placeholder="Ask anything..." 
          className="w-full bg-transparent p-4 text-lg outline-none font-bold placeholder-[#9bb0a5] text-white"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAiSubmit()}
        />
        <button onClick={handleAiSubmit} className="w-14 bg-[#a3e635] text-[#02221f] text-2xl font-black transition-colors hover:bg-white">→</button>
      </div>
    </aside>
  );

  // === UNIQUE V0 LANDING PAGE ===
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#10201e] text-[#f3f5ef] font-sans flex flex-col p-6 md:p-10 lg:p-14 animate-fade-in">
        <header className="flex justify-between items-center border-b border-[#f3f5ef]/20 pb-5">
          <div className="font-black tracking-widest flex items-center gap-3 text-xl">
            <span className="grid place-items-center w-8 h-8 bg-[#a3e635] text-[#02221f]">H</span> HEIMDALL
          </div>
          <span className="text-[#a3e635] text-sm md:text-base font-black tracking-widest uppercase hidden md:block">Workspace Access / 01</span>
        </header>

        <main className="flex-1 flex flex-col max-w-6xl w-full mx-auto py-16">
          <div className="max-w-2xl mb-16">
            <p className="text-base uppercase tracking-widest font-black text-[#a3e635] mb-4">Welcome back / secure workspace</p>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.88] tracking-tighter mb-6">
              Choose your<br /><span className="text-[#a3e635]">access layer.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#f3f5ef]/70 font-bold max-w-xl">
              Enter HeimDall through the view built for your role. You can switch perspectives at any time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(["Employee", "Manager", "HR", "Executive"] as Role[]).map((r, idx) => (
              <button 
                key={r}
                onClick={() => login(r.toLowerCase() as Role)}
                className="text-left bg-[#f3f5ef]/5 border border-[#f3f5ef]/20 p-6 min-h-[280px] flex flex-col transition-colors hover:bg-[#a3e635] hover:text-[#10201e] group focus:outline-none"
              >
                <span className="text-base opacity-65 font-bold mb-6 block">0{idx + 1}</span>
                <span className="grid place-items-center w-14 h-14 border-2 border-current rounded-full font-black text-xl mb-4 group-hover:bg-[#10201e] group-hover:text-[#a3e635] transition-colors">{r.substring(0,2).toUpperCase()}</span>
                <span className="text-3xl font-black tracking-tight mb-3">{r}</span>
                <span className="text-base font-bold opacity-75 mb-8">Access the {r.toLowerCase()} MVP workflow and metrics.</span>
                
                <span className="mt-auto pt-5 border-t border-current/20 flex justify-between items-center text-base font-black uppercase tracking-widest w-full">
                  Enter View <span className="text-2xl leading-none">→</span>
                </span>
              </button>
            ))}
          </div>
        </main>

        <footer className="flex justify-between items-center border-t border-[#f3f5ef]/20 pt-5 text-base font-black tracking-widest opacity-70 uppercase">
          <span>Heimdall / Make Work Visible</span>
          <span>© 2026</span>
        </footer>
      </div>
    );
  }

  // === DASHBOARD VIEW ===
  return (
    <DashboardLayout activeNav="Overview">
      <div className="p-6 md:p-10 lg:p-14 max-w-[1500px] mx-auto animate-fade-in pb-20">
        
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b-2 border-[#032f2b] pb-10 mb-10">
          <div>
            <p className="text-base uppercase tracking-widest font-black text-[#62716d] mb-4">{role} workspace / October 07, 2026</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter text-[#032f2b] mb-6">
              MAKE WORK<br /><span className="text-[#5d8d23]">VISIBLE.</span>
            </h1>
            <p className="text-xl font-bold max-w-2xl text-[#10201e] m-0">One focused view for the people, projects, and decisions moving your organization forward.</p>
          </div>
          <div className="border-4 border-[#032f2b] p-6 text-2xl font-black min-w-[200px] text-center uppercase text-[#032f2b]">
            {role}<br /><span className="text-lg text-[#5d8d23]">ACCESS LAYER 0{["employee", "manager", "hr", "executive"].indexOf(role) + 1}</span>
          </div>
        </section>

        {/* Universal Metrics */}
        <section className="grid grid-cols-2 lg:grid-cols-4 border-b border-[#bdc7bd] mb-10 pb-2">
          <div className="pr-5 lg:pr-0 lg:border-r border-[#bdc7bd] mb-8 lg:mb-0"><p className="text-base font-black uppercase tracking-widest text-[#62716d] m-0">Open tasks</p><strong className="block text-6xl text-[#032f2b] font-black my-3">12</strong><p className="text-base font-bold text-[#62716d] m-0">3 due today</p></div>
          <div className="pl-5 lg:px-5 lg:border-r border-[#bdc7bd] mb-8 lg:mb-0"><p className="text-base font-black uppercase tracking-widest text-[#62716d] m-0">Active projects</p><strong className="block text-6xl text-[#032f2b] font-black my-3">08</strong><p className="text-base font-bold text-[#62716d] m-0">2 need attention</p></div>
          <div className="pr-5 lg:px-5 lg:border-r border-[#bdc7bd]"><p className="text-base font-black uppercase tracking-widest text-[#62716d] m-0">Team pulse</p><strong className="block text-6xl text-[#032f2b] font-black my-3">84%</strong><p className="text-base font-bold text-[#62716d] m-0">+6% this month</p></div>
          <div className="pl-5 lg:pl-5"><p className="text-base font-black uppercase tracking-widest text-[#62716d] m-0">Decisions</p><strong className="block text-6xl text-[#032f2b] font-black my-3">05</strong><p className="text-base font-bold text-[#62716d] m-0">Awaiting review</p></div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_0.75fr] gap-8 items-start">
          
          <div className="flex flex-col gap-8">
            {role === "employee" && (
              <section className="border-2 border-[#032f2b] bg-[#e9eee7] p-8">
                <div className="flex justify-between items-start mb-8">
                  <div><p className="text-base font-black uppercase tracking-widest text-[#62716d] m-0">Your focus</p><h2 className="text-4xl font-black text-[#032f2b] tracking-tight mt-2 m-0">Priority queue</h2></div>
                  <span className="text-base border-2 border-[#032f2b] px-3 py-2 text-[#032f2b] font-black uppercase">{role}</span>
                </div>
                {tasks.map(task => (
                  <div className="flex items-center gap-4 border-t-2 border-[#bdc7bd] py-5 mt-2" key={task.id}>
                    <span className={`w-4 h-4 flex-shrink-0 ${task.status === 'Completed' ? 'bg-[#749d35]' : task.status === 'Blocked' ? 'bg-[#bd5e3a]' : task.status === 'In Progress' ? 'bg-[#a3e635]' : 'bg-[#84918b]'}`} /> 
                    <div className="flex-1">
                      <b className="text-xl font-black text-[#10201e]">{task.title}</b>
                      <p className="text-base font-bold text-[#62716d] m-0 mt-1">{task.owner} · Priority: {task.priority}</p>
                    </div>
                    <select 
                      value={task.status} 
                      onChange={(e) => updateTaskStatus(task.id, e.target.value)} 
                      className="bg-transparent border-2 border-[#bdc7bd] p-2 text-base font-bold outline-none cursor-pointer text-[#62716d] hover:border-[#032f2b]"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                ))}
              </section>
            )}

            {role === "manager" && (
              <section className="border-2 border-[#032f2b] bg-[#e9eee7] p-8">
                <div className="flex justify-between items-start mb-8">
                  <div><p className="text-base font-black uppercase tracking-widest text-[#62716d] m-0">Manager view</p><h2 className="text-4xl font-black text-[#032f2b] tracking-tight mt-2 m-0">Team workload</h2></div>
                  <span className="text-base border-2 border-[#032f2b] px-3 py-2 text-[#032f2b] font-black uppercase">Live Snapshot</span>
                </div>
                <div className="mt-10">
                  {['To Do', 'In Progress', 'Blocked', 'Completed'].map(status => {
                    const count = tasks.filter(t => t.status === status).length;
                    const pct = Math.max((count / Math.max(tasks.length, 1)) * 100, 5);
                    return (
                      <div className="grid grid-cols-[140px_1fr_40px] items-center gap-4 my-6" key={status}>
                        <span className="text-lg font-black text-[#10201e] uppercase tracking-wide">{status}</span>
                        <div className="h-5 bg-[#cbd4ca]"><div className={`h-full ${status === 'Completed' ? 'bg-[#749d35]' : status === 'Blocked' ? 'bg-[#bd5e3a]' : status === 'In Progress' ? 'bg-[#a3e635]' : 'bg-[#84918b]'}`} style={{ width: `${pct}%` }} /></div>
                        <b className="text-2xl font-black text-[#032f2b] text-right">{count}</b>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {role === "hr" && (
              <section className="border-2 border-[#032f2b] bg-[#e9eee7] p-8">
                <div className="flex justify-between items-start mb-8">
                  <div><p className="text-base font-black uppercase tracking-widest text-[#62716d] m-0">People operations</p><h2 className="text-4xl font-black text-[#032f2b] tracking-tight mt-2 m-0">Employee directory</h2></div>
                  <span className="text-base border-2 border-[#032f2b] px-3 py-2 text-[#032f2b] font-black uppercase">{allEmployees.length} People</span>
                </div>
                <input 
                  className="w-full border-2 border-[#bdc7bd] p-4 text-lg font-bold bg-transparent text-[#10201e] placeholder-[#62716d] mb-4 focus:border-[#032f2b] outline-none" 
                  placeholder="Search name, team, or role" 
                  value={hrSearchQuery} 
                  onChange={(e) => setHrSearchQuery(e.target.value)} 
                />
                {filteredEmployees.length ? (
                  <div>
                    {filteredEmployees.map((person) => (
                      <div className="flex items-center gap-5 border-t-2 border-[#bdc7bd] py-5 mt-2" key={person.name}>
                        <span className="grid place-items-center w-12 h-12 bg-[#032f2b] text-[#a3e635] font-black text-xl">{person.name.split(' ').map(p => p[0]).join('')}</span>
                        <div className="flex-1">
                          <b className="text-xl font-black text-[#10201e]">{person.name}</b>
                          <p className="text-base font-bold text-[#62716d] m-0 mt-1">{person.role} · {person.team}</p>
                        </div>
                        <span className="text-base font-black uppercase tracking-widest text-[#62716d]">{person.status}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-4 border-dashed border-[#7f9188] p-12 text-center mt-6">
                    <b className="text-2xl font-black text-[#10201e] block mb-2 uppercase tracking-tight">No Matches Found</b>
                    <p className="text-lg font-bold text-[#62716d] m-0">Try searching for another name, team, or role.</p>
                  </div>
                )}
              </section>
            )}

            {role === "executive" && (
              <section className="border-2 border-[#032f2b] bg-[#e9eee7] p-8">
                <div className="flex justify-between items-start mb-8">
                  <div><p className="text-base font-black uppercase tracking-widest text-[#62716d] m-0">Executive view</p><h2 className="text-4xl font-black text-[#032f2b] tracking-tight mt-2 m-0">Contract Alerts</h2></div>
                  <span className="text-base border-2 border-[#032f2b] px-3 py-2 text-[#032f2b] font-black uppercase">Critical Only</span>
                </div>
                {contracts.map(c => (
                  <div className="border-t-2 border-[#bdc7bd] py-5 mt-2" key={c.id}>
                    <div className="flex justify-between items-center mb-2">
                      <b className="text-xl font-black text-[#10201e]">{c.title}</b>
                      <span className="text-base font-black text-[#bd5e3a] uppercase tracking-widest">Review Req</span>
                    </div>
                    <p className="text-lg font-bold text-[#62716d] m-0">{c.riskClause}</p>
                  </div>
                ))}
              </section>
            )}

            <section className="border-2 border-[#032f2b] bg-[#e9eee7] p-8">
              <div className="flex justify-between items-start mb-8">
                <div><p className="text-base font-black uppercase tracking-widest text-[#62716d] m-0">Across HeimDall</p><h2 className="text-4xl font-black text-[#032f2b] tracking-tight mt-2 m-0">Project signals</h2></div>
                <span className="text-base border-2 border-[#032f2b] px-3 py-2 text-[#032f2b] font-black uppercase">Q4 / 2026</span>
              </div>
              {projects.map((project) => (
                <div className="border-t-2 border-[#bdc7bd] py-5 mt-2" key={project.name}>
                  <div className="flex justify-between items-end mb-3">
                    <b className="text-xl font-black text-[#10201e]">{project.name}</b>
                    <span className="text-base font-black uppercase text-[#5d8d23]">{project.status}</span>
                  </div>
                  <div className="h-4 bg-[#cbd4ca] mb-3"><div style={{ width: `${project.progress}%` }} className="h-full bg-[#032f2b]" /></div>
                  <p className="text-base font-bold text-[#62716d] m-0 flex justify-between">
                    <span>Lead: {project.lead}</span>
                    <span className="font-black text-[#10201e]">{project.progress}% Complete</span>
                  </p>
                </div>
              ))}
            </section>
          </div>

          <div className="sticky top-6">
            {aiWidgetJSX}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}