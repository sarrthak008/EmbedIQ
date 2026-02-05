import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown"; // Import the library
import { BotService } from "../../Services/BotService";

// Styled Chat Bubble Component
function ChatBubble({ q, a }) {
  return (
    <div className="flex flex-col space-y-4 mb-8">
      {/* User Message - Right Aligned */}
      <div className="self-end max-w-[85%] bg-black text-white rounded-2xl rounded-tr-none p-4 shadow-md">
        <p className="font-bold text-[10px] uppercase tracking-widest mb-1 opacity-70">You</p>
        <p className="text-sm leading-relaxed">{q}</p>
      </div>

      {/* Bot Response - Left Aligned */}
      <div className="self-start max-w-[95%] bg-white text-gray-800 rounded-2xl rounded-tl-none p-5 shadow-sm border border-gray-200">
        <p className="font-bold text-[10px] uppercase tracking-widest mb-2 text-blue-600">Assistant</p>
        
        {/* ReactMarkdown renders the bot_answer into HTML */}
        <div className="markdown-container text-sm leading-relaxed prose prose-sm max-w-none">
          <ReactMarkdown>{a}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

const ChatTab = ({ botId }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadChat = async () => {
    if (!botId) return;
    setLoading(true);
    try {
      const response = await BotService.getBotChat(botId);
      if (response.success) {
        setChats(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChat();
  }, [botId]);

  return (
    <div className="bg-gray-50 border border-gray-300 rounded-2xl flex flex-col h-[650px] shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <div className="flex items-center space-x-2">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <h3 className="font-bold text-gray-800">Live Chat Logs</h3>
        </div>
        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-bold uppercase">24H Window</span>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {loading && (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        )}

        {error && <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">{error}</div>}

        {!loading && chats.length === 0 && (
          <div className="text-gray-400 text-center mt-20 italic">No messages found for this bot.</div>
        )}

        {!loading && chats.map((chat) => (
          <ChatBubble 
            key={chat.chat_id} 
            q={chat.user_question} 
            a={chat.bot_answer} 
          />
        ))}
      </div>
    </div>
  );
};

export default ChatTab;