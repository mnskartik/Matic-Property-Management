import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Home, Building, FileText, CreditCard, User, LogOut } from "lucide-react";

export default function TenantDashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-blue-600/70"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-10 tracking-wide text-center">🏠 Tenant Panel</h2>

        <nav className="space-y-3 flex-1">
          <NavLink to="overview" className={navLinkClass}>
            <Home size={20} /> Dashboard
          </NavLink>

          <NavLink to="properties" className={navLinkClass}>
            <Building size={20} /> Browse Properties
          </NavLink>

          <NavLink to="rentals" className={navLinkClass}>
            <FileText size={20} /> My Rentals
          </NavLink>

          <NavLink to="payments" className={navLinkClass}>
            <CreditCard size={20} /> Payments
          </NavLink>

          <NavLink to="profile" className={navLinkClass}>
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

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
