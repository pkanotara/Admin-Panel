import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/admin/Sidebar";
import Navbar from "./layout/Navbar"; // ✅ Make sure this path is correct
import AdminSummary from "./pages/admin/AdminSummary";
import FoodManagement from "./pages/admin/FoodManagement";
import UserManagement from "./pages/admin/UserManagement";
import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedRoute from "./components/common/ProtectedRoute";

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    {/* Sticky top navbar */}
    <div className="fixed top-0 left-0 right-0 z-50">
      <Navbar />
    </div>

    {/* Main content starts below the navbar */}
    <div className="flex flex-1 pt-16">
      {/* Sidebar with fixed width */}
      <div className="w-64 fixed top-16 bottom-0 left-0 z-40">
        <Sidebar />
      </div>

      {/* Content area, with left margin to avoid overlap */}
      <main className="ml-64 flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
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
