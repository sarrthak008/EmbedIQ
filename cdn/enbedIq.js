(function() {
    const scriptTag = document.currentScript || document.querySelector('script[src*="enbedIq.js"]');
    const botId = scriptTag ? scriptTag.getAttribute('data-bot-id')?.trim() : null;
    const BACKEND_URL = "https://emotional-aviva-embediq-da7f59e7.koyeb.app"; 
    const STORAGE_KEY = `eiq_settings_${botId}`;

    if (!botId) return;

    const chatSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width:26px; height:26px;"><path d="M20.7134 8.12811L20.4668 8.69379C20.2864 9.10792 19.7136 9.10792 19.5331 8.69379L19.2866 8.12811C18.8471 7.11947 18.0555 6.31641 17.0677 5.87708L16.308 5.53922C15.8973 5.35653 15.8973 4.75881 16.308 4.57612L17.0252 4.25714C18.0384 3.80651 18.8442 2.97373 19.2761 1.93083L19.5293 1.31953C19.7058 0.893489 20.2942 0.893489 20.4706 1.31953L20.7238 1.93083C21.1558 2.97373 21.9616 3.80651 22.9748 4.25714L23.6919 4.57612C24.1027 4.75881 24.1027 5.35653 23.6919 5.53922L22.9323 5.87708C21.9445 6.31641 21.1529 7.11947 20.7134 8.12811ZM20 11C20.6986 11 21.3694 10.8806 21.9929 10.6611C21.9976 10.7735 22 10.8865 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3H14C14.1135 3 14.2265 3.00237 14.3389 3.00705C14.1194 3.63061 14 4.30136 14 5C14 8.31371 16.6863 11 20 11Z"></path></svg>`;
    const sendIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:20px; height:20px;"><path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    function createWidget() {
        const container = document.createElement('div');
        container.id = 'embediq-widget';
        container.innerHTML = `
            <style>
                #eiq-box {
                    display:none; position:fixed; bottom:95px; right:20px; width:350px; max-width:90vw; height:480px; 
                    background: #f8f9fd; 
                    background-image: radial-gradient(at 99% 2%, hsla(252,84%,95%,1) 0, transparent 50%), radial-gradient(at 1% 99%, hsla(252,84%,95%,1) 0, transparent 50%);
                    border-radius: 32px; box-shadow: 0 25px 80px rgba(0,0,0,0.15); 
                    z-index: 99999; flex-direction: column; overflow: hidden; 
                    font-family: 'Inter', sans-serif; border: 1px solid rgba(255,255,255,0.8); transition: transform 0.3s ease;
                }
                .eiq-dark-mode #eiq-box {
                    background-color: #0b0b0f;
                    background-image: radial-gradient(at 99% 2%, hsla(260,30%,15%,1) 0, transparent 50%), radial-gradient(at 1% 99%, hsla(260,30%,10%,1) 0, transparent 50%);
                    border: 1px solid rgba(255,255,255,0.05);
                }
                #eiq-msgs { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; scrollbar-width: none; }
                #eiq-msgs::-webkit-scrollbar { display: none; }

                #eiq-welcome-area { padding: 40px 30px 20px 30px; }
                .eiq-bot-name { font-size: 28px; font-weight: 500; color: #7c74f5; margin-bottom: 5px; opacity: 0.9; }
                .eiq-welcome-msg { font-size: 36px; font-weight: 700; color: #1a1a2e; line-height: 1.1; letter-spacing: -1px; }
                .eiq-dark-mode .eiq-welcome-msg { color: gray; }

                #eiq-footer-container { padding: 20px; }
                #eiq-footer {
                    padding: 8px 8px 8px 20px; background: rgba(255,255,255,0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
                    display: flex; align-items: center; border-radius: 30px; border: 1px solid rgba(0,0,0,0.03); box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                }
                .eiq-dark-mode #eiq-footer { background: rgba(30,30,35,0.8); border: 1px solid rgba(255,255,255,0.05); }
                
                #eiq-input { flex: 1; border: none; background: transparent; outline: none; font-size: 15px; color: inherit; padding: 12px 0; }
                #eiq-send-btn { background: #7c74f5; color: #fff; border: none; width: 46px; height: 46px; border-radius: 50%; cursor: pointer; display:flex; align-items:center; justify-content:center; }

                .eiq-msg { padding: 16px 20px; border-radius: 22px; font-size: 15px; line-height: 1.5; max-width: 82%; }
                .eiq-ai { background: white; color: #1a1a2e; align-self: flex-start; border-radius: 22px 22px 22px 6px; box-shadow: 0 5px 15px rgba(0,0,0,0.02); }
                .eiq-dark-mode .eiq-ai { background: #1e1e24; color: #ffffff; }
                .eiq-user { background: #7c74f5; color: white; align-self: flex-end; border-radius: 22px 22px 6px 22px; }

                .eiq-typing { display: flex; gap: 5px; padding: 15px; align-self: flex-start; }
                .eiq-dot { width: 7px; height: 7px; background: #7c74f5; border-radius: 50%; animation: eiqB 1.4s infinite; opacity: 0.6; }
                @keyframes eiqB { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }
            </style>

            <div id="eiq-bubble" style="position:fixed; bottom:30px; right:25px; width:60px; height:60px; background:#1a1a2e; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:99999; box-shadow:0 15px 35px rgba(0,0,0,0.2);">
                <span style="color:white;">${chatSvg}</span>
            </div>

            <div id="eiq-box">
                <div style="padding: 25px 25px 0 25px; display: flex; justify-content: flex-end;">
                    <span id="eiq-close" style="cursor:pointer; font-size: 20px; color: #999;">✕</span>
                </div>
                <div id="eiq-welcome-area">
                    <div class="eiq-bot-name" id="eiq-display-name">EmbedIQ</div>
                    <div class="eiq-welcome-msg" id="eiq-display-welcome">How can I help<br>you today?</div>
                </div>
                <div id="eiq-msgs"></div>
                <div id="eiq-footer-container">
                    <div id="eiq-footer">
                        <input type="text" id="eiq-input" placeholder="Ask me anything...">
                        <button id="eiq-send-btn">${sendIcon}</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(container);

        const bubble = document.getElementById('eiq-bubble');
        const chatBox = document.getElementById('eiq-box');
        const msgsDiv = document.getElementById('eiq-msgs');
        const input = document.getElementById('eiq-input');
        const sendBtn = document.getElementById('eiq-send-btn');
        const welcomeArea = document.getElementById('eiq-welcome-area');
        const botNameEl = document.getElementById('eiq-display-name');
        const welcomeMsgEl = document.getElementById('eiq-display-welcome');

        function applySettings(data) {
            if (!data) return;
            if (data.bot_name) botNameEl.textContent = data.bot_name;
            if (data.welcome_message) welcomeMsgEl.innerHTML = data.welcome_message.replace(/\n/g, '<br>');
            
            if (data.positon === "LEFT_BOTTOM") {
                bubble.style.right = "auto"; bubble.style.left = "25px";
                chatBox.style.right = "auto"; chatBox.style.left = "25px";
            } else {
                bubble.style.left = "auto"; bubble.style.right = "25px";
                chatBox.style.left = "auto"; chatBox.style.right = "20px";
            }

            if (data.theme === "DARK") chatBox.classList.add('eiq-dark-mode');
            else chatBox.classList.remove('eiq-dark-mode');
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }

        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) applySettings(JSON.parse(saved));

        bubble.onclick = () => chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
        document.getElementById('eiq-close').onclick = () => chatBox.style.display = 'none';

        function appendMsg(sender, text) {
            welcomeArea.style.display = 'none';
            const isAI = sender === "AI";
            const msg = document.createElement('div');
            msg.className = `eiq-msg ${isAI ? 'eiq-ai' : 'eiq-user'}`;
            msg.innerHTML = isAI ? text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') : text;
            msgsDiv.appendChild(msg);
            msgsDiv.scrollTop = msgsDiv.scrollHeight;
        }

        async function handleSend() {
            const val = input.value.trim();
            if (!val) return;
            appendMsg("You", val);
            input.value = '';

            const typing = document.createElement('div');
            typing.className = 'eiq-typing';
            typing.innerHTML = '<div class="eiq-dot"></div><div class="eiq-dot"></div><div class="eiq-dot"></div>';
            msgsDiv.appendChild(typing);
            msgsDiv.scrollTop = msgsDiv.scrollHeight;

            try {
                const res = await fetch(`${BACKEND_URL}/api/chat/chatbot/${botId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain' },
                    body: val
                });
                const result = await res.json();
                typing.remove();
                if (result.success && result.data) {
                    applySettings(result.data);
                    appendMsg("AI", result.data.bot_answer);
                }
            } catch (e) {
                typing.remove();
                appendMsg("AI", "Connection error.");
            }
        }

        sendBtn.onclick = handleSend;
        input.onkeypress = (e) => { if(e.key === 'Enter') handleSend(); };
    }

    if (document.readyState === 'complete') createWidget();
    else window.addEventListener('load', createWidget);
})();