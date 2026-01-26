import React, { useState } from 'react'
import Sidebar from '../components/userDashbord/Sidebar'
import MainContextHolder from '../components/userDashbord/MainContextHolder';

const Dashboard = () => {
   const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div>
       <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}/>
       <MainContextHolder open={sidebarOpen} setOpen={setSidebarOpen}>
           <h1>hiiiii</h1>
       </MainContextHolder>
    </div>
  )
}

export default Dashboard