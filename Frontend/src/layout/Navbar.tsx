// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Shield,
//   User,
//   Menu,
//   X,
//   ChevronDown,
//   Bell,
//   Settings,
//   FileText,
//   Users,
//   BarChart3,
//   MessageSquare,
//   Upload,
//   HelpCircle
// } from 'lucide-react';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

//   const toggleDropdown = (dropdown: string | null) => {
//     setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
//   };

//   const closeDropdowns = () => {
//     setActiveDropdown(null);
//   };

//   const handleNavClick = (path: string) => {
//     navigate(path);
//     closeDropdowns();
//     setIsMobileMenuOpen(false);
//   };
//   type NavLinkProps = {
//     to: string;
//     children: React.ReactNode;
//     className?: string;
//   };
//   const NavLink: React.FC<NavLinkProps> = ({ to, children, className = "" }) => (
//     <button
//       onClick={() => handleNavClick(to)}
//       className={`text-left ${className}`}
//     >
//       {children}
//     </button>
//   );

//   return (
//     <nav className="bg-white/1 dark:bg-gray-900/20 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <NavLink to="/dashboard" className="flex items-center space-x-2 group">
//               <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
//                 <Shield className="h-6 w-6 text-white" />
//               </div>
//               <span className="text-xl font-bold text-gray-900 dark:text-white">InsurePro</span>
//             </NavLink>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-1">
//             {/* Dashboard */}
//             <NavLink
//               to="/dashboard"
//               className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 font-medium"
//             >
//               Dashboard
//             </NavLink>

//             {/* Policies Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => toggleDropdown('policies')}
//                 className="flex items-center px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 font-medium"
//               >
//                 <FileText className="h-4 w-4 mr-1" />
//                 Policies
//                 <ChevronDown className="h-4 w-4 ml-1" />
//               </button>
//               {activeDropdown === 'policies' && (
//                 <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
//                   <NavLink to="/policies" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full">
//                     View All Policies
//                   </NavLink>
//                   <NavLink to="/policy-detail" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full">
//                     Policy Details
//                   </NavLink>
//                   <NavLink to="/cancel-flow" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full">
//                     Cancel Policy
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             {/* Claims Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => toggleDropdown('claims')}
//                 className="flex items-center px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 font-medium"
//               >
//                 Claims
//                 <ChevronDown className="h-4 w-4 ml-1" />
//               </button>
//               {activeDropdown === 'claims' && (
//                 <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
//                   <NavLink to="/submit-claim" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full">
//                     Submit New Claim
//                   </NavLink>
//                   <NavLink to="/claim-form" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full">
//                     Claim Form
//                   </NavLink>
//                   <NavLink to="/view-claims" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full">
//                     View All Claims
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             {/* Tools Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => toggleDropdown('tools')}
//                 className="flex items-center px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 font-medium"
//               >
//                 <Settings className="h-4 w-4 mr-1" />
//                 Tools
//                 <ChevronDown className="h-4 w-4 ml-1" />
//               </button>
//               {activeDropdown === 'tools' && (
//                 <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
//                   <NavLink to="/chart" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full">
//                     <BarChart3 className="h-4 w-4 mr-2" />
//                     Analytics
//                   </NavLink>
//                   <NavLink to="/upload" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full">
//                     <Upload className="h-4 w-4 mr-2" />
//                     Upload Documents
//                   </NavLink>
//                   <NavLink to="/carousel" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full">
//                     Document Gallery
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             {/* Admin Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => toggleDropdown('admin')}
//                 className="flex items-center px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 font-medium"
//               >
//                 <Users className="h-4 w-4 mr-1" />
//                 Admin
//                 <ChevronDown className="h-4 w-4 ml-1" />
//               </button>
//               {activeDropdown === 'admin' && (
//                 <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
//                   <NavLink to="/admin-dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full">
//                     Admin Dashboard
//                   </NavLink>
//                   <NavLink to="/agent-dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full">
//                     Agent Dashboard
//                   </NavLink>
//                   <NavLink to="/agent-profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full">
//                     Agent Profiles
//                   </NavLink>
//                   <NavLink to="/cancel-policy" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full">
//                     Policy Management
//                   </NavLink>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Side - Icons and User */}
//           <div className="flex items-center space-x-4">
//             {/* Messages */}
//             <NavLink
//               to="/messages"
//               className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
//             >
//               <MessageSquare className="h-5 w-5" />
//             </NavLink>

//             {/* Notifications */}
//             <NavLink
//               to="/notifications"
//               className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 relative"
//             >
//               <Bell className="h-5 w-5" />
//               <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
//             </NavLink>

