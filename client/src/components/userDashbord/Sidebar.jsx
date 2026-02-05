import React, { useEffect, useState } from "react";
import { Menu, Plus, Bot, FileText, LogOut, RefreshCcw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAddModel, setGuideOpen } from "../../features/ui/uiSlice";
import { BotService } from "../../Services/BotService";
import { setOpenBotId } from "../../features/Bot/BotSlice";
import LogOutComp from "./LogOut";
import UsageBar from "./UsageBar";

const FooterItem = ({ icon, label, open, onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 rounded-lg
      text-gray-600 hover:bg-gray-200 cursor-pointer text-sm transition-colors"
    >
      {icon}
      {open && <span className="truncate">{label}</span>}
    </div>
  );
};

const Sidebar = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [bots, setBots] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [plan, setPlan] = useState({});

  // Get user data from Redux
  const user = useSelector((state) => state.auth.user);
  const email = user?.email || "User";
  const role = user?.role || "Member";

  const loadMyBots = async () => {
    try {
      setRefresh(true);
      let response = await BotService.getMyBots();
      if (response.success) {
        localStorage.setItem("BOTS", JSON.stringify(response.data));
        const botNames = response.data.map((b) => ({ name: b.bot_name, id: b.bot_id }));
        setBots(botNames);
      }
    } catch (error) {
      console.error("BOTS_ERR", error);
    } finally {
      setRefresh(false);
    }
  };

  const loadPlanInfo = async () => {
    try {
      let response = await BotService.getUserPlanStatement(email);
      if (response.success) {
        setPlan(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadMyBots();
    loadPlanInfo();
  }, []);

  const handleOpenBot = (id) => {
    dispatch(setOpenBotId({ id: id }));
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#f6f8faf5] border-r
      flex flex-col transition-all duration-300 ease-in-out z-40
      ${open ? "w-[260px]" : "w-[72px]"}`}
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 px-4 py-4">
        <Menu size={20} className="cursor-pointer" onClick={() => setOpen(!open)} />
        {open && <span className="text-3xl font-bold tracking-tight neo">EmbedIQ</span>}
      </div>

      {/* NEW BOT BUTTON */}
      <div className="px-3 mb-3">
        <button
          className="w-full cursor-pointer flex items-center gap-2 px-3 py-2 rounded-sm
          bg-black text-white text-sm font-medium justify-center hover:bg-gray-800 transition-colors"
          onClick={() => dispatch(setAddModel({ isAddModelBotActive: true }))}
        >
          <Plus size={16} />
          {open && "New Bot"}
        </button>
      </div>

      {/* BOT LIST */}
      <div className="flex-1 overflow-y-auto px-2">
        {open && (
          <p className="text-xs uppercase px-2 mb-2 flex items-center justify-between">
            <span className="text-gray-400">My Bots</span>
            <span 
              onClick={() => loadMyBots()} 
              className={`cursor-pointer ${refresh ? "animate-spin" : ""}`}
            >
              <RefreshCcw size={12} />
            </span>
          </p>
        )}

        {bots.map((bot, i) => (
          <div
            onClick={() => handleOpenBot(bot.id)}
            key={i}
            className="flex items-center gap-3 px-3 py-2 rounded-lg
            cursor-pointer text-sm mb-1 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <Bot size={16} />
            {open && <span className="truncate">{bot.name}</span>}
          </div>
        ))}
      </div>

      {/* PLAN SECTION */}
      <div className="px-3 py-3 border-t">
        {open && (
          <>
            <p className="text-xs text-gray-400 mb-1">Plan</p>
            <p className="text-sm font-medium uppercase">{plan?.type || "FREE"}</p>
            <UsageBar totalBotChats={plan?.totalBotChats} planMaxMessages={plan.planMaxMessages}/>
            <button
              onClick={() => navigate("/plans")}
              className="mt-4 w-full h-[44px] rounded-sm bg-black text-white text-sm font-semibold hover:opacity-90 transition"
            >
              Upgrade Plan
            </button>
          </>
        )}
      </div>

      {/* FOOTER */}
      <div className="relative border-t px-3 py-3 space-y-1">
        <FooterItem 
          icon={<FileText size={16} />} 
          label="Guide" 
          open={open} 
          onClick={() => dispatch(setGuideOpen({ isGuideOpen: true }))} 
        />
        
        <FooterItem 
          icon={<LogOut size={16} />} 
          label="Logout" 
          open={open} 
          onClick={() => setIsLogout(!isLogout)} 
        />

        {/* LOGOUT POPUP */}
        {isLogout && (
          <LogOutComp 
            email={email} 
            role={role} 
            onClose={() => setIsLogout(false)} 
          />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;