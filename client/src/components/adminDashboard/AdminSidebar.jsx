import React, { useEffect, useState } from "react";
import { 
  Menu, 
  Users, 
  Bot, 
  BarChart3, 
  FileSearch, 
  LogOut, 
  RefreshCcw, 
  LayoutDashboard,
  ShieldCheck 
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import LogOutComp from "../userDashbord/LogOut"; 

const FooterItem = ({ icon, label, open=true, onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 rounded-lg
      text-gray-600 hover:bg-gray-200 cursor-pointer text-sm transition-colors"
    >
      {icon}
      {open && <span className="truncate">{label}</span>}
    </div>
  );
};

const AdminSidebar = ({ open, setOpen, activeView, setActiveView }) => {
  const [refresh, setRefresh] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  // Get admin data from Redux
  const user = useSelector((state) => state.auth.user);
  const email = user?.email || "admin@embediq.in";
  const role = user?.role || "Administrator";

  const handleRefresh = () => {
    setRefresh(true);
    // Logic to refresh admin lists (users/bots) would go here
    setTimeout(() => setRefresh(false), 1000);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#f6f8faf5] border-r
      flex flex-col transition-all duration-300 ease-in-out z-40
      ${open ? "w-[260px]" : "w-[72px]"}`}
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 px-4 py-4">
        <Menu size={20} className="cursor-pointer" onClick={() => setOpen(!open)} />
        {open && (
            <div className="flex flex-col">
                <span className="text-3xl font-bold tracking-tight neo">EmbedIQ</span>
                <span className="text-[10px] text-red-500 font-bold tracking-widest uppercase">Admin Panel</span>
            </div>
        )}
      </div>

      {/* DASHBOARD BUTTON (Replacement for New Bot) */}
      <div className="px-3 mb-3">
        <button
          className={`w-full cursor-pointer flex items-center gap-2 px-3 py-2 rounded-sm
          bg-black text-white text-sm font-medium justify-center hover:bg-gray-800 transition-colors
          ${activeView === "DASHBOARD" ? "ring-2 ring-gray-400 ring-offset-2" : ""}`}
          onClick={() => setActiveView("DASHBOARD")}
        >
          <LayoutDashboard size={16} />
          {open && "Dashboard"}
        </button>
      </div>

      {/* ADMIN CONTROLS LIST */}
      <div className="flex-1 overflow-y-auto px-2">
        {open && (
          <p className="text-xs uppercase px-2 mb-2 flex items-center justify-between">
            <span className="text-gray-400 font-bold">Management</span>
            <span 
              onClick={handleRefresh} 
              className={`cursor-pointer ${refresh ? "animate-spin" : ""}`}
            >
              <RefreshCcw size={12} />
            </span>
          </p>
        )}

        <div className="space-y-1">
            <div
                onClick={() => setActiveView("USERS")}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors
                ${activeView === "USERS" ? "bg-gray-200 text-black font-bold" : "text-gray-700 hover:bg-gray-200"}`}
            >
                <Users size={16} />
                {open && <span className="truncate">User Directory</span>}
            </div>

            <div
                onClick={() => setActiveView("BOTS")}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors
                ${activeView === "BOTS" ? "bg-gray-200 text-black font-bold" : "text-gray-700 hover:bg-gray-200"}`}
            >
                <Bot size={16} />
                {open && <span className="truncate">Global Bots</span>}
            </div>

            {/* <div
                onClick={() => setActiveView("REPORTS")}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors
                ${activeView === "REPORTS" ? "bg-gray-200 text-black font-bold" : "text-gray-700 hover:bg-gray-200"}`}
            >
                <FileSearch size={16} />
                {open && <span className="truncate">Audit Reports</span>}
            </div> */}
        </div>
      </div>

      {/* SYSTEM STATUS SECTION (Replacement for Plan Section) */}
      <div className="px-3 py-3 border-t">
        {open && (
          <>
            <p className="text-xs text-gray-400 mb-1">System Health</p>
            <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-sm font-medium uppercase tracking-tighter">Operational</p>
            </div>
            
            <button
              className="mt-2 w-full h-[40px] rounded-sm bg-gray-100 text-gray-600 border border-gray-200 text-xs font-semibold hover:bg-gray-200 transition"
            >
              Admin
            </button>
          </>
        )}
      </div>

      {/* FOOTER */}
      <div className="relative border-t px-3 py-3 space-y-1">
        <FooterItem 
          icon={<LogOut size={16} />} 
          label="Logout" 
          open={open} 
          onClick={() => setIsLogout(!isLogout)} 
        />

        {/* LOGOUT POPUP */}
        {isLogout && (
          <LogOutComp 
            email={email} 
            role={role} 
            onClose={() => setIsLogout(false)} 
          />
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;