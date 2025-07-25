import { motion } from "framer-motion";

function InitAnimation({children}: {children: React.ReactNode}) {
    return (
        <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    )
}

export default InitAnimation;