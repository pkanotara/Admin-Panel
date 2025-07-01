import React, { useState, useEffect } from "react";
// import Navbar from "../components/common/Navbar";
import { 
  Users, 
  ShoppingCart, 
  UtensilsCrossed, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Star,
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";

const AdminSummary = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    users: 0,
    orders: 0,
    foods: 0,
    revenue: 0
  });

  // Animate counters on mount
  useEffect(() => {
    const targets = { users: 120, orders: 80, foods: 45, revenue: 24500 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let current = { users: 0, orders: 0, foods: 0, revenue: 0 };
    
    const timer = setInterval(() => {
      current.users = Math.min(current.users + targets.users / steps, targets.users);
      current.orders = Math.min(current.orders + targets.orders / steps, targets.orders);
      current.foods = Math.min(current.foods + targets.foods / steps, targets.foods);
      current.revenue = Math.min(current.revenue + targets.revenue / steps, targets.revenue);
      
      setAnimatedValues({ ...current });
      
      if (current.users >= targets.users) {
        clearInterval(timer);
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const metrics = [
    {
      key: "users",
      title: "Total Users",
      value: Math.floor(animatedValues.users),
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      details: "New registrations this week: 8"
    },
    {
      key: "orders",
      title: "Total Orders",
      value: Math.floor(animatedValues.orders),
      change: "+8.3%",
      trend: "up",
      icon: ShoppingCart,
      color: "from-emerald-500 to-green-500",
      bgColor: "from-emerald-50 to-green-50",
      details: "Average order value: $42.50"
    },
    {
      key: "foods",
      title: "Active Foods",
      value: Math.floor(animatedValues.foods),
      change: "-2.1%",
      trend: "down",
      icon: UtensilsCrossed,
      color: "from-orange-500 to-amber-500",
      bgColor: "from-orange-50 to-amber-50",
      details: "Most popular: Truffle Pasta"
    },
    {
      key: "revenue",
      title: "Revenue",
      value: `$${Math.floor(animatedValues.revenue).toLocaleString()}`,
      change: "+15.7%",
      trend: "up",
      icon: DollarSign,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      details: "Monthly target: 85% achieved"
    }
  ];

  const recentActivity = [
    { type: "order", message: "New order #1234 - $67.50", time: "2 min ago", status: "success" },
    { type: "user", message: "John Doe registered", time: "5 min ago", status: "info" },
    { type: "food", message: "Caesar Salad updated", time: "12 min ago", status: "warning" },
    { type: "order", message: "Order #1233 completed", time: "18 min ago", status: "success" }
  ];

  const topPerformers = [
    { name: "Truffle Carbonara", orders: 24, revenue: "$1,080", rating: 4.9 },
    { name: "Wagyu Steak", orders: 18, revenue: "$1,440", rating: 4.8 },
    { name: "Lobster Bisque", orders: 15, revenue: "$675", rating: 4.7 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 text-lg">Welcome back! Here's what's happening with your restaurant.</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={metric.title}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                  metric.trend === 'up' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-gray-500 text-sm font-medium mb-1">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-800">{metric.value}</p>
              </div>
              
              <p className="text-gray-600 text-sm">{metric.details}</p>
              
              <div className="mt-4">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${metric.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${Math.min((Math.floor(animatedValues[metric.key as keyof typeof animatedValues] / 150) * 100), 100)}%` }} 
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Activity className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
              </div>
              <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">View All</button>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{activity.message}</p>
                    <p className="text-gray-500 text-sm">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-bold text-gray-800">Quick Stats</h2>
            </div>
            
            <div className="space-y-6">
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">4.2min</p>
                <p className="text-gray-600 text-sm">Avg. Order Time</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                <Star className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">4.8</p>
                <p className="text-gray-600 text-sm">Customer Rating</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl">
                <PieChart className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">92%</p>
                <p className="text-gray-600 text-sm">Order Success Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-bold text-gray-800">Top Performing Dishes</h2>
            </div>
            <button className="text-green-500 hover:text-green-600 text-sm font-medium">View Full Report</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Dish Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Orders</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Revenue</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                </tr>
              </thead>
              <tbody>
                {topPerformers.map((dish, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-800">{dish.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{dish.orders}</td>
                    <td className="py-4 px-4 font-semibold text-green-600">{dish.revenue}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-gray-700 font-medium">{dish.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;