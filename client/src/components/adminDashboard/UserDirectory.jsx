import React, { useEffect, useState } from "react";
import { 
  Trash2, Search, ArrowUpRight, ShieldCheck, 
  Circle, Mail, Filter, AlertTriangle
} from "lucide-react";
import AdminServices from "../../Services/AdminServices";
import ROBOT from "../../assets/robot.png"
import {toast} from "sonner"

const UserSkeleton = () => (
  <div className="grid grid-cols-12 items-center px-8 py-6 bg-gray-50/40 border border-gray-100 rounded-md animate-pulse">
    <div className="col-span-5 flex items-center gap-5">
      <div className="h-14 w-14 rounded-2xl bg-gray-200" />
      <div className="space-y-2">
        <div className="h-5 w-32 bg-gray-200 rounded-md" />
        <div className="h-3 w-48 bg-gray-200 rounded-md opacity-60" />
      </div>
    </div>
    <div className="col-span-3 space-y-2">
      <div className="h-6 w-20 bg-gray-200 rounded-lg" />
      <div className="h-3 w-16 bg-gray-200 rounded-md opacity-60" />
    </div>
    <div className="col-span-4 flex justify-end">
      <div className="h-10 w-24 bg-gray-200 rounded-xl" />
    </div>
  </div>
);

const UserDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  const loadUsers = async () => {
     setLoading(true);
     try {
       let data = await AdminServices.getAllUsers();
       if(data.success) setUsers(data.data.data);
     } catch (error) {
       toast.error("Failed to sync user database");
     } finally {
       setLoading(false);
     }
  }

  useEffect(() => { loadUsers(); }, []);

  const handleLoginAction = async (mail) => {
    let id = toast.loading("Ghosting...");
    try {
      let response = await AdminServices.goastUser(mail);
      if (response.success) {
        localStorage.setItem("IMPERSONATED_USER", JSON.stringify({
          token: response.data.data,
          email: mail,
          role: "USER",
          isGhost: true
        }));
        toast.success("Ghost mode activated", {id});
        window.location.href = "/dashboard"; 
      }
    } catch (error) { toast.error("Ghosting failed", {id}); }
  };

  const handleDeleteAction = async (mail) => {
    let id = toast.loading("Deleting user...");
    try {
       let response = await AdminServices.deleteUser(mail);
       if(response.success){
        toast.success("User deleted successfully", {id});
        loadUsers();
       }
    } catch (error) { toast.error(error.message, {id}); }
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      <div className="max-w-[1200px] mx-auto px-8 py-16">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Access Management</span>
            </div>
            <h1 className="text-6xl font-semibold tracking-[-0.04em] neo">Users</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search database..."
                className="pl-12 pr-6 py-3.5 bg-gray-50 border-none rounded-2xl w-full md:w-80 outline-none text-sm transition-all focus:ring-2 focus:ring-black/5"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="space-y-3 min-h-[400px]">
          {loading ? [...Array(5)].map((_, i) => <UserSkeleton key={i} />) : 
            user.filter(u => u.email.toLowerCase().includes(searchTerm.toLowerCase())).map((userItem, i) => (
              <div key={i} className="group grid grid-cols-12 items-center px-8 py-6 bg-white border border-gray-100 rounded-md hover:border-black transition-all duration-300">
                <div className="col-span-5 flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-sm font-bold group-hover:bg-black group-hover:text-white transition-all">
                    {userItem.email[0].toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold tracking-tight">{userItem.email.split("@")[0]}</span>
                    <span className="text-sm text-gray-400 flex items-center gap-1"><Mail size={12} /> {userItem.email}</span>
                  </div>
                </div>
                <div className="col-span-3 flex flex-col gap-1.5">
                  <span className="text-xs font-bold px-2.5 py-1 bg-gray-50 border border-gray-100 w-fit rounded-lg uppercase tracking-wider">{userItem.role}</span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500"><Circle size={8} className="fill-green-500 text-green-500" /> Active</div>
                </div>
                <div className="col-span-4 flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {userItem.role === "USER" && (
                    <>
                      <button onClick={() => { setActiveUser(userItem); setShowLoginModal(true); }} className="px-4 py-2 bg-gray-50 hover:bg-black hover:text-white rounded-xl text-xs font-bold transition-all">LOGIN <ArrowUpRight size={14} /></button>
                      <button onClick={() => { setActiveUser(userItem); setShowDeleteModal(true); }} className="p-2.5 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                    </>
                  )}
                </div>
              </div>
          ))}
        </div>
      </div>

      {/* MODALS (Login & Delete) - Using standard visibility logic as per your previous snippet */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
          <div className="bg-white rounded-md w-full max-w-md p-10 relative overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <img src={ROBOT} className="absolute -right-16 -bottom-16 w-64 h-72 opacity-[0.5] grayscale pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold tracking-tighter mb-2">Impersonate</h3>
              <p className="text-gray-500 mb-8 text-sm">Log in as <span className="text-black font-semibold">{activeUser?.email}</span>?</p>
              <div className="flex gap-4">
                <button onClick={() => setShowLoginModal(false)} className="flex-1 py-4 text-xs font-black uppercase bg-gray-100 rounded-2xl">Cancel</button>
                <button onClick={()=>handleLoginAction(activeUser?.email)} className="flex-1 py-4 text-xs font-black uppercase bg-black text-white rounded-2xl">Authorize</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDirectory;