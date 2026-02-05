import React, { useState, useEffect } from "react"
import Sidebar from "../components/userDashbord/Sidebar"
import MainContextHolder from "../components/userDashbord/MainContextHolder"
import BotDetails from "../components/userDashbord/BotDetails"
import Loader from "../components/Loader"
import AddNewBot from "../components/userDashbord/AddNewBot"
import Guide from "../components/Guide"

import { useDispatch, useSelector } from "react-redux"
import { setAddModel, setGuideOpen } from "../features/ui/uiSlice"
import GhostModeBanner from "../components/userDashbord/GhostModeBanner"


const Dashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true)

  const dispatch = useDispatch()
  const isOpen = useSelector(state => state.ui.isAddModelBotActive)
  const isLoaderActive = useSelector(state => state.ui.isLoaderActive)
  const isGuideOpen = useSelector(state => state.ui.isGuideOpen)

  return (
    <div>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <MainContextHolder open={sidebarOpen} setOpen={setSidebarOpen}>
        <BotDetails />
        {isLoaderActive && <Loader />}
      </MainContextHolder>

      {isGuideOpen &&
        <Guide onClose={() => dispatch(setGuideOpen({ isGuideOpen: false }))} />
      }

      <AddNewBot
        open={isOpen}
        onClose={() => dispatch(setAddModel({ isAddModelBotActive: false }))}
      />

      <GhostModeBanner/>
    </div>
  )
}

export default Dashboard
