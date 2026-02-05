import { createSlice } from "@reduxjs/toolkit"
import { openBotInfo } from "./BotReducer"


const getInitialBotId = () => {
    try {
        const savedBots = localStorage.getItem("BOTS");
        if (!savedBots) return null;

        const parsed = JSON.parse(savedBots);
        return parsed[0]?.bot_id || null;
    } catch (e) {
        console.error("Failed to parse BOTS from localStorage", e);
        return null;
    }
};


const initialState = {
    openBOTid: getInitialBotId()
}

const botSlice = createSlice({
    name: "bot",
    initialState,
    reducers: {
        setOpenBotId: openBotInfo
    }
})

export const { setOpenBotId } = botSlice.actions;

export default botSlice.reducer;