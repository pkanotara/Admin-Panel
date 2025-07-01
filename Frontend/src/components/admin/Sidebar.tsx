import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Pizza, Users, Utensils, LogOut } from "lucide-react";


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const menuItems = [
    { path: "/admin/summary", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: "/admin/foods", label: "Foods", icon: <Pizza className="w-5 h-5" /> },
    { path: "/admin/users", label: "Users", icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <aside
      className="w-64 h-screen bg-[#C7E3E1] text-gray-800 shadow-lg flex flex-col justify-between fixed left-0 top-0"
      role="navigation"
      aria-label="Admin sidebar"
    >
    
      <div className="p-5">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <Utensils className="w-5 h-5" />
          Admin Panel
        </h2>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all ${location.pathname === item.path
                  ? "bg-white text-gray-900 shadow"
                  : "hover:bg-white/70 text-gray-700"
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      
      <div className="p-5 border-t border-white/30">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
