import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  Building,
  FileText,
  CreditCard,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function TenantDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-blue-600/70"
    }`;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 relative">
      {/* Top bar (mobile only) */}
      <div className="md:hidden flex items-center justify-between bg-blue-700 text-white px-4 py-3 shadow-lg">
        <h2 className="text-xl font-semibold">🏠 Tenant Panel</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded hover:bg-blue-600 transition"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-full md:h-screen w-64 bg-blue-700 text-white flex flex-col p-6 shadow-lg transform transition-transform duration-300 z-50
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="hidden md:block text-2xl font-bold mb-10 tracking-wide text-center">
          🏠 Tenant Panel
        </h2>

        <nav className="space-y-3 flex-1">
          <NavLink
            to="overview"
            className={navLinkClass}
            onClick={() => setIsSidebarOpen(false)}
          >
            <Home size={20} /> Dashboard
          </NavLink>

          <NavLink
            to="properties"
            className={navLinkClass}
            onClick={() => setIsSidebarOpen(false)}
          >
            <Building size={20} /> Browse Properties
          </NavLink>

          <NavLink
            to="rentals"
            className={navLinkClass}
            onClick={() => setIsSidebarOpen(false)}
          >
            <FileText size={20} /> My Rentals
          </NavLink>

          <NavLink
            to="payments"
            className={navLinkClass}
            onClick={() => setIsSidebarOpen(false)}
          >
            <CreditCard size={20} /> Payments
          </NavLink>

          <NavLink
            to="profile"
            className={navLinkClass}
            onClick={() => setIsSidebarOpen(false)}
          >
            <User size={20} /> Profile
          </NavLink>
        </nav>

        <button
          onClick={logout}
          className="mt-6 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-2 rounded-md text-white font-medium transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
