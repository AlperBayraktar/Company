import { useState } from "react";
import Toggle from "../liquid-glass/Toggle"

const Settings = () => {
  const [isSpeakingModeOpened, setIsSpeakingModeOpened] = useState(false);
  const [isListeningModeOpened, setIsListeningModeOpened] = useState(false);

  return (
    <div className="px-2">
      <h1 className="text-center text-2xl font-medium tracking-tight text-balance font-default mb-4">
        Ayarlar
      </h1>

      <div className="flex gap-2 justify-left items-center my-2">
        <p>Konuşma modu:</p>
        <Toggle
          isChecked={isSpeakingModeOpened}
          setIsChecked={setIsSpeakingModeOpened}
        />
      </div>

      <div className="flex gap-2 justify-left items-center my-4">
        <p>Dinleme modu:</p>
        <Toggle
          isChecked={isListeningModeOpened}
          setIsChecked={setIsListeningModeOpened}
        />
      </div>
    </div>
  );
};

export default Settings;
