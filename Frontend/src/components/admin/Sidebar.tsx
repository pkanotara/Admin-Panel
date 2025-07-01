import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <aside role="navigation" aria-label="Admin sidebar" className="w-64 h-screen p-4 bg-gray-100 shadow-xl">
    <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
    <nav className="space-y-2">
      <Link to="/admin/summary" className="block text-gray-700 hover:text-black">Summary</Link>
      <Link to="/admin/foods" className="block text-gray-700 hover:text-black">Food Management</Link>
      <Link to="/admin/users" className="block text-gray-700 hover:text-black">User Management</Link>
    </nav>
  </aside>
);

export default Sidebar;
