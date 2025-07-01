import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/admin/Sidebar";
import AdminSummary from "./pages/admin/AdminSummary";
import FoodManagement from "./pages/admin/FoodManagement";
import UserManagement from "./pages/admin/UserManagement";
import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedRoute from "./components/common/ProtectedRoute";

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex">
    {/* Sidebar is fixed, so no need to include it inside the scrollable area */}
    <Sidebar />
    <main className="ml-64 flex-1 p-6 bg-gray-100 min-h-screen">
      {children}
    </main>
  </div>
);

const App = () => {
  return (
    <Routes>
      {/* Redirect root to admin login */}
      <Route path="/" element={<Navigate to="/admin/login" />} />

      {/* Admin Login Page */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Protected Pages */}
      <Route
        path="/admin/summary"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminSummary />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/foods"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <FoodManagement />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <UserManagement />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch-all for unknown routes */}
      <Route path="*" element={<div className="p-4 text-red-500">404 Page Not Found</div>} />
    </Routes>
  );
};

export default App;
