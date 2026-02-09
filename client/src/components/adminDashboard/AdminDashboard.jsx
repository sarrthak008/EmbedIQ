import React, { useEffect, useState } from 'react';
import {
  Users, Bot, MessageSquare, Activity,
  Zap, ArrowUpRight, ShieldCheck,
  Cpu, Database, HardDrive, Globe
} from 'lucide-react';
import AdminServices from '../../Services/AdminServices';
import TimeFormater from "../../../utils/TimeDateFormater"

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

  const [dashboardData, setDashbaordData] = useState()

  const loadDashBoardData = async () => {
    let data = await AdminServices.getAdminDashboardData();
    if (data.success) {
      setDashbaordData(data?.data?.data)
    }
  }




  useEffect(() => {
    loadDashBoardData();
  }, []);

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* --- HERO SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-6xl font-semibold tracking-[-0.04em] neo">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            {/* <p className="text-[10px] font-bold text-gray-400 uppercase">Last Sync</p> */}
            {/* <p className="text-xs font-black text-gray-900">12:42:01 PM</p> */}
          </div>
          <button onClick={()=>loadDashBoardData()} className="bg-black text-white px-6 py-3 rounded-sm font-bold text-sm transition-all shadow-lg shadow-gray-200">
            Generate System Report
          </button>
        </div>
      </div>

      {/* --- TOP STATS (BENTO GRID STYLE) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MiniStat title="Total Users" value={dashboardData?.totalUser || 0} icon={Users} trend="12%" colorClass="bg-blue-600" />
        <MiniStat title="Active Bots" value={dashboardData?.activeBots || 0} icon={Bot} trend="5%" colorClass="bg-purple-600" />
        <MiniStat title="Messages" value={dashboardData?.totalChats || 0} icon={MessageSquare} trend="18%" colorClass="bg-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* --- RECENT ACTIVITY (LEFT SIDE - 8 COLS) --- */}
        <GlassCard className="lg:col-span-8 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
            <div>
              <h3 className="text-lg font-black text-gray-900">Last 5 Activities</h3>
              <p className="text-xs  font-medium font-mono text-green-300">api/admin/states</p>
            </div>
            <Activity size={20} className="text-gray-300" />
          </div>
          <div className="p-2">
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
                {dashboardData?.recentActivity?.map((row, i) => (
                  <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-gray-900 text-white flex items-center justify-center text-[10px] font-black">
                          {row?.initiator?.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm font-bold text-gray-700">{row?.initiator}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-500">{row?.operation}</td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-500 w-[100px] block">
                      <marquee>{row?.details}</marquee>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <p className="text-xs font-bold text-gray-900">
                        {row?.createdAt ? TimeFormater(row.createdAt).relativeTime : "SYNCING..."}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* --- SYSTEM HEALTH (RIGHT SIDE - 4 COLS) --- */}
        <div className="lg:col-span-4 space-y-6">


          {/* Quick Support / Docs Card */}
          <GlassCard className="p-6 bg-gradient-to-br from-purple-50 to-white">
            <h4 className="font-black text-gray-900 italic">EmbedIQ Intelligence</h4>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Your AI training queue is empty. System is ready for high-load operations.
            </p>
            {/* <button className="mt-4 text-xs font-black uppercase tracking-widest text-purple-600 hover:text-purple-800">
              Check Training Logs →
            </button> */}
          </GlassCard>

        </div>
      </div>
    </div>
  );
};

// Internal Component for Health Bars
const HealthBar = ({ icon: Icon, label, value }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-xs">
      <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-tighter">
        <Icon size={14} /> {label}
      </div>
      <span className="font-mono text-white">{value}</span>
    </div>
    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
      <div
        className={`h-full bg-white transition-all duration-1000`}
        style={{ width: value }}
      ></div>
    </div>
  </div>
);

export default AdminDashboard;