import { motion } from "framer-motion";
import { IoLogoGithub } from "react-icons/io5";
import { MdSettings } from "react-icons/md";
import { useState } from "react";
import SettingsModal from "./SettingsModal";

function RightBottomContainer() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
const className="cursor-pointer hover:opacity-100 hover:scale-110 transition-all"

  return (
    <>
      <div className="absolute bottom-2 right-2 flex justify-start items-center gap-2 overflow-hidden">
        <a className="" href="https://github.com/AlperBayraktar/Company" target="_blank">
          <IoLogoGithub fontSize={"48px"} opacity={0.9} className={className} />
        </a>
        <MdSettings fontSize={"48px"} opacity={0.9} className={className} onClick={() => setIsSettingsOpen(true)}/>
      </div>
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
}

export default RightBottomContainer;