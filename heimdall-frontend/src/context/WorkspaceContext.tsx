"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import initialData from "@/data/mockData.json";

export type Role = "employee" | "manager" | "hr" | "executive";
export type Theme = "light" | "dark";

interface WorkspaceContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isAuthenticated: boolean;
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
  setRole: (role: Role) => void;
  currentUser: typeof initialData.users[0];
  tasks: typeof initialData.tasks;
  contracts: typeof initialData.contracts;
  projects: typeof initialData.projects;
  announcements: typeof initialData.announcements;
  updateTaskStatus: (taskId: string, newStatus: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<Role>("employee"); 
  const [tasks, setTasks] = useState(initialData.tasks);
  const [contracts, setContracts] = useState(initialData.contracts);
  const [projects] = useState(initialData.projects);
  const [announcements] = useState(initialData.announcements);

  const currentUser = initialData.users.find(u => u.role === role) || initialData.users[0];

  useEffect(() => {
    const saved = localStorage.getItem("heimdall_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.contracts) setContracts(parsed.contracts);
        if (parsed.role) setRole(parsed.role);
        if (parsed.isAuthenticated) setIsAuthenticated(parsed.isAuthenticated);
        if (parsed.theme) setThemeState(parsed.theme);
      } catch (e) {
        console.error("Local storage sync error", e);
      }
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  // Fix 11: Explicit setTheme function to support dual buttons
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("heimdall_state", JSON.stringify({ tasks, contracts, role, isAuthenticated, theme: newTheme }));
  };

  const login = (selectedRole: Role) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
    localStorage.setItem("heimdall_state", JSON.stringify({ tasks, contracts, role: selectedRole, isAuthenticated: true, theme }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("heimdall_state", JSON.stringify({ tasks, contracts, role, isAuthenticated: false, theme }));
  };

  const updateTaskStatus = (taskId: string, newStatus: string) => {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t));
      localStorage.setItem("heimdall_state", JSON.stringify({ tasks: updated, contracts, role, isAuthenticated, theme }));
      return updated;
    });
  };

  return (
    <WorkspaceContext.Provider
      value={{ theme, setTheme, isAuthenticated, role, login, logout, setRole, currentUser, tasks, contracts, projects, announcements, updateTaskStatus }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return context;
};