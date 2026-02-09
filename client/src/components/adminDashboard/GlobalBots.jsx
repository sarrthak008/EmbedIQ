import React, { useEffect, useState } from "react";
import {
  Bot, Search, Filter, Trash2,
  Activity, MessageSquare, Settings2, X, AlertTriangle,
  Loader2 // Added for the loading state
} from "lucide-react";
import AdminServices from "../../Services/AdminServices";
import ROBOT from "../../assets/robot.png"
import { toast } from "sonner"

const GlobalBots = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true); // 1. New Loading State

  // --- MODAL STATES ---
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeBot, setActiveBot] = useState(null);

  const loadAllBots = async () => {
    setLoading(true); // Ensure loading starts
    try {
      let data = await AdminServices.getAllBots();
      if (data.success) {
        setBots(data?.data?.data)
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch global infrastructure");
    } finally {
      setLoading(false); // 2. Stop loading
    }
  }

  const handleDelete = async () => {
    if (!activeBot) return;
    let id = toast.loading("trying to delete")
    try {
      let response = await AdminServices.deleteBot(activeBot.bot_id);
      if (response.success) {
        loadAllBots();
        setIsDeleteModalOpen(false);
        setActiveBot(null);
        toast.success("bot delete sucessfully", { id })
      }
    } catch (error) {
      toast.error(error.message || "bot deletion error", { id })
      console.error("Deletion failed", error);
    }
  }

  useEffect(() => {
    loadAllBots();
  }, [])

  return (
    <div className="min-h-screen text-[#1a1a1a] font-sans selection:bg-black selection:text-white relative">
      <div className="max-w-[1200px] mx-auto px-8 py-16">

        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
              <Activity size={14} className="text-blue-600" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Global Infrastructure</span>
            </div>
            <h1 className="text-6xl font-semibold tracking-[-0.04em] neo">Bots</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search bot ID or name..."
                className="pl-12 pr-6 py-3.5 bg-gray-50 border-none rounded-2xl w-full md:w-80 focus:ring-2 focus:ring-black/5 outline-none text-sm transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors">
              <Settings2 size={18} />
            </button>
          </div>
        </header>

        {/* --- BOT LIST --- */}
        <div className="space-y-1">
          <div className="grid grid-cols-12 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
            <div className="col-span-4 text-left">Bot Identity</div>
            <div className="col-span-3">Model</div>
            <div className="col-span-2">Message</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          <div className="space-y-3">
            {/* 3. LOADER & EMPTY STATE LOGIC */}
            {loading ? (
              // Skeleton Rows
              [1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="grid grid-cols-12 items-center px-8 py-6 bg-gray-50/50 border border-gray-100 rounded-md animate-pulse">
                  <div className="col-span-4 flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-gray-200" />
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-gray-200 rounded" />
                      <div className="h-3 w-20 bg-gray-200 rounded" />
                    </div>
                  </div>
                  <div className="col-span-3"><div className="h-4 w-20 bg-gray-200 rounded" /></div>
                  <div className="col-span-2"><div className="h-4 w-10 bg-gray-200 rounded" /></div>
                  <div className="col-span-2"><div className="h-6 w-16 bg-gray-200 rounded-full" /></div>
                </div>
              ))
            ) : bots.length === 0 ? (
              <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                <p className="text-gray-400 font-medium">No bots found in the network.</p>
              </div>
            ) : (
              bots
                .filter(b => b.bot_name.toLowerCase().includes(searchTerm.toLowerCase()) || b.bot_id.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((bot, i) => (
                  <div
                    key={i}
                    className="group grid grid-cols-12 items-center px-8 py-6 bg-white border border-gray-100 rounded-md hover:border-black hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-300"
                  >
                    <div className="col-span-4 flex items-center gap-5">
                      <div className="h-14 w-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-sm font-bold group-hover:bg-black group-hover:text-white transition-all duration-500 text-gray-400">
                        <Bot size={24} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold tracking-tight">{bot?.bot_name}</span>
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-tighter">
                          Id: {bot?.bot_id}
                        </span>
                      </div>
                    </div>

                    <div className="col-span-3">
                      <span className="text-sm font-bold text-gray-900 neo">{"embediq"}</span>
                    </div>

                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare size={14} className="text-gray-300" />
                        <span className="text-sm font-semibold">{bot?.chatCount}</span>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border
                      ${bot?.isBotActive
                          ? 'bg-green-50 text-green-600 border-green-100'
                          : 'bg-gray-50 text-gray-400 border-gray-100'}`}
                      >
                        {bot?.isBotActive ? "Active" : "dead"}
                      </span>
                    </div>

                    <div className="col-span-1 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => { setActiveBot(bot); setIsDeleteModalOpen(true); }}
                        className="p-2 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
      
      {/* ... DELETE MODAL REMAINS THE SAME ... */}
    </div>
  );
};

export default GlobalBots;