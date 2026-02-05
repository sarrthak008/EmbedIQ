import React, { useState } from "react";
import AppInput from "../AppInput";
import AppButton from "../AppButton";
import BlurBaground from "../Conainers/BlurBaground";
import { BotService } from "../../Services/BotService";
import { toast } from "sonner"

const AddNewBot = ({ open = true, onClose }) => {

  if (!open) return null;

  const [botName, setBotName] = useState();
  const [botDescription, setBotDescription] = useState();

  const AddNewBot = async () => {
    let id = toast.loading("creating please wait..");
    try {
      const responce = await BotService.addNewBot(botName, botDescription);
      if (responce.success) {
        toast.success(responce.message,{id:id});
        onClose();
      } else {
        toast.error(responce.message,{id:id})
        onClose()
      }

    } catch (error) {
      console.error(error, "BOT_CREATTION_ERROR")
    }
  }

  return (
    <BlurBaground>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="w-full max-w-md bg-white rounded-xl p-6 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Create New Bot</h2>
            <button onClick={onClose} className="text-gray-500">✕</button>
          </div>

          {/* Form */}
          <AppInput value={botName} onChange={(text) => setBotName(text)} label="Bot Name" placeholder="e.g. Clinic Bot" />
          <AppInput value={botDescription} onChange={(text) => setBotDescription(text)} label="Description" placeholder="Short bot description" />

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <AppButton text={"Create Bot"} onClick={() => AddNewBot()}>
              Create Bot
            </AppButton>
          </div>

        </div>
      </div>
    </BlurBaground>
  );
};

export default AddNewBot;
