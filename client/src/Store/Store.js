import {configureStore} from "@reduxjs/toolkit"
import uiReducer from "../features/ui/uiSlice"

const Store = configureStore({
    reducer: {
        uiReducer
    }
})


export default Store    