(function() {
    // ... [Keep your Bot ID extraction and createWidget initialization as they are] ...

    function createWidget() {
        // ... [Inside your container.innerHTML, update the messages style slightly] ...
        // Change #embediq-messages padding to 10px and add a gap
        
        function formatText(text) {
            // 1. Handle Bold: **text** -> <strong>text</strong>
            text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            // 2. Handle Bullet Points: 🔹 or - -> New line with icon
            text = text.replace(/🔹/g, '<br/>🔹');
            // 3. Handle Line Breaks: \n -> <br/>
            text = text.replace(/\n/g, '<br/>');
            return text;
        }

        function appendMessage(sender, text) {
            const isAI = sender === "AI";
            const msg = document.createElement('div');
            
            // Container styling for the message bubble
            msg.style.marginBottom = '15px';
            msg.style.display = 'flex';
            msg.style.flexDirection = 'column';
            msg.style.alignItems = isAI ? 'flex-start' : 'flex-end';

            msg.innerHTML = `
                <div style="font-size: 11px; color: #666; margin-bottom: 2px; padding: 0 5px;">
                    ${sender}
                </div>
                <div style="
                    max-width: 85%; 
                    padding: 10px 14px; 
                    border-radius: ${isAI ? '2px 12px 12px 12px' : '12px 12px 2px 12px'};
                    background: ${isAI ? '#f0f0f0' : '#4F46E5'};
                    color: ${isAI ? '#333' : 'white'};
                    line-height: 1.5;
                    font-size: 13px;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                ">
                    ${isAI ? formatText(text) : text}
                </div>
            `;
            
            messagesContainer.appendChild(msg);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // Send Message Logic (Improved to show "typing..." feel)
        sendBtn.onclick = async () => {
            const question = input.value.trim();
            if (!question) return;

            appendMessage("You", question);
            input.value = '';

            try {
                // Show a temporary typing indicator if you like, or just wait for fetch
                const response = await fetch(`${BACKEND_URL}/api/chat/chatbot/${botId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain' },
                    body: question
                });

                const result = await response.json();
                
                // Handle different possible response structures
                const aiResponse = result.data?.bot_answer || result.data?.message || result.message;
                appendMessage("AI", aiResponse);
                
            } catch (err) {
                appendMessage("System", "⚠️ Connection lost. Please try again.");
                console.error(err);
            }
        };
    }
})();