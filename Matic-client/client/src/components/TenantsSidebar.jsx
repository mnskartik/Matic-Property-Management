import { Link, useLocation } from "react-router-dom";
import { Home, FileText, CreditCard, User } from "lucide-react";

const TenantSidebar = () => {
  const { pathname } = useLocation();

  const links = [
    { to: "/tenant/dashboard", label: "Overview", icon: <Home size={18} /> },
    { to: "/tenant/rentals", label: "My Rentals", icon: <FileText size={18} /> },
    { to: "/tenant/payments", label: "Payments", icon: <CreditCard size={18} /> },
    { to: "/tenant/profile", label: "Profile", icon: <User size={18} /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 p-5">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">Tenant Panel</h1>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 p-2 rounded-lg transition ${
              pathname === link.to
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default TenantSidebar;
