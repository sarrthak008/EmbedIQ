(function() {
    // 1. Extract Bot ID
    const scriptTag = document.currentScript || document.querySelector('script[src*="embediq.js"]');
    const botId = scriptTag ? scriptTag.getAttribute('data-bot-id').trim() : null;

    if (!botId) {
        console.error("EmbedIQ: Bot ID missing.");
        return;
    }

    const BACKEND_URL = "http://localhost:8080";

    function createWidget() {
        const container = document.createElement('div');
        container.id = 'embediq-widget';
        container.innerHTML = `
            <div id="embediq-bubble" style="position:fixed; bottom:20px; right:20px; width:60px; height:60px; background:#4F46E5; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:9999; box-shadow:0 4px 10px rgba(0,0,0,0.2);">
                <span style="color:white; font-size:24px;">💬</span>
            </div>
            <div id="embediq-chat-box" style="display:none; position:fixed; bottom:90px; right:20px; width:350px; height:450px; background:white; border-radius:12px; box-shadow:0 5px 20px rgba(0,0,0,0.2); z-index:9999; flex-direction:column; overflow:hidden; font-family: sans-serif;">
                <div style="background:#4F46E5; color:white; padding:15px; font-weight:bold;">Chat Support</div>
                <div id="embediq-messages" style="flex:1; padding:15px; overflow-y:auto; font-size:14px; background:#f9f9f9;"></div>
                <div style="padding:10px; border-top:1px solid #eee; display:flex;">
                    <input type="text" id="embediq-input" placeholder="Type a message..." style="flex:1; border:1px solid #ddd; padding:8px; border-radius:4px; outline:none;">
                    <button id="embediq-send" style="margin-left:5px; background:#4F46E5; color:white; border:none; padding:8px 15px; border-radius:4px; cursor:pointer;">Send</button>
                </div>
            </div>
        `;
        document.body.appendChild(container);

        const bubble = document.getElementById('embediq-bubble');
        const chatBox = document.getElementById('embediq-chat-box');
        const sendBtn = document.getElementById('embediq-send');
        const input = document.getElementById('embediq-input');
        const messagesContainer = document.getElementById('embediq-messages');

        // Toggle Chat Box
        bubble.onclick = () => {
            chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
        };

        // Send Message Logic
        sendBtn.onclick = async () => {
            const question = input.value.trim();
            if (!question) return;

            appendMessage("You", question);
            input.value = '';

            try {
                // CALLING YOUR POST API
                const response = await fetch(`${BACKEND_URL}/api/chat/chatbot/${botId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain' },
                    body: question
                });

                const result = await response.json();
                console.log(result);
                // result.data is your ChatResponse object
                appendMessage("AI", result.data.bot_answer || result.data.message);
            } catch (err) {
                appendMessage("System", "Error connecting to server.");
                console.error(err);
            }
        };

        function appendMessage(sender, text) {
            const msg = document.createElement('div');
            msg.style.marginBottom = '10px';
            msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
            messagesContainer.appendChild(msg);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    if (document.readyState === 'complete') createWidget();
    else window.addEventListener('load', createWidget);
})();