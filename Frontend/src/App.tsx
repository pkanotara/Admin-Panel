// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Sidebar from "./components/admin/Sidebar";
// import AdminSummary from "./pages/admin/AdminSummary";
// import FoodManagement from "./pages/admin/FoodManagement";
// import UserManagement from "./pages/admin/UserManagement";
// import ContactForm from "./pages/public/ContactForm";
// import Reviews from "./pages/public/Reviews";
// import AdminLogin from "./pages/admin/AdminLogin";

// const AdminLayout = ({ children }: { children: React.ReactNode }) => (
//   <div className="flex">
//     <Sidebar />
//     <div className="flex-1 p-4">{children}</div>
//   </div>
// );

// const App = () => (
//   <Routes>
//     {/* Public Pages */}

//     {/* Admin Pages with Sidebar */}
//     <Route
//       path="/admin/summary"
//       element={
//         <AdminLayout>
//           <AdminSummary />
//         </AdminLayout>
//       }
//     />
//     <Route
//       path="/admin/foods"
//       element={
//         <AdminLayout>
//           <FoodManagement />
//         </AdminLayout>
//       }
//     />
//     <Route
//       path="/admin/users"
//       element={
//         <AdminLayout>
//           <UserManagement />
//         </AdminLayout>
//       }
//     />
//   </Routes>
// );

// export default App;


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/admin/Sidebar";
import AdminSummary from "./pages/admin/AdminSummary";
import FoodManagement from "./pages/admin/FoodManagement";
import UserManagement from "./pages/admin/UserManagement";

// You probably forgot this
const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 p-4">{children}</div>
  </div>
);

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/admin/summary" />} />
    <Route
      path="/admin/summary"
      element={
        <AdminLayout>
          <AdminSummary />
        </AdminLayout>
      }
    />
    <Route
      path="/admin/foods"
      element={
        <AdminLayout>
          <FoodManagement />
        </AdminLayout>
      }
    />
    <Route
      path="/admin/users"
      element={
        <AdminLayout>
          <UserManagement />
        </AdminLayout>
      }
    />
    <Route path="*" element={<div className="p-4 text-red-500">404 Page Not Found</div>} />
  </Routes>
);

export default App;
