"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useWorkspace, Role } from "@/context/WorkspaceContext";

export default function HomePage() {
  const { isAuthenticated, login, logout, role, currentUser, tasks, contracts, projects, announcements, updateTaskStatus } = useWorkspace();
  
  const [chatInput, setChatInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [hrSearchQuery, setHrSearchQuery] = useState("");

  const allEmployees = [
    { name: "Swapnil Bej", role: "Employee", dept: "Engineering", status: "Active" },
    { name: "Debasish Dey", role: "Manager", dept: "Engineering", status: "Active" },
    { name: "Sumit Sinha", role: "Executive", dept: "C-Suite", status: "Active" },
    { name: "Ankan Biswas", role: "HR", dept: "HR & People", status: "Active" },
    { name: "Anamitra Kundu", role: "Employee", dept: "Design", status: "At Leave" }
  ];

  const filteredEmployees = allEmployees.filter(emp => 
    emp.name.toLowerCase().includes(hrSearchQuery.toLowerCase())
  );

  const handleAiSubmit = () => {
    if (!chatInput.trim()) return;
    setIsAiLoading(true);
    setAiResponse(null);
    setTimeout(() => {
      setIsAiLoading(false);
      setAiResponse("Since no Backend Integration has been done, we cant help you currently. Stay tuned and come back next week to use HeimDall AI");
      setChatInput("");
    }, 2000);
  };

  const aiWidgetJSX = (
    <div className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a0a0a] p-4 flex flex-col h-48 animate-fade-in mt-auto transition-colors duration-300">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-bold">Heimdall AI</h2>
        <svg className="w-5 h-5 text-slate-800 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="square" strokeLinejoin="miter" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-black p-2 text-sm flex flex-col justify-end transition-colors duration-300">
        {isAiLoading && (
          <div className="space-y-2 animate-pulse w-full px-2">
            <div className="h-2 bg-slate-300 dark:bg-slate-700 w-3/4"></div>
            <div className="h-2 bg-slate-300 dark:bg-slate-700 w-full"></div>
          </div>
        )}
        {!isAiLoading && aiResponse && (
          <div className="text-slate-900 dark:text-slate-100 border-l-2 border-slate-800 dark:border-slate-400 pl-2">
            <span className="font-bold block text-xs mb-1">AI Assistant</span>
            {aiResponse}
          </div>
        )}
      </div>

      <div className="flex border border-slate-300 dark:border-slate-700 bg-white dark:bg-black transition-colors duration-300">
        <input 
          type="text" 
          placeholder="Ask AI..." 
          className="w-full bg-transparent p-2 text-sm outline-none font-bold placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAiSubmit()}
        />
        <button onClick={handleAiSubmit} className="px-3 hover:bg-slate-200 dark:hover:bg-slate-800 font-bold border-l border-slate-300 dark:border-slate-700 transition-colors duration-300">+</button>
      </div>
    </div>
  );

  // === LANDING PAGE ===
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100 flex flex-col font-sans animate-fade-in transition-colors duration-300 ease-in-out">
        <header className="border-b border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0a0a] px-8 py-4 flex justify-between items-center transition-colors duration-300">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="HeimDall Logo" className="w-10 h-10 object-contain" />
            <div>
              <span className="font-bold tracking-wider text-xl block leading-none text-slate-900 dark:text-white">HEIMDALL</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest">Stay Ahead</span>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 uppercase text-slate-900 dark:text-white transition-colors duration-300">
            Unify Your Company.<br />Empower Your Team.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl font-bold">
            The high-fidelity enterprise workspace powered by grounded AI intelligence.
          </p>

          <div className="border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0a0a] p-8 w-full max-w-lg text-left transition-colors duration-300">
            <h2 className="text-xl font-bold mb-2">Access Workspace</h2>
            <p className="text-sm text-slate-500 mb-6 font-bold">Select a persona to test the role-based MVP.</p>
            
            <div className="space-y-3">
              {(["employee", "manager", "hr", "executive"] as Role[]).map((r) => (
                <button 
                  key={r}
                  onClick={() => login(r)}
                  className="w-full flex justify-between items-center border border-slate-400 dark:border-slate-600 p-4 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-200 dark:hover:text-black transition-all duration-300 group bg-white dark:bg-black"
                >
                  <span className="font-bold text-base capitalize">Login as {r}</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // === DASHBOARD VIEW ===
  return (
    <DashboardLayout activeNav="Overview">
      <div className="mb-6 animate-fade-in flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Welcome Back, {currentUser.name}!</h1>
        </div>
        <button onClick={logout} className="text-sm font-bold border border-red-500 text-red-600 dark:text-red-400 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950 transition-colors">
          Sign Out
        </button>
      </div>

      {role === "employee" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a0a0a] p-4 transition-colors duration-300">
              <h2 className="text-lg font-bold mb-4">Pending Tasks</h2>
              <div className="space-y-2">
                
                {/* Problem 13: Added Column Headers for the Employee Task List */}
                <div className="grid grid-cols-5 gap-4 items-center px-3 pb-2 border-b border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-500">
                  <div className="col-span-2">Task</div>
                  <div>Project</div>
                  <div>Priority</div>
                  <div>Status</div>
                </div>

                {tasks.map(task => (
                  <div key={task.id} className="grid grid-cols-5 gap-4 items-center border border-slate-300 dark:border-slate-700 bg-white dark:bg-black p-3 transition-colors duration-300">
                    <span className="col-span-2 text-base font-bold truncate pr-2">{task.title}</span>
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400 truncate pr-2">
                      {/* @ts-ignore - Fallback just in case mockData is out of sync */}
                      {task.projectName || 'General'} 
                    </span>
                    <span className={`text-base font-bold ${task.priority === 'High' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>{task.priority}</span>
                    
                    <select 
                      value={task.status} 
                      onChange={(e) => updateTaskStatus(task.id, e.target.value)} 
                      className="bg-white dark:bg-black text-slate-900 dark:text-white border border-slate-400 dark:border-slate-600 p-1 text-sm font-bold outline-none w-full cursor-pointer transition-colors duration-300"
                    >
                      <option className="bg-white text-black dark:bg-[#0a0a0a] dark:text-white" value="To Do">To Do</option>
                      <option className="bg-white text-black dark:bg-[#0a0a0a] dark:text-white" value="In Progress">In Progress</option>
                      <option className="bg-white text-black dark:bg-[#0a0a0a] dark:text-white" value="Completed">Completed</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            <div className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a0a0a] p-4 mb-6 transition-colors duration-300">
              <h2 className="text-lg font-bold mb-4">Active Projects</h2>
              {projects.map(p => (
                <div key={p.id} className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-black p-3 mb-2 transition-colors duration-300">
                  <div className="font-bold text-base">{p.name}</div>
                  <div className="text-base font-bold text-slate-600 dark:text-slate-400">Status: {p.status} ({p.progress}%)</div>
                </div>
              ))}
            </div>
            {aiWidgetJSX}
          </div>
        </div>
      )}

      {role === "manager" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a0a0a] p-4 transition-colors duration-300">
              <h2 className="text-lg font-bold mb-4">Workload Status Overview</h2>
              <div className="h-48 flex flex-col pt-4">
                <div className="flex-1 flex items-end space-x-6 border-l-2 border-b-2 border-slate-300 dark:border-slate-700 pl-4 pb-1">
                  {['To Do', 'In Progress', 'Blocked', 'Completed'].map(status => {
                    const count = tasks.filter(t => t.status === status).length;
                    const maxTasks = Math.max(...['To Do', 'In Progress', 'Blocked', 'Completed'].map(s => tasks.filter(t => t.status === s).length), 1);
                    const heightPct = count > 0 ? (count / maxTasks) * 100 : 5;
                    
                    let barColor = "bg-slate-800 dark:bg-slate-200";
                    if(status === 'Blocked') barColor = "bg-red-500";
                    if(status === 'Completed') barColor = "bg-green-500";
                    if(status === 'In Progress') barColor = "bg-amber-500";

                    return (
                      <div key={status} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                        <span className="text-sm font-bold mb-1">{count}</span>
                        <div className={`w-full ${barColor} transition-all duration-500`} style={{ height: `${heightPct}%` }}></div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex space-x-6 pl-4 mt-2">
                  {['To Do', 'In Progress', 'Blocked', 'Completed'].map(status => (
                    <div key={status} className="flex-1 text-center text-xs font-bold text-slate-600 dark:text-slate-400 truncate">{status}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a0a0a] p-4 transition-colors duration-300">
              <h2 className="text-lg font-bold mb-4">Active Projects</h2>
              <table className="w-full text-left">
                <thead><tr className="border-b border-slate-300 dark:border-slate-700"><th className="pb-2 font-bold text-slate-500">Project</th><th className="pb-2 font-bold text-slate-500">Status</th><th className="pb-2 font-bold text-slate-500">Lead</th></tr></thead>
                <tbody>
                  {projects.map(p => (
                    <tr key={p.id} className="border-b border-slate-300 dark:border-slate-700 transition-colors duration-300">
                      <td className="py-3 text-base font-bold">{p.name}</td>
                      <td className="py-3 text-base font-bold">{p.status}</td>
                      <td className="py-3 text-base font-bold">{p.lead}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            <div className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a0a0a] p-4 mb-6 transition-colors duration-300">
              <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
              <button className="w-full bg-slate-800 text-white dark:bg-slate-200 dark:text-black p-2 mb-2 font-bold text-base transition-all hover:opacity-90">+ New Task</button>
              <button className="w-full border border-slate-400 dark:border-slate-600 p-2 font-bold text-base hover:bg-slate-200 dark:hover:bg-slate-800 bg-white dark:bg-black transition-all">Upload Contract</button>
            </div>
            {aiWidgetJSX}
          </div>
        </div>
      )}

      {role === "hr" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          <div className="space-y-6">
            <div className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a0a0a] p-4 transition-colors duration-300">
              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-bold">Onboardings</h2>
                <button className="border border-slate-400 dark:border-slate-600 bg-white dark:bg-black px-2 text-base font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">+ New</button>
              </div>
              <div className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-black p-3 text-base font-bold transition-colors duration-300">
                <span className="text-green-600">&bull;</span> New Hire Onboarding
              </div>
            </div>
            <div className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a0a0a] p-4 transition-colors duration-300">
              <h2 className="text-lg font-bold mb-4">Announcements</h2>
              {announcements.map(a => (
                <div key={a.id} className="border-b border-slate-300 dark:border-slate-700 pb-2 mb-2 text-base transition-colors duration-300">
                  <span className="font-bold block">{a.title}</span>
                  <span className="text-slate-600 dark:text-slate-400 font-bold">By {a.author}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6 flex flex-col">
            <div className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a0a0a] p-4 transition-colors duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Employee Directory</h2>
                <input 
                  type="text" 
                  placeholder="Search name..." 
                  className="border border-slate-400 dark:border-slate-600 bg-white dark:bg-black p-1.5 px-3 text-sm font-bold outline-none w-48 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white transition-colors duration-300"
                  value={hrSearchQuery}
                  onChange={(e) => setHrSearchQuery(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center mb-6 border-b border-slate-300 dark:border-slate-700 pb-4 transition-colors duration-300">
                <div><div className="text-base text-slate-500 font-bold">Total</div><div className="text-xl font-bold">{allEmployees.length}</div></div>
                <div className="border-l border-r border-slate-300 dark:border-slate-700"><div className="text-base text-slate-500 font-bold">Active</div><div className="text-xl font-bold">4</div></div>
                <div><div className="text-base text-slate-500 font-bold">At Leave</div><div className="text-xl font-bold">1</div></div>
              </div>
              
              {filteredEmployees.length === 0 ? (
                <div className="border border-dashed border-slate-400 dark:border-slate-600 p-8 text-center text-slate-500 bg-white dark:bg-black transition-colors duration-300">
                  <p className="font-bold text-lg mb-1">No employees found</p>
                  <p className="text-sm font-bold">Try adjusting your search query.</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead><tr className="border-b border-slate-300 dark:border-slate-700 text-slate-500 transition-colors duration-300"><th className="pb-2 font-bold">Name</th><th className="pb-2 font-bold">Role</th><th className="pb-2 font-bold">Status</th></tr></thead>
                  <tbody>
                    {filteredEmployees.map((emp, idx) => (
                      <tr key={idx} className="border-b border-slate-300 dark:border-slate-700 bg-white dark:bg-black transition-colors duration-300">
                        <td className="py-3 px-2 text-base font-bold">{emp.name}</td>
                        <td className="py-3 text-base font-bold">{emp.role}</td>
                        <td className={`py-3 font-bold ${emp.status === 'Active' ? 'text-green-600' : 'text-amber-600'}`}>&bull; {emp.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            
            {aiWidgetJSX}
          </div>
        </div>
      )}

      {role === "executive" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a0a0a] p-4 transition-colors duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Weekly AI Company Summary</h2>
                {/* Problem 15: Replaced static pill with interactive See More button */}
                <button className="bg-white dark:bg-black border border-slate-300 dark:border-slate-700 px-3 py-1 text-sm font-bold transition-colors hover:bg-slate-200 dark:hover:bg-slate-800">See More</button>
              </div>
              <ul className="list-disc pl-5 text-base font-bold space-y-2">
                <li>Q3 targets on track. Cost variance anomaly detected in 'Marketing - Apex' project.</li>
                <li>AI review of new Vendor B contract flags 2 critical clauses.</li>
                <li>Workspace activity up 15% across Engineering team.</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a0a0a] p-4 transition-colors duration-300">
                <h2 className="text-lg font-bold mb-2">Key Risks (Critical)</h2>
                <div className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-black p-3 text-base transition-colors duration-300">
                  <p className="font-bold text-red-600 dark:text-red-400">Departmental Cost Variance</p>
                  <p className="font-bold">Project: Apollo (+18%)</p>
                  <button className="mt-2 text-sm font-bold border border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-[#0a0a0a] px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">Assign Follow-up to CFO</button>
                </div>
              </div>
              <div className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a0a0a] p-4 transition-colors duration-300">
                <h2 className="text-lg font-bold mb-2">Contractual Alerts</h2>
                {contracts.map(c => (
                  <div key={c.id} className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-black p-3 text-base mb-2 transition-colors duration-300">
                    <p className="font-bold">{c.title}</p>
                    <p className="text-amber-600 dark:text-amber-400 font-bold">{c.riskClause}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            <div className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a0a0a] p-4 text-center mb-6 flex flex-col justify-center transition-colors duration-300">
              <h2 className="text-lg font-bold mb-4">Organization Risk Score</h2>
              <div className="text-5xl font-bold text-amber-500 mb-4">6<span className="text-2xl text-slate-500">/10</span></div>
              
              <div className="w-full relative h-4 flex mb-2 border border-slate-400 dark:border-slate-600">
                <div className="flex-1 bg-green-500"></div>
                <div className="flex-1 bg-amber-500"></div>
                <div className="flex-1 bg-red-500"></div>
                <div className="absolute top-[-4px] bottom-[-4px] w-1.5 bg-slate-900 dark:bg-white transition-colors duration-300" style={{ left: '60%' }}></div>
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">Medium Risk Threshold</div>
            </div>

            {aiWidgetJSX}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}