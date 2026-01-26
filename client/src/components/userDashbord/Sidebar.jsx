import { Menu,Plus,Bot,FileText,Settings,LogOut} from "lucide-react";




const FooterItem = ({ icon, label, open })=> {
  return (
    <div
      className="flex items-center gap-3 px-3 py-2 rounded-lg
      text-gray-600 hover:bg-gray-200 cursor-pointer text-sm"
    >
      {icon}
      {open && label}
    </div>
  );
}




// 🔹 Demo bot data (replace with API later)
const bots = [
  { id: 1, name: "Clinic Bot" },
  { id: 2, name: "Support Bot" },
  { id: 3, name: "FAQ Bot" }
];

const Sidebar=({ open, setOpen })=> {
  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#dfe0e1f5] border-r
      flex flex-col transition-all duration-300 ease-in-out z-40
      ${open ? "w-[260px]" : "w-[72px]"}`}
    >

      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3 px-4 py-4">
        <Menu
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
        {open && (
          <span className="text-3xl font-bold tracking-tight neo">
            EmbedIQ
          </span>
        )}
      </div>

      {/* ================= NEW BOT ================= */}
      <div className="px-3 mb-3">
        <button
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-sm
          bg-black text-white text-sm font-medium justify-center`}
        >
          <Plus size={16} />
          {open && "New Bot"}
        </button>
      </div>

      {/* ================= BOT LIST ================= */}
      <div className="flex-1 overflow-y-auto px-2">
        {open && (
          <p className="text-xs uppercase text-gray-400 px-2 mb-2">
            My Bots
          </p>
        )}

        {bots.map((bot) => (
          <div
            key={bot.id}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg
            cursor-pointer text-sm mb-1
            text-gray-700 hover:bg-gray-200`}
          >
            <Bot size={16} />
            {open && bot.name}
          </div>
        ))}
      </div>

      {/* ================= PLAN SECTION ================= */}
      <div className="px-3 py-3 border-t">
        {open && (
          <>
            <p className="text-xs text-gray-400 mb-1">Plan</p>
            <p className="text-sm font-medium">Pro Plan</p>

            {/* Usage bar */}
            <div className="h-1 bg-gray-300 rounded mt-2 overflow-hidden">
              <div className="h-1 bg-black rounded w-[60%]" />
            </div>

            {/* Upgrade Button */}
            <button
              className="mt-4 w-full h-[44px] rounded-s
              bg-black text-white text-sm font-semibold
              hover:opacity-90 transition"
            >
              Upgrade Plan
            </button>
          </>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="border-t px-3 py-3 space-y-1">
        <FooterItem icon={<FileText size={16} />} label="Docs" open={open} />
        <FooterItem icon={<Settings size={16} />} label="Settings" open={open} />
        <FooterItem icon={<LogOut size={16} />} label="Logout" open={open} />
      </div>
    </aside>
  );
}


export default Sidebar;