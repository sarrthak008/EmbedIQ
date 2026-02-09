import React, { useEffect, useState } from 'react';
import {
  Users, Bot, MessageSquare, Activity,
  Loader2 // Added for the button state
} from 'lucide-react';
import AdminServices from '../../Services/AdminServices';
import TimeFormater from "../../../utils/TimeDateFormater";

// --- SKELETON COMPONENT ---
const DashboardSkeleton = () => (
  <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-pulse">
    {/* Hero Skeleton */}
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="h-16 w-64 bg-gray-200 rounded-lg"></div>
      <div className="h-12 w-48 bg-gray-200 rounded-sm"></div>
    </div>

    {/* Stats Grid Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-32 bg-gray-100 rounded-[1rem] border border-gray-50"></div>
      ))}
    </div>

    {/* Main Content Skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 h-[400px] bg-gray-100 rounded-[1rem]"></div>
      <div className="lg:col-span-4 h-[200px] bg-gray-100 rounded-[1rem]"></div>
    </div>
  </div>
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[1rem] ${className}`}>
    {children}
  </div>
);

const MiniStat = ({ title, value, icon: Icon, trend, colorClass }) => (
  <GlassCard className="p-5 group hover:border-black transition-all duration-300">
    <div className="mt-1">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</p>
      <p className="text-3xl font-black text-gray-900 tracking-tight">{value}</p>
    </div>
  </GlassCard>
);

const AdminDashboard = () => {
  const [dashboardData, setDashbaordData] = useState();
  const [isLoading, setIsLoading] = useState(true); // 1. Loading State

  const loadDashBoardData = async () => {
    // We only show the full-page skeleton on the initial load
    try {
      let data = await AdminServices.getAdminDashboardData();
      if (data.success) {
        setDashbaordData(data?.data?.data);
      }
    } catch (error) {
      console.error("Dashboard Load Error:", error);
    } finally {
      setIsLoading(false); // 2. Stop Loading
    }
  };

  useEffect(() => {
    loadDashBoardData();
  }, []);

  // 3. Conditional Rendering
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* --- HERO SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-6xl font-semibold tracking-[-0.04em] neo">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => loadDashBoardData()} 
            className="bg-black text-white px-6 py-3 rounded-sm font-bold text-sm transition-all shadow-lg shadow-gray-200 flex items-center gap-2 active:scale-95"
          >
            Generate System Report
          </button>
        </div>
      </div>

      {/* --- TOP STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MiniStat title="Total Users" value={dashboardData?.totalUser || 0} icon={Users} />
        <MiniStat title="Active Bots" value={dashboardData?.activeBots || 0} icon={Bot} />
        <MiniStat title="Messages" value={dashboardData?.totalChats || 0} icon={MessageSquare} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --- RECENT ACTIVITY --- */}
        <GlassCard className="lg:col-span-8 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
            <div>
              <h3 className="text-lg font-black text-gray-900">Last 5 Activities</h3>
              <p className="text-xs font-medium font-mono text-green-500">api/admin/states</p>
            </div>
            <Activity size={20} className="text-gray-300" />
          </div>
          <div className="p-2 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">
                  <th className="px-4 py-3">Initiator</th>
                  <th className="px-4 py-3">Operation</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {dashboardData?.recentActivity?.length > 0 ? (
                  dashboardData.recentActivity.map((row, i) => (
                    <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-xl bg-gray-900 text-white flex items-center justify-center text-[10px] font-black">
                            {row?.initiator?.slice(0, 2).toUpperCase() || "SY"}
                          </div>
                          <span className="text-sm font-bold text-gray-700">{row?.initiator}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-500">{row?.operation}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-500 max-w-[200px]">
                        <div className="truncate" title={row?.details}>{row?.details}</div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <p className="text-xs font-bold text-gray-900">
                          {row?.createdAt ? TimeFormater(row.createdAt).relativeTime : "JUST NOW"}
                        </p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-10 text-center text-gray-400 text-sm">No recent logs found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* --- SYSTEM HEALTH --- */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard className="p-6 bg-gradient-to-br from-purple-50 to-white">
            <h4 className="font-black text-gray-900 italic">EmbedIQ Intelligence</h4>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Your AI training queue is empty. System is ready for high-load operations.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;