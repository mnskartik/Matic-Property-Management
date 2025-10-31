import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Home, Building, Users, User, LogOut, Menu, X } from "lucide-react";

export default function AgentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Header */}
      <header className="flex items-center justify-between bg-blue-700 text-white p-4 md:hidden">
        <h2 className="text-xl font-bold">Agent Panel</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen md:h-auto md:min-h-screen w-64 bg-blue-700 text-white p-6 flex flex-col transform transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-8 hidden md:block">Agent Panel</h2>

        <nav className="space-y-4 flex flex-col items-start flex-grow">
          <NavLink
            to="overview"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-600 hover:text-white"
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <Home /> Dashboard
          </NavLink>

          <NavLink
            to="properties"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-600 hover:text-white"
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <Building /> My Properties
          </NavLink>

          <NavLink
            to="leads"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-600 hover:text-white"
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <Users /> Leads
          </NavLink>

          <NavLink
            to="profile"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-600 hover:text-white"
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <User /> Profile
          </NavLink>
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-2 text-red-300 hover:text-red-400 p-2"
        >
          <LogOut /> Logout
        </button>
      </aside>

      {/* Overlay (for mobile sidebar) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto h-full">
        <Outlet />
      </main>
    </div>
  );
}
