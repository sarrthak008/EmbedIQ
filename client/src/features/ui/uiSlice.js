import {createSlice} from "@reduxjs/toolkit"
import { handelLoader ,handelAddBotModel ,handelGuideModel} from "./UiReducers";

const initialState = {
   isLoaderActive : false,
   isAddModelBotActive : false,
   isGuideOpen : true
}


const  uiSlice = createSlice({
     name: "ui",
     initialState,
     reducers:{
        setLoader : handelLoader,
        setAddModel :handelAddBotModel,
        setGuideOpen : handelGuideModel
     }
})


export default uiSlice.reducer;

export const {setLoader , setAddModel  , setGuideOpen} = uiSlice.actions;