import React, { useState } from 'react'
import AdminSidebar from '../components/adminDashboard/AdminSidebar'
import MainContextHolder from '../components/userDashbord/MainContextHolder'
import AdminDashboard from '../components/adminDashboard/AdminDashboard';
import UserDirectory from '../components/adminDashboard/UserDirectory';
import GlobalBots from '../components/adminDashboard/GlobalBots';
import UserAuditReports from '../components/adminDashboard/UserAuditReports';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [open, setOpen] = useState(true);
  const [activeView, setActiveView] = useState("DASHBOARD");
  const navigate = useNavigate()

  const checkIsAdmin =()=>{
      let user = JSON.parse(localStorage.getItem("USER"))
      if(user?.role !== "ADMIN"){
         navigate("/")
      }
  }

  useEffect(()=>{
     checkIsAdmin();
  },[])

  return (
    <div>
      <AdminSidebar 
        open={open} 
        setOpen={setOpen} 
        activeView={activeView} 
        setActiveView={setActiveView} 
      />
      <MainContextHolder open={open} setOpen={setOpen}>
         { activeView == "DASHBOARD" && <AdminDashboard/> }
         {activeView == "USERS" && <UserDirectory/> }
         {activeView == "BOTS" && <GlobalBots/>}
         {activeView == "REPORTS" && <UserAuditReports/>}
      </MainContextHolder>
    </div>
  )
}

export default Admin