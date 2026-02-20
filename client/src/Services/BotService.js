import api from "../../config/api";

const defaultData = "You are EmbedIQ AI, a high-performance, architecture-focused intelligence system. Your expertise lies in vector embeddings, RAG (Retrieval-Augmented Generation), data orchestration, and seamless AI integration."

const BotService = {

  addNewBot: async (bot_name, bot_description, bot_data = defaultData) => {
    try {

      if (!bot_name || !bot_description) {
        return { success: false, message: "Bot name and description are required." };
      }

      let response = await api.post("/api/bot/new", {
        bot_name,
        bot_description,
        bot_data
      }, { withCredentials: true });

      if (response.data.success) {
        return { success: true, data: response.data.data };
      } else {
        console.log("error", response.data)
        return { success: false, message: response.data.message };
      }

    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to create bot" };
    }
  },

  getMyBots: async () => {
    try {
      let response = await api.get("/api/bot/mybot", { withCredentials: true });
      // console.log("MY_BOTS_RESPONSE", response.data);
      if (response.data.success) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error("GET_MY_BOTS_ERROR", error);
      return { success: false, message: error.response?.data?.message || "Failed to fetch bots" };
    }
  },

  loadBot: async (botId) => {
    try {
      if (!botId) {
        alert("Bot ID is required to load bot information.");
        return;
      }
      let response = await api.get(`/api/bot/get/${botId}`, { withCredentials: true });
      // console.log(response.data)
      if (response.data.success) {
        return { success: true, data: response.data.data };
      }
    } catch (error) {
      return {
        success: false, message: error.response?.data?.message || "Failed to load bot information."
      }
    }
  },

  changeBotStatus: async (botId) => {
    try {
      if (!botId) {
        return { success: false, message: "Bot ID is required." };
      }
      let response = await api.get(`api/bot/updatestatus/${botId}`, { withCredentials: true });

      // console.log("CHANGE_BOT_STATUS_RESPONSE", response.data);

      if (response.data.success) {
        return { success: true, data: response.data.message }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      return {
        success: false, message: error.response?.data?.message || "Failed to change bot status."
      }
    }
  },

  loadBotAnalytics: async (botId) => {
    try {
      if (!botId) {
        return { success: false, message: "Bot ID is required." };
      }
      let response = await api.get(`/api/bot/states/${botId}`, { withCredentials: true });

      if (response.data.success) {
        return { success: true, data: response.data.data }
      } else {
        return { success: false, message: response.data.message }
      }

    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to load bot analytics." }
    }
  },

  updateBot: async (botId, updates) => {
    try {

      if (!botId) {
        return { success: false, message: "Bot ID is required." }
      }

      for (let key in updates) {
        if (updates[key] === undefined || updates[key] === null || updates[key] === "") {
          delete updates[key];
        }
      }

      let response = await api.put(`/api/bot/update/${botId}`, updates, { withCredentials: true });
      if (response.data.success) {
        return { success: true, data: response.data.data }
      } else {
        return { success: false, message: response.data.message }
      }

    } catch (error) {
      console.log("UPDATE_BOT_ERROR", error);
      return { success: false, message: error.response?.data?.message || "Failed to update bot." }
    }
  },

  loadBotCharts: async (botId) => {
    try {
      if (!botId) {
        return { success: false, message: "Bot ID is required." }
      }

     
      let response = await api.get(`/api/chat/chart/${botId}`, { withCredentials: false });
      // console.log("LOAD_BOT_CHARTS_RESPONSE", response.data);

      if (response.data.success) {
        return { success: true, data: response.data.data }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      return {
        success: false, message: error.response?.data?.message || "Failed to load bot charts."
      }
    }

  },

  deleteBot: async (botId) => {
    try {
      if (!botId) {
        return { success: false, message: "Bot ID is required." }
      }
      let response = await api.delete(`/api/bot/delete/${botId}`, { withCredentials: true });
      if (response.data.success) {
        return { success: true, data: response.data.message }
      } else {
        return { success: false, message: response.data.message }
      }
    }
    catch (error) {
      return {
        success: false, message: error.response?.data?.message || "Failed to delete bot."
      }
    }
  },

  getUserPlanStatement: async(email)=>{
     try {
       let response = await api.get(`/api/auth/me/${email}`);
        if (response.data.success) {
          return { success: true, data: response.data.data }
        } else {
          return { success: false, message: response.data.message }
        }
     } catch (error) {
      return{
        success: false, message: error.response?.data?.message || "Failed to get plan statement."
      }
     }
  },

  getBotChat: async(botId)=>{
     try {
      if (!botId) {
        return { success: false, message: "Bot ID is required." }
      }
     const response = await api.get(`/api/bot/recent/${botId}`);
      if (response.data.success) {
        return { success: true, data: response.data.data }
      } else {
        return { success: false, message: response.data.message }
      }
     } catch (error) {
      return {
        success: false, message: error.response?.data?.message || "Failed to get bot chat history."
      }
     }
  },

  getBotCount:async()=>{
     try {
      const response = await api.get("/api/chat/botcount");
      if (response.data.success) {
        return { success: true, data: response.data.data }
      } else {
        return { success: false, message: response.data.message }
      }
     } catch (error) {
      return {success : false, message: error.response?.data?.message || "Failed to get bot count." }
     }
  }
}



export { BotService };