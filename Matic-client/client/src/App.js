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
//import AgentDashboard from "./components/Dashboard/AgentDashboard";
//import AdminDashboard from "./components/Dashboard/AdminDashboard";

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
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboards */}
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
  <Route path="profile" element={<Profile />} />
  <Route index element={<Navigate to="overview" replace />} />
</Route>
      
       
      </Routes>
    </Router>
  );
}

export default App;
