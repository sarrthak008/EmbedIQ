import React, { useEffect, useState } from "react";
import { 
  Trash2, Search, UserPlus, ArrowUpRight, 
  ChevronRight, MoreVertical, ShieldCheck, 
  Circle, Mail, Filter
} from "lucide-react";
import AdminServices from "../../Services/AdminServices";
import ROBOT from "../../assets/robot.png"
import {toast} from "sonner"

const UserDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUsers] = useState([]);
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  const loadUsers = async () => {
     try {
       let data = await AdminServices.getAllUsers();
       if(data.success){
         setUsers(data.data.data)
       }
     } catch (error) {
       console.log(error)
     }
  }

  useEffect(() => {
    loadUsers()
  }, []);

  const handleLoginAction = async (mail) => {
    let id = toast.loading("Goasting...")
  try {
    let response = await AdminServices.goastUser(mail);
    if (response.success) {
      const token = response.data.data;
      const ghostSession = {
        token: token,
        email: mail,
        role: "USER",
        isGhost: true
      };
      localStorage.setItem("IMPERSONATED_USER", JSON.stringify(ghostSession));
      toast.success("Ghost mode actived ",{id})
      window.location.href = "/dashboard"; 
    } else {
      toast.error("Ghosting failed: " + response.message,{id});
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  const handleDeleteAction = async (mail) => {
    let id = toast.loading("deleting user...")
    try {
       let responce = await AdminServices.deleteUser(mail);
       if(responce.success){
        toast.success("user delete sucessfully",{id})
       }
       loadUsers()
    } catch (error) {
      toast.error(error.message,{id})
      console.log(error)
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen text-[#1a1a1a] font-sans selection:bg-black selection:text-white relative">
      <div className="max-w-[1200px] mx-auto px-8 py-16">
        
        {/* --- 1. MINIMAL HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100">
              <ShieldCheck size={14} className="text-black" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Access Management</span>
            </div>
            <h1 className="text-6xl font-semibold tracking-[-0.04em] neo">Users</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search database..."
                className="pl-12 pr-6 py-3.5 bg-gray-50 border-none rounded-2xl w-full md:w-80 focus:ring-2 focus:ring-black/5 outline-none text-sm transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </header>

        {/* --- 2. THE TABLE-LIST --- */}
        <div className="space-y-1">
          <div className="grid grid-cols-12 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
            <div className="col-span-5 text-left">Member</div>
            <div className="col-span-3">Role & Access</div>
            <div className="col-span-4 text-right">Actions</div>
          </div>

          <div className="space-y-3">
            {user
              .filter(u => u.email.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((userItem, i) => (
              <div 
                key={i} 
                className="group grid grid-cols-12 items-center px-8 py-6 bg-white border border-gray-100 rounded-md hover:border-black hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-300"
              >
                <div className="col-span-5 flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-sm font-bold group-hover:bg-black group-hover:text-white transition-all duration-500">
                    {userItem.email.split("")[0].toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold tracking-tight">{userItem.email?.split("@")[0]}</span>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Mail size={12} /> {userItem.email}
                    </span>
                  </div>
                </div>

                <div className="col-span-3 flex flex-col gap-1.5">
                  <span className="text-xs font-bold px-2.5 py-1 bg-gray-50 border border-gray-100 w-fit rounded-lg uppercase tracking-wider text-gray-600">
                    {userItem.role}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Circle size={8} className={'fill-green-500 text-green-500'} />
                    {"Active"}
                  </div>
                </div>

                { userItem.role == "USER" && <div className="col-span-4 flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => { setActiveUser(userItem); setShowLoginModal(true); }}
                    className="flex items-center gap-1 px-4 py-2 bg-gray-50 hover:bg-black hover:text-white rounded-xl text-xs font-bold transition-all"
                  >
                    LOGIN <ArrowUpRight size={14} />
                  </button>
                  <button 
                    onClick={() => { setActiveUser(userItem); setShowDeleteModal(true); }}
                    className="p-2.5 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>}
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-gray-50 flex items-center justify-between text-gray-400">
          <p className="text-xs font-medium">Showing <span className="font-bold text-green-400 text-xl">{ user.length }</span> unique identities</p>
        </footer>
      </div>

      {/* --- LOGIN MODAL --- */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6 transition-all">
          <div className="bg-white rounded-md w-full max-w-md p-10 relative overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            {/* Robot Image Background */}
            <img 
              src={ROBOT} 
              className="absolute -right-16 -bottom-16 w-64 h-72 opacity-[0.5] grayscale pointer-events-none" 
              alt="robot"
            />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold tracking-tighter mb-2">Impersonate</h3>
              <p className="text-gray-500 mb-8 text-sm">You are about to log in as <span className="text-black font-semibold">{activeUser?.email}</span>. Are you sure?</p>
              <div className="flex gap-4">
                <button onClick={() => setShowLoginModal(false)} className="flex-1 py-4 text-xs font-black uppercase tracking-widest bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all">Cancel</button>
                <button onClick={()=>handleLoginAction(activeUser?.email)} className="flex-1 py-4 text-xs font-black uppercase tracking-widest bg-black text-white rounded-2xl hover:shadow-lg transition-all">Authorize</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE MODAL --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6 transition-all">
          <div className="bg-white rounded-md w-full max-w-md p-10 relative overflow-hidden shadow-2xl animate-in zoom-in duration-300 border border-red-50">
             {/* Robot Image Background */}
             <img 
              src={ROBOT} 
              className="absolute -right-16 -bottom-16 w-64 h-72 opacity-[0.6] grayscale pointer-events-none" 
              alt="robot"
            />

            <div className="relative z-10">
              <h3 className="text-3xl font-bold tracking-tighter mb-2 text-red-600">Terminate</h3>
              <p className="text-gray-500 mb-8 text-sm">This will permanently remove <span className="text-black font-semibold">{activeUser?.email}</span> from the database. This cannot be undone.</p>
              <div className="flex gap-4">
                <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-4 text-xs font-black uppercase tracking-widest bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all">Go Back</button>
                <button onClick={()=>handleDeleteAction(activeUser?.email)} className="flex-1 py-4 text-xs font-black uppercase tracking-widest bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-200">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDirectory;