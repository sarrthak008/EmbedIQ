import { Leaf, Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { BotService } from "../../Services/BotService";
import { toast } from "sonner"
import BlurBaground from "../Conainers/BlurBaground";

const SettingsTab = ({ botId, info }) => {
  const [isDeleteComp, setIsDeleteComp] = useState(false);
  const [formData, setFormData] = useState({
    bot_name: "",
    bot_description: "",
    domain: "",
    position: "RIGHT_BOTTOM",
    theme: "DARK"
  });



  useEffect(() => {
    if (info) {
      setFormData({
        bot_name: info.bot_name || "",
        bot_description: info.bot_description || "",
        domain: info.domain || "",
        position: info.position?.toUpperCase() || "RIGHT_BOTTOM",
        theme: info.theme || "system"
      });
    }
  }, [info]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const updates = {};
    Object.keys(formData).forEach((key) => {
      const originalValue = key === 'position'
        ? info?.[key]?.toUpperCase()
        : info?.[key];

      if (formData[key] !== originalValue) {
        updates[key] = formData[key];
      }
    });
    if (Object.keys(updates).length === 0) return;

    try {
      let id = toast.loading("Updating your changes...")
      let data = await BotService.updateBot(botId, updates)
      if (data.success) {
        toast.success("settings updated Refresh Bot!",{id:id})
      }
    } catch (error) {
      console.log(error)
      toast.error(e.message(),{id:id})
    }
  };

  // console.log(formData.position, "hiii")

  if (!info) return <div className="p-6 text-gray-500">Loading settings...</div>;

  return (
    <div className="bg-white border-gray-400 border rounded-xl p-6 space-y-4 text-sm">
      <Field
        label="Bot Name"
        value={formData.bot_name}
        onChange={(e) => handleChange('bot_name', e.target.value)}
      />
      <Field
        label="Bot Description"
        value={formData.bot_description}
        onChange={(e) => handleChange('bot_description', e.target.value)}
      />
      <Field
        label="Enter your domain carefully"
        value={formData.domain}
        onChange={(e) => handleChange('domain', e.target.value)}
      />

      <RadioField
        label="POSITION"
        defaultValue={formData.position}
        options={["RIGHT_BOTTOM", "LEFT_BOTTOM"]}
        onChange={(val) => handleChange('position', val)}
      />

      <ThemeToggle
        label="Bot Theme"
        defaultValue={formData.theme}
        onChange={(val) => handleChange('theme', val)}
      />

      <div className="flex gap-2">
        <button onClick={handleSave} className="px-4 py-2 bg-black text-white rounded-md">
          Save Settings
        </button>
        <button onClick={() => setIsDeleteComp(true)} className="px-4 py-2 border border-red-500 text-red-600 rounded-md">
          Delete Bot
        </button>
      </div>
      {isDeleteComp && <DeleteComp setIsDeleteComp={setIsDeleteComp} botId={botId} botName={info?.bot_name} />}
    </div>
  );
}


export default SettingsTab



function Field({ label, defaultValue, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-gray-600">{label}</label>
      <input
        required
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e)}
        className="w-full border rounded-md px-3 py-2"
      />
    </div>
  );
}

function RadioField({ label, options = [], defaultValue, onChange }) {
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (val) => {
    setSelected(val);
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-gray-600 block text-sm font-medium">
        {label}
      </label>
      <div className="space-y-2">
        {options.map((option, index) => {
          const val = typeof option === 'object' ? option.value : option;
          const lbl = typeof option === 'object' ? option.label : option;
          const isSelected = selected === val;

          return (
            <label
              key={index}
              className={`flex items-center space-x-3 p-2 border rounded-md cursor-pointer transition-colors ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
            >
              <input
                type="radio"
                name={label} // Ensures only one can be picked in a group
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                checked={isSelected}
                onChange={() => handleChange(val)}
              />
              <span className={`text-sm ${isSelected ? 'text-blue-900 font-medium' : 'text-gray-700'}`}>
                {lbl}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function ThemeToggle({ label, defaultValue = 'system', onChange }) {

  const [active, setActive] = useState(defaultValue);

  const options = [
    { value: 'LIGHT', icon: Sun },
    { value: 'AUTO', icon: Monitor },
    { value: 'DARK', icon: Moon },
  ];

  const handleSelect = (val) => {
    setActive(val);
    if (onChange) onChange(val);
  };

  const activeIndex = options.findIndex((o) => o.value === active);

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-gray-600 block text-sm font-medium">
          {label}
        </label>
      )}

      <div className="relative flex items-center bg-gray-100 p-1 rounded-lg w-[132px] border border-gray-200">
        {/* Sliding Background Indicator */}
        <div
          className="absolute h-8 w-10 bg-white rounded-md shadow-sm transition-all duration-300 ease-out"
          style={{
            transform: `translateX(${activeIndex * 40}px)`,
          }}
        />

        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = active === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`relative z-10 w-10 h-8 flex items-center justify-center transition-colors ${isSelected ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </div>
    </div>
  );
}


const DeleteComp = ({ botName = "botname", onDelete, setIsDeleteComp, botId }) => {
  const [confirmationText, setConfirmationText] = useState('');
  const requiredString = `${botName}/embediq`;

  // Check if the input matches exactly
  const isConfirmed = confirmationText === requiredString;

  const handelDelete = async () => {
    let id = toast.loading("Process your Request...")
    try {
      let responce = await BotService.deleteBot(botId);
      if (responce.success) {
        toast.success(responce.message || "bot delete sucessfully",{id:id});
        setIsDeleteComp(false);
      } else {
        toast.error(responce.message,{id:id})
      }
    } catch (error) {
      toast.error(error.message(),{id:id});
    }
  }

  return (
    <BlurBaground className="left-0 flex items-center justify-center bg-white/30 backdrop-blur-md">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-100">
        {/* Header */}
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
          Delete Bot
        </h2>

        {/* Warning Message */}
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          This action is irreversible. If you delete this bot,
          <span className="font-semibold text-red-600"> your bot data will be deleted permanently.</span>
        </p>

        {/* Input Section */}
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
            Type <span className="text-gray-900 select-all">{requiredString}</span> to confirm
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-300"
            placeholder="Type confirmation here..."
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setIsDeleteComp(false)}
            className="flex-1 px-4 py-3 text-gray-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!isConfirmed}
            onClick={()=>handelDelete()}
            className={`flex-1 px-4 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${isConfirmed
                ? 'bg-red-500 hover:bg-red-600 shadow-red-200'
                : 'bg-gray-200 cursor-not-allowed shadow-none'
              }`}
          >
            Delete Bot
          </button>
        </div>
      </div>
    </BlurBaground>
  );
};