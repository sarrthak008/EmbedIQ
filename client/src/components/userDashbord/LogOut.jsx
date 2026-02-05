import React from 'react';
import { LogOut, User, X } from "lucide-react";
import robotImg from "../../assets/robot.png"

const LogOutComp = ({ email, role, onClose }) => {
  
  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 1. Blurred/Dark Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* 2. Modal Card */}
      <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-in zoom-in-95 duration-300">
        
        {/* --- ROBOT BACKGROUND IMAGE SECTION --- */}
        <div className="absolute top-0 left-0 w-full h-40 overflow-hidden opacity-20">
            <img 
                src={robotImg} 
                alt="robot bg" 
                className="w-full h-full object-cover blur-[2px]"
            />
            {/* Gradient Overlay to blend image into white body */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
        </div>

        {/* Header with Close Icon */}
        <div className="relative flex justify-end p-4 pb-0 z-10">
          <button 
            onClick={onClose} 
            className="p-1.5 bg-white/80 hover:bg-gray-100 rounded-full text-gray-400 transition-colors shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="relative px-6 pb-8 text-center z-10">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
                {/* Robot/User Avatar Group */}
                <div className="h-24 w-24 rounded-full bg-black border-4 border-white flex items-center justify-center text-white mb-4 shadow-xl overflow-hidden">
                    <User size={48} />
                </div>
                {/* Tiny Robot Badge */}
                <div className="absolute bottom-4 right-0 h-8 w-8 rounded-full border-2 border-white overflow-hidden shadow-md">
                    <img src={robotImg} alt="bot" className="w-full h-full object-cover" />
                </div>
            </div>

            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Sign Out?</h3>
            <p className="text-sm text-gray-500 mt-1">Ready to leave the workspace?</p>
            
            <div className="mt-4 w-full p-3 bg-gray-50 rounded-2xl border border-gray-100">
               <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Logged in as</p>
               <p className="text-sm font-semibold text-gray-800 truncate">{email}</p>
               <span className="inline-block mt-1 px-2 py-0.5 bg-black text-[10px] text-white rounded-md font-bold uppercase">
                  {role || "User"}
               </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-black hover:bg-gray-800 text-white rounded-2xl font-bold shadow-lg shadow-gray-300 transition-all active:scale-95"
            >
              <LogOut size={18} />
              Logout from EmbedIQ
            </button>
            
            <button
              onClick={onClose}
              className="w-full py-3.5 px-4 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-2xl font-bold transition-all"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="h-2 w-full bg-gradient-to-r from-gray-700 via-black to-gray-700"></div>
      </div>
    </div>
  );
};

export default LogOutComp;