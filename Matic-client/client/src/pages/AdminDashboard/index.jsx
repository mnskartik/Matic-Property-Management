import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-200 hover:bg-blue-500/70 hover:text-white"
    }`;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-blue-700 text-white px-5 py-3 shadow-lg">
        <h2 className="text-lg font-semibold tracking-wide">⚙️ Admin Panel</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md hover:bg-blue-600 transition"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-screen w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white flex flex-col p-6 shadow-xl transform transition-transform duration-300 z-50
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="hidden md:block mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-wide">⚙️ Admin Panel</h2>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          <NavLink
            to="overview"
            className={navLinkClass}
            onClick={() => setIsSidebarOpen(false)}
          >
            <LayoutDashboard size={20} /> Overview
          </NavLink>

          <NavLink
            to="users"
            className={navLinkClass}
            onClick={() => setIsSidebarOpen(false)}
          >
            <Users size={20} /> Manage Users
          </NavLink>

          <NavLink
            to="properties"
            className={navLinkClass}
            onClick={() => setIsSidebarOpen(false)}
          >
            <Building size={20} /> Approve Properties
          </NavLink>

          <NavLink
            to="reports"
            className={navLinkClass}
            onClick={() => setIsSidebarOpen(false)}
          >
            <BarChart3 size={20} /> Reports & Analytics
          </NavLink>
        </nav>

        <button
          onClick={logout}
          className="mt-6 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-2 rounded-md font-medium transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Overlay (for mobile sidebar) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-5 md:p-8 overflow-y-auto bg-gray-100 text-gray-900 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
