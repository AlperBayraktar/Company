import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import initAnimation from "../assets/init-lottie.json";

interface SplashProps {
  onFinish: () => void;
}

const Splash = ({ onFinish }: SplashProps) => {
    const fadeDurationSeconds = 0.5;
    const [isVisible, setIsVisible] = useState(true);
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        // Lottie'nin süresi kadar bekle, sonra bitir
        if (lottieRef.current) {
          const durationSeconds:any = lottieRef.current.getDuration(false);
          console.log(durationSeconds)

          const timeout = setTimeout(() => {
            console.log("fading out")
            setIsVisible(false);
          }, (durationSeconds - fadeDurationSeconds) * 1000);

        console.log("timeout set")
          return () => clearTimeout(timeout);

        }
      }, [lottieRef])

    return (
        <motion.div
          className="w-screen h-screen flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          
          transition={{ duration: fadeDurationSeconds }}
        >
<Lottie lottieRef={lottieRef} animationData={initAnimation} onComplete={onFinish}  autoplay={true} loop={false} />
        </motion.div>
  );
};

export default Splash; 