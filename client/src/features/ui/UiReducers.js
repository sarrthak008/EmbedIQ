
const handelLoader = (state,action) =>{
     state.isLoaderActive = action.payload.loader
}

const handelAddBotModel = (state,action)=>{
   state.isAddModelBotActive = action.payload.isAddModelBotActive
}

const handelGuideModel = (state,action)=>{
   state.isGuideOpen = action.payload.isGuideOpen
}

export{handelLoader , handelAddBotModel , handelGuideModel}