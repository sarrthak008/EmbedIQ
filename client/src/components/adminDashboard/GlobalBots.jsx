import React, { useEffect, useState } from "react";
import { Bot, Search, Trash2, Activity, MessageSquare, AlertTriangle } from "lucide-react";
import AdminServices from "../../Services/AdminServices";
import ROBOT from "../../assets/robot.png";
import { toast } from "sonner";

const GlobalBots = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeBot, setActiveBot] = useState(null);

  const loadAllBots = async () => {
    setLoading(true);
    try {
      let data = await AdminServices.getAllBots();
      if (data.success) setBots(data?.data?.data);
    } finally { setLoading(false); }
  }

  const handleDelete = async () => {
    let id = toast.loading("Decommissioning...");
    try {
      let response = await AdminServices.deleteBot(activeBot.bot_id);
      if (response.success) {
        toast.success("Bot purged", { id });
        loadAllBots();
        setIsDeleteModalOpen(false);
      }
    } catch (error) { toast.error("Error purging bot", { id }); }
  }

  useEffect(() => { loadAllBots(); }, []);

  return (
    <div className="min-h-screen text-[#1a1a1a] px-8 py-16">
      <div className="max-w-[1200px] mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mb-4">
              <Activity size={14} /><span className="text-[10px] font-bold uppercase">Infrastructure</span>
            </div>
            <h1 className="text-6xl font-semibold tracking-[-0.04em] neo">Bots</h1>
          </div>
          <input 
             onChange={(e) => setSearchTerm(e.target.value)}
             className="pl-6 pr-6 py-3.5 bg-gray-50 rounded-2xl w-80 outline-none text-sm" 
             placeholder="Search bot ID..." 
          />
        </header>

        <div className="space-y-3">
          {loading ? [...Array(4)].map((_, i) => (
             <div key={i} className="h-24 bg-gray-50 border border-gray-100 rounded-md animate-pulse px-8 flex items-center gap-5">
               <div className="h-12 w-12 bg-gray-200 rounded-xl"/><div className="h-6 w-48 bg-gray-200 rounded-md"/>
             </div>
          )) : bots.filter(b => b.bot_name.toLowerCase().includes(searchTerm.toLowerCase())).map((bot, i) => (
            <div key={i} className="group grid grid-cols-12 items-center px-8 py-6 bg-white border border-gray-100 rounded-md hover:border-black transition-all">
              <div className="col-span-4 flex items-center gap-5">
                <div className="h-14 w-14 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all"><Bot size={24} /></div>
                <div className="flex flex-col"><span className="text-lg font-semibold">{bot.bot_name}</span><span className="text-xs font-mono text-gray-400 uppercase">ID: {bot.bot_id}</span></div>
              </div>
              <div className="col-span-3 font-bold uppercase text-sm">embediq</div>
              <div className="col-span-2 flex items-center gap-2"><MessageSquare size={14} className="text-gray-300" /><span className="text-sm font-semibold">{bot.chatCount}</span></div>
              <div className="col-span-2">
                <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase border ${bot.isBotActive ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                  {bot.isBotActive ? "Active" : "Offline"}
                </span>
              </div>
              <div className="col-span-1 flex justify-end opacity-0 group-hover:opacity-100">
                <button onClick={() => { setActiveBot(bot); setIsDeleteModalOpen(true); }} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DELETE MODAL (Same as User Directory logic) */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[32px] p-10 relative overflow-hidden animate-in zoom-in-95">
            <img src={ROBOT} className="absolute -right-16 -bottom-16 w-64 h-72 opacity-[0.5] grayscale pointer-events-none" />
            <div className="relative z-10">
              <div className="h-14 w-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6"><AlertTriangle size={28} /></div>
              <h3 className="text-3xl font-bold text-red-600 tracking-tighter mb-3">Decommission</h3>
              <p className="text-gray-500 mb-8 text-sm">Terminate <span className="text-black font-bold">{activeBot?.bot_name}</span>? This is irreversible.</p>
              <div className="flex gap-4">
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-4 bg-gray-100 text-[10px] font-black uppercase rounded-2xl">Cancel</button>
                <button onClick={handleDelete} className="flex-1 py-4 bg-red-600 text-white text-[10px] font-black uppercase rounded-2xl">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalBots;