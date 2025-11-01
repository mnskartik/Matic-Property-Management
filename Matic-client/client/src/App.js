import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import TenantDashboard from "./pages/TenantDashboard";
import Overview from "./pages/TenantDashboard/Overview";
import MyRentals from "./pages/TenantDashboard/MyRentals";
import Payments from "./pages/TenantDashboard/Payments";
import Profile from "./pages/TenantDashboard/Profile";
import PropertyList from "./pages/TenantDashboard/PropertyList";
import AgentDashboard from "./pages/AgentDashboard";
import AgentOverview from "./pages/AgentDashboard/Overview";
import MyProperties from "./pages/AgentDashboard/MyProperties";
import Leads from "./pages/AgentDashboard/Leads";
import AgentProfile from "./pages/AgentDashboard/Profile";
import Rentals from "./pages/AgentDashboard/Rentals";

import AdminDashboard from "./pages/AdminDashboard";
import AdminOverview from "./pages/AdminDashboard/Overview";

import Reports from "./pages/AdminDashboard/Report";
import ManageUsers from "./pages/AdminDashboard/Users";
import ManageProperties from "./pages/AdminDashboard/Properties";


function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode token to get role (you can use jwt-decode)
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setRole(decoded.role);
    }
  }, []);

  // Protect dashboard routes
  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!role) return <Navigate to="/login" replace />;
    if (role !== allowedRole) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Tenant Dashboard */}
        <Route
          path="/tenant/dashboard"
          element={
            <ProtectedRoute allowedRole="tenant">
              <TenantDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="overview" element={<Overview />} />
          <Route path="rentals" element={<MyRentals />} />
          <Route path="payments" element={<Payments />} />
          <Route path="properties" element={<PropertyList />} />
          <Route path="profile" element={<Profile />} />
          <Route index element={<Navigate to="overview" replace />} />
        </Route>

        {/* Agent Dashboard */}
        <Route
          path="/agent/dashboard"
          element={
            <ProtectedRoute allowedRole="agent">
              <AgentDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="overview" element={<AgentOverview />} />
          <Route path="properties" element={<MyProperties />} />
          <Route path="leads" element={<Leads />} />
          <Route path="profile" element={<AgentProfile />} />
          <Route path="rentals" element={<Rentals />} />
          <Route index element={<Navigate to="overview" replace />} />
        </Route>



        {/* Admin Dashboard */}
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
>
  <Route path="overview" element={<AdminOverview />} />
  <Route path="users" element={<ManageUsers />} />
  <Route path="properties" element={<ManageProperties />} />
  <Route path="reports" element={<Reports />} />
  <Route index element={<Navigate to="overview" replace />} />
</Route>


        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
export default App;
