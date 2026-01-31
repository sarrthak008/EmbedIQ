(function() {
    console.log("EmbedIQ: Script Loaded Successfully"); // Debug line

    const scriptTag = document.currentScript || document.querySelector('script[src*="enbedIq.js"]');
    const botId = scriptTag ? scriptTag.getAttribute('data-bot-id')?.trim() : null;

    if (!botId) {
        console.error("EmbedIQ: Bot ID missing.");
        return;
    }

    // CHANGE THIS TO YOUR ACTUAL PRODUCTION API URL
    const BACKEND_URL = "https://your-production-api.com"; 

    function createWidget() {
        const container = document.createElement('div');
        container.id = 'embediq-widget';
        container.innerHTML = `
            <div id="embediq-bubble" style="position:fixed; bottom:20px; right:20px; width:60px; height:60px; background:#4F46E5; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:99999; box-shadow:0 4px 15px rgba(0,0,0,0.2); transition: all 0.3s ease;">
                <span style="color:white; font-size:28px;">🤖</span>
            </div>
            <div id="embediq-chat-box" style="display:none; position:fixed; bottom:90px; right:20px; width:380px; max-width: 90vw; height:550px; background:white; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.2); z-index:99999; flex-direction:column; overflow:hidden; font-family: sans-serif;">
                <div style="background:#4F46E5; color:white; padding:18px; font-weight:bold; display:flex; justify-content:space-between;">
                    <span>EmbedIQ AI</span>
                    <span id="embediq-close" style="cursor:pointer;">✕</span>
                </div>
                <div id="embediq-messages" style="flex:1; padding:20px; overflow-y:auto; background:#f9f9f9; display:flex; flex-direction:column;"></div>
                <div style="padding:15px; border-top:1px solid #eee; display:flex; gap:5px;">
                    <input type="text" id="embediq-input" placeholder="Type a message..." style="flex:1; border:1px solid #ddd; padding:10px; border-radius:8px; outline:none;">
                    <button id="embediq-send" style="background:#4F46E5; color:white; border:none; padding:10px 15px; border-radius:8px; cursor:pointer;">Send</button>
                </div>
            </div>
        `;
        document.body.appendChild(container);

        const bubble = document.getElementById('embediq-bubble');
        const chatBox = document.getElementById('embediq-chat-box');
        const messagesContainer = document.getElementById('embediq-messages');
        const input = document.getElementById('embediq-input');
        const sendBtn = document.getElementById('embediq-send');

        bubble.onclick = () => {
            chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
        };

        document.getElementById('embediq-close').onclick = () => {
            chatBox.style.display = 'none';
        };

        function formatText(text) {
            return text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/🔹/g, '<br/>🔹')
                .replace(/\n/g, '<br/>');
        }

        function appendMessage(sender, text) {
            const isAI = sender === "AI";
            const msg = document.createElement('div');
            msg.style.cssText = `margin-bottom:15px; align-self: ${isAI ? 'flex-start' : 'flex-end'}; max-width:80%;`;
            msg.innerHTML = `
                <div style="background:${isAI ? '#eee' : '#4F46E5'}; color:${isAI ? '#333' : 'white'}; padding:10px 14px; border-radius:12px; font-size:14px; line-height:1.5;">
                    ${isAI ? formatText(text) : text}
                </div>
            `;
            messagesContainer.appendChild(msg);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        sendBtn.onclick = async () => {
            const val = input.value.trim();
            if (!val) return;
            appendMessage("You", val);
            input.value = '';

            try {
                const res = await fetch(`${BACKEND_URL}/api/chat/chatbot/${botId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain' },
                    body: val
                });
                const result = await res.json();
                appendMessage("AI", result.data?.bot_answer || result.data?.message || "No response");
            } catch (e) {
                appendMessage("AI", "Error: Could not reach server.");
            }
        };
    }

    if (document.readyState === 'complete') createWidget();
    else window.addEventListener('load', createWidget);
})();