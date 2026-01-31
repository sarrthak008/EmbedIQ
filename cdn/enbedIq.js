(function() {
    // 1. Extract Bot ID from the script tag
    const scriptTag = document.currentScript || document.querySelector('script[src*="enbedIq.js"]');
    const botId = scriptTag ? scriptTag.getAttribute('data-bot-id')?.trim() : null;

    if (!botId) {
        console.error("EmbedIQ: Bot ID missing. Make sure to pass data-bot-id in your script tag.");
        return;
    }

    const BACKEND_URL = "http://localhost:8080"; // Update this to your production URL later

    function createWidget() {
        // Create Container
        const container = document.createElement('div');
        container.id = 'embediq-widget';
        container.innerHTML = `
            <div id="embediq-bubble" style="position:fixed; bottom:20px; right:20px; width:60px; height:60px; background:#4F46E5; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:9999; box-shadow:0 4px 15px rgba(79, 70, 229, 0.4); transition: transform 0.2s;">
                <span style="color:white; font-size:28px;">💬</span>
            </div>

            <div id="embediq-chat-box" style="display:none; position:fixed; bottom:90px; right:20px; width:380px; max-width: 90vw; height:550px; max-height: 80vh; background:white; border-radius:16px; box-shadow:0 10px 25px rgba(0,0,0,0.15); z-index:9999; flex-direction:column; overflow:hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <div style="background:#4F46E5; color:white; padding:18px; font-weight:600; font-size: 16px; display:flex; justify-content:space-between; align-items:center;">
                    <span>EmbedIQ Assistant</span>
                    <span id="embediq-close" style="cursor:pointer; opacity:0.8;">✕</span>
                </div>

                <div id="embediq-messages" style="flex:1; padding:20px; overflow-y:auto; background:#ffffff; scroll-behavior: smooth;"></div>

                <div style="padding:15px; border-top:1px solid #f0f0f0; display:flex; gap:8px; background:white;">
                    <input type="text" id="embediq-input" placeholder="Ask me about RAG or Vector DBs..." style="flex:1; border:1px solid #e0e0e0; padding:10px 14px; border-radius:8px; outline:none; font-size:14px; transition: border 0.2s;">
                    <button id="embediq-send" style="background:#4F46E5; color:white; border:none; padding:8px 16px; border-radius:8px; cursor:pointer; font-weight:600; transition: opacity 0.2s;">Send</button>
                </div>
                <div style="text-align:center; font-size:10px; color:#ccc; padding-bottom:8px;">Powered by EmbedIQ</div>
            </div>
        `;
        document.body.appendChild(container);

        const bubble = document.getElementById('embediq-bubble');
        const chatBox = document.getElementById('embediq-chat-box');
        const closeBtn = document.getElementById('embediq-close');
        const sendBtn = document.getElementById('embediq-send');
        const input = document.getElementById('embediq-input');
        const messagesContainer = document.getElementById('embediq-messages');

        // Logic to format AI text (Bold, Lists, Bracks)
        function formatAIResponse(text) {
            if (!text) return "";
            let formatted = text
                .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight:700; color:#111;">$1</strong>') // Bold
                .replace(/^(?:🔹|-)\s*(.*)/gm, '<div style="margin-left: 10px; margin-top: 5px; display: flex; gap: 8px;"><span>🔹</span><span>$1</span></div>') // Lists
                .replace(/\n\n/g, '<div style="margin-bottom: 12px;"></div>') // Paragraphs
                .replace(/\n/g, '<br/>'); // New lines
            return formatted;
        }

        function appendMessage(sender, text) {
            const isAI = sender === "AI";
            const msgDiv = document.createElement('div');
            msgDiv.style.marginBottom = '20px';
            msgDiv.style.display = 'flex';
            msgDiv.style.flexDirection = 'column';
            msgDiv.style.alignItems = isAI ? 'flex-start' : 'flex-end';

            msgDiv.innerHTML = `
                <div style="font-size: 10px; color: #999; margin-bottom: 4px; font-weight: bold; text-transform: uppercase; margin-${isAI ? 'left' : 'right'}: 8px;">
                    ${isAI ? 'EmbedIQ AI' : 'You'}
                </div>
                <div style="
                    max-width: 85%; 
                    padding: 12px 16px; 
                    border-radius: ${isAI ? '4px 16px 16px 16px' : '16px 16px 4px 16px'};
                    background: ${isAI ? '#F3F4F6' : '#4F46E5'};
                    color: ${isAI ? '#1F2937' : 'white'};
                    line-height: 1.6;
                    font-size: 14px;
                    border: ${isAI ? '1px solid #E5E7EB' : 'none'};
                ">
                    ${isAI ? formatAIResponse(text) : text}
                </div>
            `;
            messagesContainer.appendChild(msgDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // Event Handlers
        bubble.onclick = () => {
            chatBox.style.display = 'flex';
            bubble.style.transform = 'scale(0)';
        };

        closeBtn.onclick = () => {
            chatBox.style.display = 'none';
            bubble.style.transform = 'scale(1)';
        };

        const handleSend = async () => {
            const question = input.value.trim();
            if (!question) return;

            appendMessage("You", question);
            input.value = '';

            // Add loading indicator
            const loadingId = 'iq-loading-' + Date.now();
            const loadingDiv = document.createElement('div');
            loadingDiv.id = loadingId;
            loadingDiv.style.cssText = "font-size: 12px; color: #999; margin: 10px 0 0 10px; font-style: italic;";
            loadingDiv.innerHTML = "AI is thinking...";
            messagesContainer.appendChild(loadingDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            try {
                const response = await fetch(`${BACKEND_URL}/api/chat/chatbot/${botId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain' },
                    body: question
                });

                const result = await response.json();
                document.getElementById(loadingId).remove();

                const answer = result.data?.bot_answer || result.data?.message || result.message;
                appendMessage("AI", answer);
            } catch (err) {
                if(document.getElementById(loadingId)) document.getElementById(loadingId).remove();
                appendMessage("AI", "⚠️ Sorry, I'm having trouble connecting to the server.");
            }
        };

        sendBtn.onclick = handleSend;
        input.onkeypress = (e) => { if (e.key === 'Enter') handleSend(); };

        // Initial Greeting if desired
        setTimeout(() => {
            appendMessage("AI", "Hi! 👋 I'm **EmbedIQ AI**. How can I help you with your AI architecture today?");
        }, 500);
    }

    if (document.readyState === 'complete') createWidget();
    else window.addEventListener('load', createWidget);
})();