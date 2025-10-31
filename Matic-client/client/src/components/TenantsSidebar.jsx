import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FileText, CreditCard, User, Menu, X } from "lucide-react";

const TenantSidebar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/tenant/dashboard", label: "Overview", icon: <Home size={18} /> },
    { to: "/tenant/rentals", label: "My Rentals", icon: <FileText size={18} /> },
    { to: "/tenant/payments", label: "Payments", icon: <CreditCard size={18} /> },
    { to: "/tenant/profile", label: "Profile", icon: <User size={18} /> },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow-sm z-50 flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-blue-600">Tenant Panel</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg p-5 z-40 transform transition-transform duration-300 ease-in-out
        w-64 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:static md:block`}
      >
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold text-blue-600 mb-8">Tenant Panel</h1>
        </div>

        <nav className="space-y-2 mt-16 md:mt-0">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 p-2 rounded-lg transition ${
                pathname === link.to
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {link.icon}
              <span className="text-sm md:text-base">{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default TenantSidebar;
