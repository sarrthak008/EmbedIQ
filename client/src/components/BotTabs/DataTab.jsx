import React, { useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// VITE FIX: This tells Vite to treat the worker as a separate asset URL
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import { BotService } from '../../Services/BotService';
import { toast } from "sonner"

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const DataTab = ({ botId, botData }) => {
    const [content, setContent] = useState(botData || "");
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsLoading(true);
        const reader = new FileReader();

        reader.onload = async (event) => {
            try {
                const typedarray = new Uint8Array(event.target.result);

                // Load the PDF
                const loadingTask = pdfjsLib.getDocument({
                    data: typedarray,
                });

                const pdf = await loadingTask.promise;
                let fullText = "";

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(" ");
                    fullText += pageText + "\n";
                }

                setContent(prev => prev + (prev ? "\n\n" : "") + fullText.trim());

            } catch (error) {
                console.error("PDF Scraper Error:", error);
                alert("Scraping failed. You may need to type the data manually.");
            } finally {
                setIsLoading(false);
                if (fileInputRef.current) fileInputRef.current.value = "";
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const handleSave = async () => {
        if (!content.trim()) return toast.error("No data to save.");
        let id = toast.loading("Updating Brain..")
        try {
            let reposnse = await BotService.updateBot(botId, { bot_data: content });
            if (reposnse.success) {
                toast.success("Brain Update Refresh Bot", { id: id });
            } else {
                toast.error(reposnse.message, { id: id })
            }
        } catch (error) {
            toast.error(error, { id: id })
        }
    };

    return (
        <div className="max-w-full mx-auto p-6 bg-white border border-gray-400 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Clinic Data Source</h2>

            {/* Hidden Input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf"
                className="hidden"
            />

            {/* Upload UI */}
            <div
                onClick={() => !isLoading && fileInputRef.current.click()}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${isLoading ? 'bg-gray-50 border-blue-300' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
            >
                {isLoading ? (
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                        <p className="text-blue-600 font-medium">Extracting text...</p>
                    </div>
                ) : (
                    <div>
                        <p className="text-gray-800 font-semibold">📄 Click to Upload PDF</p>
                        <p className="text-gray-400 text-xs mt-1">Text will be scraped and added below</p>
                    </div>
                )}
            </div>

            <div className="flex items-center my-6 text-gray-400">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="px-4 text-[10px] font-bold uppercase tracking-widest">OR WRITE MANUALLY</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Manual Edit/Display Box */}
            <textarea
                className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none text-sm text-gray-700"
                placeholder="Data content will appear here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button
                onClick={handleSave}
                className="w-full mt-4 bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-700 transition-colors shadow-md"
            >
                Save Data to Database
            </button>
        </div>
    );
};

export default DataTab;