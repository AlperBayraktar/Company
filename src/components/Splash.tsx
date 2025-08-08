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

    useEffect( () => {
      console.log("starting playing")
      lottieRef.current?.play()
    }, [])

    useEffect(() => {
        if (lottieRef.current) {
          const durationSeconds:any = lottieRef.current.getDuration(false);
          console.log(durationSeconds)

          const timeout = setTimeout(() => {
            setIsVisible(false);

            const audioCtx = new AudioContext();
            const audio = new Audio('/sounds/startup.mp3');
            const track = audioCtx.createMediaElementSource(audio);
            const gainNode = audioCtx.createGain();
            gainNode.gain.value = 5;

            track.connect(gainNode).connect(audioCtx.destination);

            audio.play();
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
<Lottie lottieRef={lottieRef} animationData={initAnimation} onComplete={onFinish}  autoplay={false} loop={false} />
        </motion.div>
  );
};

export default Splash; 