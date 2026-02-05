import { useEffect, useState } from "react";
import { BRAND_NAME } from "../../../config/default"
import { BotService } from "../../Services/BotService";
import { useDispatch, useSelector } from "react-redux";
import { CopyIcon, RefreshCcw } from "lucide-react"
import { setLoader } from "../../features/ui/uiSlice";
import { toast } from "sonner"
import { Sun, Moon, Monitor } from 'lucide-react';
import KPI from "../BotTabs/KPI";
import OverviewTab from "../BotTabs/OverviewTab";
import ChatTab from "../BotTabs/ChatTab";
import EmbedTab from "../BotTabs/EmbedTab";
import DataTab from "../BotTabs/DataTab";
import SettingsTab from "../BotTabs/SettingsTab";

const BotDetails = () => {
  const [tab, setTab] = useState("chats");
  const [BotBasicInfo, setBotBasicInfo] = useState();
  const [anyanlitics, setAnyanlitics] = useState();
  const [chartData, setChartData] = useState();
  const botId = useSelector(state => state.bot.openBOTid);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch()

  const getBotInfo = async (isLoading = true) => {
    if (botId) {
      dispatch(setLoader({ loader: isLoading }))
      const data = await BotService.loadBot(botId);
      const response = await BotService.loadBotAnalytics(botId);
      const chartResponce = await BotService.loadBotCharts(botId);

      if (response.success) {
        setAnyanlitics(response.data)
        setRefresh(false);
      }

      if (data.success) {
        setBotBasicInfo(data?.data);
        // console.log(BotBasicInfo);
        dispatch(setLoader({ loader: false }))
      }

      if (chartResponce.success) {
        setChartData(chartResponce)
        console.log(chartResponce?.data)
      }
    }
  }

  const handelBotStatus = async () => {
    try {
      const reponce = await BotService.changeBotStatus(botId);
      getBotInfo(reponce)
    } catch (error) {
      console.error(error)
    }
  }

  const RefreshAllInfo =()=>{
    setRefresh(true);
    getBotInfo(false);
  }

  useEffect(() => {
    if (botId) {
      getBotInfo();
    }
  }, [botId]);

  useEffect(() => {

  }, [])

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{BotBasicInfo?.bot_name}  <span className="neo text-3xl ml-3"> ✘ {BRAND_NAME}</span></h1>
          <p className="text-md text-gray-500 mt-3 flex gap-3">
            {BotBasicInfo?.isBotActive ? <span className="text-green-500">Active</span> : <span className="text-red-500">dead</span>} • <span className="text-black flex items-center gap-2 cursor-pointer text-sm">Bot Id  {BotBasicInfo?.bot_id} <CopyIcon size={12} /> </span>
          </p>
          <span className="mt-3 block text-sm text-gray-500"> Created At {BotBasicInfo?.createAt.split("T")[0]}</span>
        </div>

        <div className="flex gap-6 items-center ">

          <span onClick={() => RefreshAllInfo()} className={`cursor-pointer ${refresh ? "animate-spin" : null}`}><RefreshCcw size={16} /></span>
          <button onClick={() => handelBotStatus()} className="px-4 py-2  cursor-pointer border border-gray-400 rounded-md text-sm">
            {BotBasicInfo?.isBotActive ? "Disable" : "Enable"}
          </button>
        </div>
      </div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-4 gap-4">
        <KPI title="Total Conversations" value={anyanlitics?.totalConversations} />
        <KPI title="Last 24 Hours" value={anyanlitics?.last24Hours} />
        <KPI title="Avg Response Time" value="1.2s" />
        <KPI title="Last Active" value={anyanlitics?.lastActive} />
      </div>

      {/* ================= ANALYTICS ================= */}
      <div className="bg-gray-300/40 border-gray-400   border rounded-xl p-6">
        <h2 className="text-lg font-medium mb-4">
          Conversation Activity (Last 24 Hours)
        </h2>

        {/* Simple bar visualization */}
        <div className="flex items-end gap-2 h-48 w-full border-b border-gray-800 pb-2">
          {chartData?.data?.labels.map((label, i) => {
            const value = chartData?.data?.data[i] || 0;
            // Calculate percentage height (e.g., max height is 100%)
            // If your data is high, use: (value / Math.max(...chartData.data.data)) * 100
            const barHeight = Math.min(value * 10, 100);

            return (
              <div key={i} className="group relative flex-1 flex flex-col items-center justify-end h-full">

                {/* Tooltip Label: Visible only on hover */}
                <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 bg-gray-800 text-white text-[10px] py-1 px-2 rounded shadow-lg z-10 whitespace-nowrap">
                  {label}: <span className="font-bold">{value} chats</span>
                  {/* Small arrow below tooltip */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                </div>

                {/* The Bar */}
                <div
                  style={{ height: `${barHeight}%` }}
                  className="w-full bg-gray-900/40 group-hover:bg-gray-900 transition-colors rounded-t-sm cursor-pointer"
                />

                {/* Optional: Small time label below the bar */}
                <span className="text-[8px] text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {label.split(':')[0]} {/* Shows just the hour digit */}
                </span>
              </div>
            );
          })}
          {chartData?.data?.labels?.length == 0 ? <div className="text-md">no logs present </div> : null}
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-6 border-b text-sm">
        {["chats", "data", "embed", "settings"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 capitalize
              ${tab === t
                ? "border-b-2 border-black font-medium"
                : "text-gray-500 hover:text-black"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ================= TAB CONTENT ================= */}
      {/* {tab === "overview" && <OverviewTab />} */}
      {tab === "chats" && <ChatTab botId={botId}/>}
      {tab === "data" && <DataTab botId={botId} botData={BotBasicInfo?.bot_data} />}
      {tab === "embed" && <EmbedTab botId={botId} />}
      {tab === "settings" && <SettingsTab botId={botId} info={BotBasicInfo} />}

    </div>
  );
}

export default BotDetails


