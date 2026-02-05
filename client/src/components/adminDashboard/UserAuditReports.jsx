import React, { useState } from "react";
import { 
  Terminal, Cpu, CornerDownRight, Search, 
  ArrowRight, ShieldAlert, Mail, Activity,
  CheckCircle, MessageCircle, X,
  ShieldCheck,
  Repeat2Icon
} from "lucide-react";

const UserAuditReports = () => {
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adminReply, setAdminReply] = useState("");

  const reports = [
    { 
        id: "R-402", 
        user: "Sarah Jenkins", 
        email: "sarah@designco.com",
        subject: "Hallucinated Pricing", 
        timestamp: "04 FEB 2026 12:45", 
        priority: "CRITICAL",
        message: "Bot quoted $5 for a $500 service tier. Pricing table mismatch.",
        tech: "TEMP: 0.8 | MODEL: GPT-4O | V_STORE: PINECONE"
    },
    { 
        id: "R-398", 
        user: "Marcus Chen", 
        email: "m.chen@techly.io",
        subject: "Parsing Timeout", 
        timestamp: "04 FEB 2026 11:20", 
        priority: "NORMAL",
        message: "50-page PDF/A document failing to initialize in vector memory.",
        tech: "SIZE: 14MB | FORMAT: PDF/A | BUFFER: 512KB"
    }
  ];

  const handleToggle = (id) => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setLoading(true);
      setActiveId(id);
      setTimeout(() => setLoading(false), 700);
    }
  };

  return (
    <div className="min-h-screen text-black font-mono p-8 selection:bg-black selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* --- TOP NAVIGATION --- */}
        
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100">
              <Repeat2Icon size={14} className="text-black" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Reports Management</span>
            </div>
            <h1 className="text-6xl font-semibold tracking-[-0.04em] neo">Reports</h1>
          </div>
        </header>


        {/* --- FILTERS --- */}
        <div className="flex items-center border-b border-gray-100 pb-4 mb-8">
          <Search size={18} className="mr-4 text-gray-300" />
          <input 
            type="text" 
            placeholder="FILTER_ACCOUNTS..." 
            className="flex-1 bg-transparent border-none outline-none text-xs uppercase tracking-widest placeholder:text-gray-200"
          />
        </div>

        {/* --- LIST HEADERS --- */}
        <div className="grid grid-cols-12 px-6 mb-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
          <div className="col-span-1 text-black">ID</div>
          <div className="col-span-5">Report Subject / Origin</div>
          <div className="col-span-2">Time</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* --- REPORT LIST --- */}
        <div className="space-y-2">
          {reports.map((report) => (
            <div key={report.id} className={`border bg-white border-gray-100 transition-all duration-500 ${activeId === report.id ? 'border-black' : 'hover:border-gray-300'}`}>
              
              {/* ROW HEADER */}
              <div 
                className="grid grid-cols-12 items-center px-6 py-5 cursor-pointer"
                onClick={() => handleToggle(report.id)}
              >
                <div className="col-span-1 text-xs font-bold font-mono">{report.id}</div>
                <div className="col-span-5">
                  <p className="text-sm font-black uppercase tracking-tight">{report.subject}</p>
                  <p className="text-[10px] text-gray-400">{report.email}</p>
                </div>
                <div className="col-span-2 text-[10px] text-gray-500 font-bold">{report.timestamp}</div>
                <div className="col-span-2">
                  <span className={`text-[9px] px-2 py-0.5 border font-black ${report.priority === 'CRITICAL' ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-400'}`}>
                    {report.priority}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <ArrowRight size={18} className={`inline transition-transform duration-500 ${activeId === report.id ? 'rotate-90' : ''}`} />
                </div>
              </div>

              {/* EXPANDED DIAGNOSTIC SUITE */}
              {activeId === report.id && (
                <div className="bg-gray-50/50 p-8 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    {/* LEFT: USER CONTENT */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <MessageCircle size={14}/> User Observation
                      </div>
                      <p className="text-sm leading-relaxed italic text-gray-800 border-l-2 border-black pl-6">
                        "{report.message}"
                      </p>
                      <div className="pt-4">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-3 block">Direct Response</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            value={adminReply}
                            onChange={(e) => setAdminReply(e.target.value)}
                            className="w-full bg-white border border-gray-200 p-3 text-xs focus:border-black outline-none"
                            placeholder="TYPE_MESSAGE..."
                          />
                          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-black hover:text-white transition-colors">
                            <CheckCircle size={16}/>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT: AI DIAGNOSIS */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <Cpu size={14}/> Neural Diagnosis
                      </div>
                      
                      {loading ? (
                        <div className="flex items-center gap-2 text-xs text-gray-300 py-4 animate-pulse">
                          <Terminal size={14}/> PROCESSING_TRACE_LOGS...
                        </div>
                      ) : (
                        <div className="bg-black text-white p-6 space-y-4 shadow-xl">
                          <p className="text-xs leading-relaxed opacity-90">
                            {report.id === "R-402" 
                              ? "ANALYSIS: High-entropy state detected in pricing module. The system prompt failed to anchor the numerical response to the primary vector store. RECO: Adjust Top-P sampling."
                              : "ANALYSIS: PDF-A layer-7 mismatch. The document contains an image-based wrapper that our current text-streamer cannot penetrate. RECO: Switch to OCR-Pipeline."}
                          </p>
                          <div className="text-[9px] font-mono opacity-40 border-t border-white/20 pt-4 tracking-tighter">
                            {report.tech}
                          </div>
                          <button className="w-full bg-white text-black py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                             Apply Patch
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- FOOTER --- */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center opacity-30 text-[9px] font-bold tracking-widest uppercase">
          <span>{reports.length} Logs Parsed</span>
          <span className="flex items-center gap-2 italic">System Nominal <div className="w-1.5 h-1.5 bg-black rounded-full" /></span>
        </div>

      </div>
    </div>
  );
};

export default UserAuditReports;