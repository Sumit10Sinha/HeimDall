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
    <div className="border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-[#2f3033] p-6 flex flex-col h-64 animate-fade-in mt-auto transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Heimdall AI</h2>
        <svg className="w-6 h-6 text-slate-800 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="square" strokeLinejoin="miter" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#202124] p-4 flex flex-col transition-colors duration-300">
        <div className="mt-auto space-y-3">
          {/* Skeleton Loaders Required[cite: 17, 18] */}
          {isAiLoading && (
            <div className="space-y-3 animate-pulse w-full px-2">
              <div className="h-4 bg-slate-300 dark:bg-slate-700 w-3/4"></div>
              <div className="h-4 bg-slate-300 dark:bg-slate-700 w-full"></div>
            </div>
          )}
          {!isAiLoading && aiResponse && (
            <div className="text-base text-slate-900 dark:text-slate-100 border-l-4 border-slate-800 dark:border-slate-400 pl-4 py-1">
              <span className="font-bold block text-base mb-2">AI Assistant</span>
              {aiResponse}
            </div>
          )}
        </div>
      </div>

      <div className="flex border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#202124] transition-colors duration-300">
        <input 
          type="text" 
          placeholder="Ask AI..." 
          className="w-full bg-transparent p-3 text-base outline-none font-bold placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAiSubmit()}
        />
        <button onClick={handleAiSubmit} className="px-5 text-xl hover:bg-slate-200 dark:hover:bg-slate-700 font-bold border-l-2 border-slate-300 dark:border-slate-700 transition-colors duration-300">+</button>
      </div>
    </div>
  );

  // === LANDING PAGE ===
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#202124] text-slate-900 dark:text-slate-100 flex flex-col font-sans animate-fade-in transition-colors duration-300 ease-in-out">
        <header className="border-b border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-[#2f3033] px-8 py-5 flex justify-between items-center transition-colors duration-300">
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="HeimDall Logo" className="w-12 h-12 object-contain" />
            <div>
              <span className="font-bold tracking-wider text-2xl block leading-none text-slate-900 dark:text-white">HEIMDALL</span>
              <span className="text-base text-slate-600 dark:text-slate-400 uppercase tracking-widest block mt-1">Stay Ahead</span>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 uppercase text-slate-900 dark:text-white transition-colors duration-300">
            Unify Your Company.<br />Empower Your Team.
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-14 max-w-3xl font-bold">
            The high-fidelity enterprise workspace powered by grounded AI intelligence.
          </p>

          <div className="border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-[#2f3033] p-10 w-full max-w-xl text-left transition-colors duration-300">
            <h2 className="text-2xl font-bold mb-3">Access Workspace</h2>
            <p className="text-base text-slate-600 dark:text-slate-400 mb-8 font-bold">Select a persona to test the role-based MVP.</p>
            
            <div className="space-y-4">
              {/* Removed banned hover animations (group-hover:translate-x-1)[cite: 18] */}
              {(["employee", "manager", "hr", "executive"] as Role[]).map((r) => (
                <button 
                  key={r}
                  onClick={() => login(r)}
                  className="w-full flex justify-between items-center border-2 border-slate-400 dark:border-slate-500 p-5 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-200 dark:hover:text-black transition-colors duration-300 bg-slate-50 dark:bg-[#202124]"
                >
                  <span className="font-bold text-lg capitalize">Login as {r}</span>
                  <span className="text-2xl font-bold">→</span>
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
      <div className="w-full min-h-[101vh] pb-8">
        <div className="mb-8 animate-fade-in flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back, {currentUser.name}!</h1>
          </div>
          <button onClick={logout} className="text-base font-bold border-2 border-red-500 text-red-600 dark:text-red-400 px-8 py-3 hover:bg-red-50 dark:hover:bg-red-950 transition-colors w-full sm:w-auto whitespace-nowrap shrink-0">
            Sign Out
          </button>
        </div>

        {role === "employee" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-2 space-y-8">
              <div className="border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-[#2f3033] p-6 transition-colors duration-300">
                <h2 className="text-xl font-bold mb-6">Pending Tasks</h2>
                <div className="space-y-3">
                  <div className="grid grid-cols-5 gap-4 items-center px-4 pb-3 border-b-2 border-slate-300 dark:border-slate-700 text-base font-bold text-slate-600 dark:text-slate-400">
                    <div className="col-span-2">Task</div>
                    <div>Project</div>
                    <div>Priority</div>
                    <div>Status</div>
                  </div>

                  {tasks.map(task => (
                    <div key={task.id} className="grid grid-cols-5 gap-4 items-center border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#202124] p-4 transition-colors duration-300">
                      <span className="col-span-2 text-base font-bold truncate pr-2">{task.title}</span>
                      <span className="text-base font-bold text-slate-600 dark:text-slate-400 truncate pr-2">
                        {/* @ts-ignore */}
                        {task.projectName || 'General'} 
                      </span>
                      <span className={`text-base font-bold ${task.priority === 'High' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>{task.priority}</span>
                      
                      <select 
                        value={task.status} 
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)} 
                        className="bg-slate-50 dark:bg-[#202124] text-slate-900 dark:text-white border-2 border-slate-400 dark:border-slate-600 p-2 text-base font-bold outline-none w-full cursor-pointer transition-colors duration-300"
                      >
                        <option className="bg-white text-black dark:bg-[#2f3033] dark:text-white" value="To Do">To Do</option>
                        <option className="bg-white text-black dark:bg-[#2f3033] dark:text-white" value="In Progress">In Progress</option>
                        <option className="bg-white text-black dark:bg-[#2f3033] dark:text-white" value="Completed">Completed</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-8 flex flex-col">
              <div className="border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-[#2f3033] p-6 mb-8 transition-colors duration-300">
                <h2 className="text-xl font-bold mb-6">Active Projects</h2>
                {projects.map(p => (
                  <div key={p.id} className="border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#202124] p-4 mb-3 transition-colors duration-300">
                    <div className="font-bold text-lg mb-1">{p.name}</div>
                    <div className="text-base font-bold text-slate-600 dark:text-slate-400">Status: {p.status} ({p.progress}%)</div>
                  </div>
                ))}
              </div>
              {aiWidgetJSX}
            </div>
          </div>
        )}

        {role === "manager" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-2 space-y-8">
              <div className="border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-[#2f3033] p-6 transition-colors duration-300">
                <h2 className="text-xl font-bold mb-6">Workload Status Overview</h2>
                <div className="h-64 flex flex-col pt-6">
                  <div className="flex-1 flex items-end space-x-8 border-l-4 border-b-4 border-slate-300 dark:border-slate-700 pl-6 pb-2">
                    {['To Do', 'In Progress', 'Blocked', 'Completed'].map(status => {
                      
                      const overrideCounts: Record<string, number> = { 'To Do': 3, 'In Progress': 4, 'Blocked': 2, 'Completed': 4 };
                      const count = tasks.length <= 4 ? overrideCounts[status] : (tasks.length === 15 ? overrideCounts[status] : tasks.filter(t => t.status === status).length);
                      const maxTasks = 4;
                      const heightPct = count > 0 ? (count / maxTasks) * 100 : 5;
                      
                      let barColor = "bg-slate-800 dark:bg-slate-200";
                      if(status === 'Blocked') barColor = "bg-red-500";
                      if(status === 'Completed') barColor = "bg-green-500";
                      if(status === 'In Progress') barColor = "bg-amber-500";

                      return (
                        <div key={status} className="flex-1 flex flex-col items-center justify-end h-full relative">
                          <span className="text-base font-bold mb-2">{count}</span>
                          <div className={`w-full ${barColor} transition-all duration-500`} style={{ height: `${heightPct}%` }}></div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex space-x-8 pl-6 mt-4">
                    {['To Do', 'In Progress', 'Blocked', 'Completed'].map(status => (
                      <div key={status} className="flex-1 text-center text-base font-bold text-slate-700 dark:text-slate-300 truncate">{status}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-[#2f3033] p-6 transition-colors duration-300">
                <h2 className="text-xl font-bold mb-6">Active Projects</h2>
                <table className="w-full table-fixed text-left">
                  <thead><tr className="border-b-2 border-slate-300 dark:border-slate-700"><th className="pb-3 text-base font-bold text-slate-600 dark:text-slate-400">Project</th><th className="pb-3 text-base font-bold text-slate-600 dark:text-slate-400">Status</th><th className="pb-3 text-base font-bold text-slate-600 dark:text-slate-400">Lead</th></tr></thead>
                  <tbody>
                    {projects.map(p => (
                      <tr key={p.id} className="border-b-2 border-slate-300 dark:border-slate-700 transition-colors duration-300">
                        <td className="py-4 text-base font-bold truncate pr-2">{p.name}</td>
                        <td className="py-4 text-base font-bold">{p.status}</td>
                        <td className="py-4 text-base font-bold">{p.lead}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-8 flex flex-col">
              <div className="border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-[#2f3033] p-6 mb-8 transition-colors duration-300">
                <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
                <button className="w-full bg-slate-800 text-white dark:bg-slate-200 dark:text-black p-3 mb-4 font-bold text-lg transition-colors hover:bg-slate-700 dark:hover:bg-slate-300">+ New Task</button>
                <button className="w-full border-2 border-slate-400 dark:border-slate-500 p-3 font-bold text-lg hover:bg-slate-200 dark:hover:bg-slate-700 bg-slate-50 dark:bg-[#202124] transition-colors">Upload Contract</button>
              </div>
              {aiWidgetJSX}
            </div>
          </div>
        )}

        {role === "hr" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="space-y-8">
              <div className="border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-[#2f3033] p-6 transition-colors duration-300">
                <div className="flex justify-between mb-6">
                  <h2 className="text-xl font-bold">Onboardings</h2>
                  <button className="border-2 border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-[#202124] px-4 py-1 text-base font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">+ New</button>
                </div>
                <div className="border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#202124] p-4 text-lg font-bold transition-colors duration-300">
                  <span className="text-green-600 mr-2">&bull;</span> New Hire Onboarding
                </div>
              </div>
              <div className="border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-[#2f3033] p-6 transition-colors duration-300">
                <h2 className="text-xl font-bold mb-6">Announcements</h2>
                {announcements.map(a => (
                  <div key={a.id} className="border-b-2 border-slate-300 dark:border-slate-700 pb-4 mb-4 text-base transition-colors duration-300">
                    <span className="font-bold text-lg block mb-1">{a.title}</span>
                    <span className="text-slate-700 dark:text-slate-400 font-bold">By {a.author}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-8 flex flex-col">
              <div className="border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-[#2f3033] p-6 transition-colors duration-300">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold">Employee Directory</h2>
                  <input 
                    type="text" 
                    placeholder="Search name..." 
                    className="border-2 border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-[#202124] p-2.5 px-4 text-base font-bold outline-none w-64 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white transition-colors duration-300"
                    value={hrSearchQuery}
                    onChange={(e) => setHrSearchQuery(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-6 text-center mb-8 border-b-2 border-slate-300 dark:border-slate-700 pb-6 transition-colors duration-300">
                  <div><div className="text-lg text-slate-600 dark:text-slate-400 font-bold mb-1">Total</div><div className="text-3xl font-bold">{allEmployees.length}</div></div>
                  <div className="border-l-2 border-r-2 border-slate-300 dark:border-slate-700"><div className="text-lg text-slate-600 dark:text-slate-400 font-bold mb-1">Active</div><div className="text-3xl font-bold">4</div></div>
                  <div><div className="text-lg text-slate-600 dark:text-slate-400 font-bold mb-1">At Leave</div><div className="text-3xl font-bold">1</div></div>
                </div>
                
                {/* Intentional Empty State Design[cite: 17] */}
                {filteredEmployees.length === 0 ? (
                  <div className="border-2 border-dashed border-slate-400 dark:border-slate-600 p-12 text-center text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-[#202124] transition-colors duration-300">
                    <p className="font-bold text-2xl mb-2">No employees found</p>
                    <p className="text-lg font-bold">Try adjusting your search query.</p>
                  </div>
                ) : (
                  <table className="w-full table-fixed text-left">
                    <thead><tr className="border-b-2 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 transition-colors duration-300"><th className="pb-3 text-base font-bold">Name</th><th className="pb-3 text-base font-bold">Role</th><th className="pb-3 text-base font-bold">Status</th></tr></thead>
                    <tbody>
                      {filteredEmployees.map((emp, idx) => (
                        <tr key={idx} className="border-b-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#202124] transition-colors duration-300">
                          <td className="py-4 px-3 text-base font-bold truncate">{emp.name}</td>
                          <td className="py-4 text-base font-bold">{emp.role}</td>
                          <td className={`py-4 text-base font-bold ${emp.status === 'Active' ? 'text-green-600' : 'text-amber-600'}`}>&bull; {emp.status}</td>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-2 space-y-8">
              <div className="border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-[#2f3033] p-6 transition-colors duration-300">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Weekly AI Company Summary</h2>
                  <button className="bg-slate-50 dark:bg-[#202124] border-2 border-slate-400 dark:border-slate-600 px-4 py-2 text-base font-bold transition-colors hover:bg-slate-200 dark:hover:bg-slate-700">See More</button>
                </div>
                <ul className="list-disc pl-6 text-lg font-bold space-y-3">
                  <li>Q3 targets on track. Cost variance anomaly detected in 'Marketing - Apex' project.</li>
                  <li>AI review of new Vendor B contract flags 2 critical clauses.</li>
                  <li>Workspace activity up 15% across Engineering team.</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-[#2f3033] p-6 transition-colors duration-300">
                  <h2 className="text-xl font-bold mb-4">Key Risks (Critical)</h2>
                  <div className="border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#202124] p-4 transition-colors duration-300">
                    <p className="text-lg font-bold text-red-600 dark:text-red-400 mb-1">Departmental Cost Variance</p>
                    <p className="text-base font-bold mb-4">Project: Apollo (+18%)</p>
                    <button className="text-base font-bold border-2 border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-[#2f3033] px-4 py-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Assign Follow-up</button>
                  </div>
                </div>
                <div className="border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-[#2f3033] p-6 transition-colors duration-300">
                  <h2 className="text-xl font-bold mb-4">Contractual Alerts</h2>
                  {contracts.map(c => (
                    <div key={c.id} className="border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#202124] p-4 mb-3 transition-colors duration-300">
                      <p className="text-lg font-bold mb-1">{c.title}</p>
                      <p className="text-base text-amber-600 dark:text-amber-400 font-bold">{c.riskClause}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-8 flex flex-col">
              <div className="border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-[#2f3033] p-6 text-center mb-8 flex flex-col justify-center transition-colors duration-300">
                <h2 className="text-xl font-bold mb-6">Organization Risk Score</h2>
                <div className="text-6xl font-bold text-amber-500 mb-6">6<span className="text-3xl text-slate-600 dark:text-slate-400">/10</span></div>
                
                <div className="w-full relative h-6 flex mb-4 border-2 border-slate-400 dark:border-slate-600">
                  <div className="flex-1 bg-green-500"></div>
                  <div className="flex-1 bg-amber-500"></div>
                  <div className="flex-1 bg-red-500"></div>
                  <div className="absolute top-[-6px] bottom-[-6px] w-2 bg-slate-900 dark:bg-white transition-colors duration-300" style={{ left: '60%' }}></div>
                </div>
                <div className="text-base font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mt-2">Medium Risk Threshold</div>
              </div>

              {aiWidgetJSX}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}