import { useState } from "react";
import {
  Home,
  Bot,
  Upload,
  Code,
  MessageSquare,
  BarChart,
  Settings,
  LogOut,
  Menu
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true); // ✅ default open

  return (
    <aside
      className={`h-screen bg-gradient-to-br from-gray-400 to-gray-200 border-r
      flex flex-col transition-all duration-300
      ${open ? "w-[230px]" : "w-[70px]"}`}
    >

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-4">
        {open && (
          <div className="text-2xl neo font-bold">
            EmbedIQ
          </div>
        )}

        <Menu
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 mt-4 px-2 space-y-4 text-sm font-semibold">
        <NavItem icon={<Home size={18} />} label="Dashboard" open={open} active />
        <NavItem icon={<Bot size={18} />} label="My Chatbots" open={open} />
        <NavItem icon={<Upload size={18} />} label="Upload Data" open={open} />
        <NavItem icon={<Code size={18} />} label="Embed / CDN" open={open} />
        <NavItem icon={<MessageSquare size={18} />} label="Chat History" open={open} />
        <NavItem icon={<BarChart size={18} />} label="Analytics" open={open} />
        <NavItem icon={<Settings size={18} />} label="Settings" open={open} />
      </nav>

      {/* USER */}
      <div className="border-t p-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
            S
          </div>

          {open && (
            <div className="flex-1">
              <p className="text-sm font-medium">Sarthak</p>
              <p className="text-xs text-gray-500">User</p>
            </div>
          )}

          <LogOut
            size={18}
            className="text-gray-500 cursor-pointer hover:text-red-500"
          />
        </div>
      </div>
    </aside>
  );
}

/* NAV ITEM */
function NavItem({ icon, label, open, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer
        ${active
          ? "bg-black text-white"
          : "text-gray-700 hover:bg-gray-300"
        }`}
    >
      {icon}
      {open && <span>{label}</span>}
    </div>
  );
}
