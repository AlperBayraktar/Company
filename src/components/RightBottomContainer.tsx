import { motion } from "framer-motion";
import { IoLogoGithub } from "react-icons/io5";
import { MdSettings } from "react-icons/md";
import { useState } from "react";
import SettingsModal from "./SettingsModal";

function RightBottomContainer() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <div className="absolute bottom-2 right-2 flex justify-start items-center gap-2 overflow-hidden">
        <IoLogoGithub fontSize={"48px"} opacity={0.9}/>
        
        <motion.div 
          className="w-12 cursor-pointer hover:opacity-100 transition-opacity"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          onClick={() => setIsSettingsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MdSettings fontSize={"48px"} opacity={0.9}/>
        </motion.div>
      </div>
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
}

export default RightBottomContainer;