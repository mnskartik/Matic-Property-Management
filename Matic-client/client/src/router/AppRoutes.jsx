import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

import TenantDashboard from "../pages/TenantDashboard";
import AgentDashboard from "../pages/AgentDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Auth/Login";
import Landing from "../pages/Landing";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />

    <Route
      path="/tenant/*"
      element={
        <ProtectedRoute role="tenant">
          <TenantDashboard />
        </ProtectedRoute>
      }

    >
  <Route path="dashboard" element={<Overview />} />
  <Route path="rentals" element={<MyRentals />} />
  <Route path="payments" element={<Payments />} />
  <Route path="profile" element={<Profile />} />
    </Route>

    <Route
      path="/agent/*"
      element={
        <ProtectedRoute role="agent">
          <AgentDashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/admin/*"
      element={
        <ProtectedRoute role="admin">
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
