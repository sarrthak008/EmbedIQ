import React, { useState } from 'react';
import { LogOut, Ghost, ShieldCheck, X, ChevronUp, User, Activity } from 'lucide-react';

const GhostModeBanner = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isGhosting = localStorage.getItem("IMPERSONATED_USER");

  if (!isGhosting) return null;

  const userData = JSON.parse(isGhosting);

  const handleExit = () => {
    localStorage.removeItem("IMPERSONATED_USER");
    window.location.href = "/admin";
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-4 font-sans antialiased">
      
      {isOpen ? (
        /* --- EXPANDED PREMIUM CARD --- */
        <div className="relative group w-[320px] bg-[#0c0c0c]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.6)] animate-in slide-in-from-bottom-6 fade-in duration-500">
          
          {/* Subtle Gradient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent rounded-[32px] pointer-events-none" />

          {/* Header Action */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-white/5 text-zinc-500 hover:text-white transition-all"
          >
            <X size={16} />
          </button>

          {/* User Profile Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center text-white shadow-inner">
                <User size={24} strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 border-[3px] border-[#0c0c0c] rounded-full" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500/80">Ghost Active</span>
              </div>
              <h4 className="text-white font-semibold text-base truncate tracking-tight">
                {userData.email.split('@')[0]}
              </h4>
              <p className="text-[11px] text-zinc-500 truncate font-medium">
                {userData.email}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="bg-white/5 border border-white/5 p-3 rounded-2xl">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Access Level</p>
                <div className="flex items-center gap-1.5 text-white">
                    <ShieldCheck size={12} className="text-green-500" />
                    <span className="text-xs font-bold">{userData.role}</span>
                </div>
            </div>
            <div className="bg-white/5 border border-white/5 p-3 rounded-2xl">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Status</p>
                <div className="flex items-center gap-1.5 text-white">
                    <Activity size={12} className="text-blue-400" />
                    <span className="text-xs font-bold">In-Sync</span>
                </div>
            </div>
          </div>

          {/* Exit CTA */}
          <button 
            onClick={handleExit}
            className="w-full relative overflow-hidden group/btn py-4 bg-white hover:bg-zinc-100 text-black rounded-2xl transition-all active:scale-[0.98] shadow-[0_10px_20px_-10px_rgba(255,255,255,0.2)]"
          >
            <div className="relative z-10 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest">
              Termination Session
              <LogOut size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </div>
          </button>
          
          <p className="text-center text-[9px] text-zinc-600 mt-4 font-medium uppercase tracking-[0.3em]">
             Admin Safety Protocol v2.0
          </p>
        </div>
      ) : (
        /* --- MINI FLOATING TRIGGER --- */
        <button 
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-4 bg-black/90 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl hover:border-green-500/50 transition-all duration-500"
        >
          <div className="flex flex-col items-end pl-4 py-1">
            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] group-hover:text-green-500 transition-colors">
              Restore
            </span>
            <span className="text-[11px] font-bold text-white tracking-tight">Ghost Mode</span>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-green-600 p-3.5 rounded-xl text-black shadow-[0_0_20px_rgba(34,197,94,0.3)] group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all">
            <Ghost size={20} strokeWidth={2.5} />
          </div>
        </button>
      )}
    </div>
  );
};

export default GhostModeBanner;