//             {/* FAQ */}
//             <NavLink
//               to="/faq"
//               className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
//             >
//               <HelpCircle className="h-5 w-5" />
//             </NavLink>

//             {/* User Menu */}
//             <div className="relative">
//               <button
//                 onClick={() => toggleDropdown('user')}
//                 className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
//               >
//                 <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                   <User className="h-5 w-5 text-white" />
//                 </div>
//                 <ChevronDown className="h-4 w-4" />
//               </button>
//               {activeDropdown === 'user' && (
//                 <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
//                   <NavLink to="/login" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full">
//                     Login
//                   </NavLink>
//                   <NavLink to="/signup" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full">
//                     Sign Up
//                   </NavLink>
//                   <hr className="my-2 border-gray-200 dark:border-gray-600" />
//                   <button
//                     onClick={() => handleNavClick('/logout')}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600"
//                   >
//                     Sign Out
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//             >
//               {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="lg:hidden border-t border-gray-200 dark:border-gray-700">
//             <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 dark:bg-gray-800/50">
//               <NavLink to="/dashboard" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors w-full">
//                 Dashboard
//               </NavLink>

//               <div className="space-y-1">
//                 <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Policies
//                 </div>
//                 <NavLink to="/policies" className="block px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-white dark:hover:bg-gray-700 rounded-md w-full">
//                   View Policies
//                 </NavLink>
//                 <NavLink to="/policy-detail" className="block px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-white dark:hover:bg-gray-700 rounded-md w-full">
//                   Policy Details
//                 </NavLink>
//                 <NavLink to="/cancel-flow" className="block px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-white dark:hover:bg-gray-700 rounded-md w-full">
//                   Cancel Policy
//                 </NavLink>
//               </div>

//               <div className="space-y-1">
//                 <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Claims
//                 </div>
//                 <NavLink to="/submit-claim" className="block px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-white dark:hover:bg-gray-700 rounded-md w-full">
//                   Submit Claim
//                 </NavLink>
//                 <NavLink to="/claim-form" className="block px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-white dark:hover:bg-gray-700 rounded-md w-full">
//                   Claim Form
//                 </NavLink>
//                 <NavLink to="/view-claims" className="block px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-white dark:hover:bg-gray-700 rounded-md w-full">
//                   View Claims
//                 </NavLink>
//               </div>

//               <div className="space-y-1">
//                 <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Admin
//                 </div>
//                 <NavLink to="/admin-dashboard" className="block px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-white dark:hover:bg-gray-700 rounded-md w-full">
//                   Admin Dashboard
//                 </NavLink>
//                 <NavLink to="/agent-dashboard" className="block px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-white dark:hover:bg-gray-700 rounded-md w-full">
//                   Agent Dashboard
//                 </NavLink>
//                 <NavLink to="/agent-profile" className="block px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-white dark:hover:bg-gray-700 rounded-md w-full">
//                   Agent Profile
//                 </NavLink>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Backdrop for mobile dropdowns */}
//       {(activeDropdown || isMobileMenuOpen) && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-25 z-40"
//           onClick={() => {
//             setActiveDropdown(null);
//             setIsMobileMenuOpen(false);
//           }}
//         />
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  User,
  Menu,
  X,
  ChevronDown,
  Bell,
  Settings,
  FileText,
  Users,
  BarChart3,
  MessageSquare,
  Upload,
  HelpCircle
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string | null) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    closeDropdowns();
    setIsMobileMenuOpen(false);
  };

  type NavLinkProps = {
    to: string;
    children: React.ReactNode;
    className?: string;
  };

  const NavLink: React.FC<NavLinkProps> = ({ to, children, className = "" }) => (
    <button
      onClick={() => handleNavClick(to)}
      className={`text-left ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[92%] max-w-5xl rounded-3xl bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg shadow-lg border border-white/20">

      <nav className="flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <div className="flex items-center">
          <NavLink to="/summery" className="flex items-center space-x-2 group">
            <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">InsurePro</span>
          </NavLink>
        </div>

        {/* Right Side - Icons and User */}
        <div className="flex items-center space-x-4">
          <NavLink to="/messages" className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200">
            <MessageSquare className="h-5 w-5" />
          </NavLink>
          <NavLink to="/notifications" className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </NavLink>
          <NavLink to="/faq" className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200">
            <HelpCircle className="h-5 w-5" />
          </NavLink>
          <div className="relative">
            <button onClick={() => toggleDropdown('user')} className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === 'user' && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                <NavLink to="/login" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full">
                  Login
                </NavLink>
                <NavLink to="/signup" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full">
                  Sign Up
                </NavLink>
                <hr className="my-2 border-gray-200 dark:border-gray-600" />
                <button onClick={() => handleNavClick('/logout')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
