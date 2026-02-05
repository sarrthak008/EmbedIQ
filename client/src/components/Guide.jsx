import React, { useState, useEffect } from "react";
import IMG1 from "../assets/guide/createbot.png";
import IMG2 from "../assets/guide/adddata.png";
import IMG3 from "../assets/guide/settings.png";
import IMG4 from "../assets/guide/cdn.png";
import IMG5 from "../assets/guide/monitor.png";
import BlurBaground from "./Conainers/BlurBaground";

const Guide = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState(0);

    const guideContent = [
        {
            title: "Create Your Bot",
            subtitle: "IDENTITY & PURPOSE",
            description: "Initialize your AI assistant by defining its core identity. A clear name helps the model align with your business goals.",
            tip: "Use names like 'HairCraft Support'.",
            image: IMG1,
        },
        {
            title: "Add Knowledge",
            subtitle: "INTELLECTUAL TRAINING",
            description: "Upload your professional manuals or paste custom routines. Our system parses the data for expert accuracy.",
            tip: "Structured data yields higher quality.",
            image: IMG2,
        },
        {
            title: "Customize Settings",
            subtitle: "BRAND INTEGRATION",
            description: "Align the interface with your brand's aesthetic. Adjust positioning, theme colors, and security.",
            tip: "Dark mode feels premium.",
            image: IMG3,
        },
        {
            title: "Deploy with CDN",
            subtitle: "INSTANT ACTIVATION",
            description: "Embed your assistant using our optimized script. A single line connects you to 24/7 AI support.",
            tip: "Paste before the closing body tag.",
            image: IMG4,
        },
        {
            title: "Monitor & Improve",
            subtitle: "ANALYTICS & OPTIMIZATION",
            description: "Access chat logs and metrics. Identify user queries to refine your knowledge base over time.",
            tip: "Review logs weekly.",
            image: IMG5,
        },
    ];

    const next = () => setActiveTab((p) => Math.min(p + 1, guideContent.length - 1));
    const prev = () => setActiveTab((p) => Math.max(p - 1, 0));
    const step = guideContent[activeTab];

    return (

        <BlurBaground>
            <div className="bg-white w-full max-w-6xl rounded-sm shadow-2xl overflow-hidden flex flex-col h-[80%] border border-gray-800">

                {/* PROGRESS BAR */}
                <div className="flex w-full h-1 bg-gray-100">
                    {guideContent.map((_, i) => (
                        <div key={i} className={`flex-1 transition-all duration-700 ${i <= activeTab ? 'bg-black' : 'bg-transparent'}`} />
                    ))}
                </div>

                {/* HEADER */}
                <div className="flex justify-between items-center px-6 md:px-10 py-4 border-b border-gray-100 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="bg-black text-white text-[10px] font-black px-2 py-1 tracking-tighter neo">EMBEDIQ</div>
                        <h2 className="hidden sm:block text-[9px] font-bold tracking-[0.3em] uppercase text-gray-400 font-mono">SERVICE PROTOCOL</h2>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 transition-all rounded-full">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* MAIN BODY */}
                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

                    {/* LEFT: TEXT CONTENT */}
                    <div className="w-full md:w-[45%] p-8 md:p-14 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100 no-scrollbar overflow-y-auto">
                        <span className="text-gray-400 font-bold text-[clamp(8px,1vw,10px)] tracking-[0.4em] mb-2 uppercase">
                            Section 0{activeTab + 1} // {step.subtitle}
                        </span>

                        {/* Fluid Font: Adjusts based on container size */}
                        <h3 className="text-[clamp(1.5rem,4vw,3rem)] neo font-bold text-black mb-4 leading-[1.1] tracking-tighter">
                            {step.title}
                        </h3>

                        <p className="text-gray-500 text-[clamp(0.875rem,1.2vw,1.125rem)] leading-relaxed mb-6 font-light">
                            {step.description}
                        </p>

                        <div className="border-l-2 border-black pl-4 py-1">
                            <span className="block text-[9px] font-black text-black uppercase tracking-[0.2em] mb-1">Internal Note</span>
                            <p className="text-gray-600 text-[13px] leading-relaxed italic font-serif">"{step.tip}"</p>
                        </div>
                    </div>

                    {/* RIGHT: IMAGE AREA */}
                    <div className="w-full md:w-[55%] bg-gray-50 p-6 md:p-12 flex items-center justify-center overflow-hidden">
                        <div className="w-full max-w-lg bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden transform md:hover:scale-[1.01] transition-transform duration-500">
                            <div className="bg-gray-100 px-3 py-2 border-b border-gray-200 flex gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                            </div>
                            <img
                                src={step.image}
                                alt="interface preview"
                                className="w-full h-auto max-h-[250px] md:max-h-[350px] object-cover grayscale brightness-105"
                            />
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex justify-between items-center px-10 py-6 border-t border-gray-100 bg-white flex-shrink-0">
                    <button
                        onClick={prev}
                        disabled={activeTab === 0}
                        className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 0 ? 'opacity-0' : 'text-gray-400 hover:text-black'}`}
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        Back
                    </button>

                    <div className="hidden sm:flex gap-3">
                        {guideContent.map((_, i) => (
                            <div key={i} className={`h-[1px] transition-all duration-500 ${i === activeTab ? 'bg-black w-8' : 'bg-gray-200 w-4'}`} />
                        ))}
                    </div>

                    <button
                        onClick={activeTab === guideContent.length - 1 ? onClose : next}
                        className="flex items-center justify-center gap-6 bg-black text-white px-10 py-4 rounded-none text-[10px] font-black uppercase tracking-[0.2em] hover:invert transition-all active:scale-95 shadow-xl"
                    >
                        {activeTab === guideContent.length - 1 ? "Initialize" : "Next"}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </BlurBaground>
    );
};

export default Guide;