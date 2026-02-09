import React, { useEffect, useState } from 'react';
import { Users, Bot, MessageSquare, Activity } from 'lucide-react';
import AdminServices from '../../Services/AdminServices';
import TimeFormater from "../../../utils/TimeDateFormater"

const DashboardSkeleton = () => (
  <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-pulse">
    <div className="flex justify-between items-center"><div className="h-16 w-64 bg-gray-200 rounded-lg"/><div className="h-12 w-48 bg-gray-200 rounded-sm"/></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-gray-100 rounded-[1rem]"/>)}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 h-[400px] bg-gray-100 rounded-[1rem]"/>
      <div className="lg:col-span-4 h-[200px] bg-gray-100 rounded-[1rem]"/>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [dashboardData, setDashbaordData] = useState();
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      let data = await AdminServices.getAdminDashboardData();
      if (data.success) setDashbaordData(data.data.data);
    } finally { setLoading(false); }
  }

  useEffect(() => { loadData(); }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-6xl font-semibold tracking-[-0.04em] neo">Dashboard</h1>
        <button onClick={loadData} className="bg-black text-white px-6 py-3 rounded-sm font-bold text-sm">Generate System Report</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MiniStat title="Total Users" value={dashboardData?.totalUser || 0} />
        <MiniStat title="Active Bots" value={dashboardData?.activeBots || 0} />
        <MiniStat title="Messages" value={dashboardData?.totalChats || 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[1rem] overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between bg-gray-50/30">
            <h3 className="text-lg font-black uppercase">Last 5 Activities</h3>
            <Activity size={20} className="text-gray-300" />
          </div>
          <table className="w-full text-left">
            <tbody className="divide-y divide-gray-50">
              {dashboardData?.recentActivity?.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold">{row.initiator}</td>
                  <td className="px-6 py-4 text-gray-500">{row.operation}</td>
                  <td className="px-6 py-4 text-right text-xs font-bold uppercase">{TimeFormater(row.createdAt).relativeTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="lg:col-span-4 p-6 bg-gradient-to-br from-purple-50 to-white rounded-[1rem] border border-purple-100">
            <h4 className="font-black italic">EmbedIQ Intelligence</h4>
            <p className="text-xs text-gray-500 mt-2">System is ready for high-load operations.</p>
        </div>
      </div>
    </div>
  );
};

const MiniStat = ({ title, value }) => (
  <div className="p-5 bg-white border border-gray-100 rounded-[1rem] hover:border-black transition-all">
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</p>
    <p className="text-3xl font-black text-gray-900 tracking-tight">{value}</p>
  </div>
);

export default AdminDashboard;