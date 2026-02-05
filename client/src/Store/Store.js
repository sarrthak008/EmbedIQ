import {configureStore} from "@reduxjs/toolkit"
import uiReducer from "../features/ui/uiSlice"
import AuthReducer from "../features/Auth/AuthSlice"
import BotReducer from "../features/Bot/BotSlice"

const Store = configureStore({
    reducer: {
        ui:uiReducer,
        auth:AuthReducer,
        bot : BotReducer
    }
})


export default Store    