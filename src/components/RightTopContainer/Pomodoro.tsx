import {
  IoAddSharp,
  IoRemoveSharp,
  IoPauseOutline,
  IoStopSharp,
  IoPlayOutline,
} from "react-icons/io5";
import Button from "../liquid-glass/Button";
import { useState, useRef, useEffect } from "react";
import { cn } from "../cn";

const Pomodoro = () => {
  const [initTimeMin, setInitTimeMin] = useState(25);

  const [isCounting, setIsCounting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [timeLeftSec, setTimeLeftSec] = useState(25 * 60);

  // Alarm states and refs
  const [showAlarm, setShowAlarm] = useState(false);
  const alarmAudioRef = useRef<HTMLAudioElement | null>(null);
  const alarmTimeoutRef = useRef<any>(null);

  // Main timer logic using useEffect for robust handling
  useEffect(() => {
    // Don't do anything if the timer is not running
    if (!isCounting || isPaused) {
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeftSec(prev => prev - 1);
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(timerId);
  }, [isCounting, isPaused]);

  // Logic to handle timer completion
  useEffect(() => {
    if (timeLeftSec <= 0) {
      setIsCounting(false); // Stop the timer
      setShowAlarm(true);   // Show the alarm screen
    }
  }, [timeLeftSec]);

  // Logic to handle the alarm sound and auto-stop
  useEffect(() => {
    if (showAlarm) {
      alarmAudioRef.current?.play().catch(e => console.error("Audio play failed:", e));
      alarmTimeoutRef.current = setTimeout(() => {
        stopAlarm();
      }, 20000); // Auto-dismiss after 20 seconds
    }
  }, [showAlarm]);

  const stopAlarm = () => {
    if (alarmAudioRef.current) {
      alarmAudioRef.current.pause();
      alarmAudioRef.current.currentTime = 0;
    }
    if (alarmTimeoutRef.current) {
      clearTimeout(alarmTimeoutRef.current);
      alarmTimeoutRef.current = null;
    }
    setShowAlarm(false);
    // Reset timer to its initial state
    setTimeLeftSec(initTimeMin * 60);
  };

  const startCounting = () => {
    setTimeLeftSec(initTimeMin * 60);
    setIsCounting(true);
    setIsPaused(false);
  };

  const stopCounting = () => {
    setIsCounting(false);
    setIsPaused(false);
    setTimeLeftSec(initTimeMin * 60);
  };

  const pauseCounting = () => {
    setIsPaused(true);
  };

  const stopPausing = () => {
    setIsPaused(false);
  };

  const secondsToMinSec = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {showAlarm ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold text-red-500 animate-pulse">Süre doldu!</h1>
          <Button
            rounded
            className="py-1 px-4 text-center bg-red-500/20 border border-red-400/50"
            onClick={stopAlarm}
          >
            Kapat
          </Button>
          <audio ref={alarmAudioRef} src="/sounds/alarm.mp3" loop />
        </div>
      ) : (
        <>
          {!isCounting ? (
            <>
              <div className="flex justify-center items-center gap-6">
                <Button
                  rounded
                  className={cn("p-1 bg-gradient-to-br border", 
        initTimeMin == 1 ? "from-gray-500/15 to-zinc-500/15 border-gray-300/25 hover:cursor-not-allowed" : "from-pink-500/15 to-orange-500/15 border-pink-300/25")}
                  disabled={initTimeMin == 1}
                  onClick={() => setInitTimeMin(initTimeMin - 1)}
                >
                  <IoRemoveSharp className="text-2xl" />
                </Button>

                <div>
                  <h1 className="text-center text-6xl font-bold tracking-tight text-balance font-default p-0 m-0 w-18">
                    {initTimeMin}
                  </h1>
                </div>

                <Button
                  rounded
                  className={cn("p-1 bg-gradient-to-br border", 
        initTimeMin == 60 ? "from-gray-500/15 to-zinc-500/15 border-gray-300/25 hover:cursor-not-allowed" : "from-green-500/15 to-emerald-500/15 border-green-300/25"

                  )}
                  disabled={initTimeMin == 60}
                  onClick={() => setInitTimeMin(initTimeMin + 1)}
                >
                  <IoAddSharp className={cn("text-2xl", initTimeMin == 60 ? "text-gray-300" : "text-white")} />
                </Button>
              </div>
              <p className="text-lg text-center p-0 m-0 font-sans font-thin italic text-gray-300">
                dakika
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center gap-4">
                <Button
                  rounded
                  className="p-1 bg-gradient-to-br from-pink-500/15 to-orange-500/15 border border-pink-300/25"
                  onClick={stopCounting}
                >
                  <IoStopSharp className="text-2xl" />
                </Button>

                <div>
                  <h1 className="text-center text-6xl font-bold tracking-tight text-balance font-default p-0 m-0">
                    {secondsToMinSec(timeLeftSec)}
                  </h1>
                </div>

                <Button
                  rounded
                  className="p-1 bg-gradient-to-br from-green-500/15 to-emerald-500/15 border border-green-300/25"
                  onClick={isPaused ? stopPausing : pauseCounting}
                >
                  {isPaused ? (
                    <IoPlayOutline className="text-2xl" />
                  ) : (
                    <IoPauseOutline className="text-2xl" />
                  )}
                </Button>
              </div>
            </>
          )}

          {!isCounting && (
            <Button
              rounded
              className="py-1 px-2 text-center m-auto mt-2"
              onClick={startCounting}
            >
              Başlat
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default Pomodoro;




// DONT TOUCH BELOW
// import {
//   IoAddSharp,
//   IoRemoveSharp,
//   IoPauseOutline,
//   IoStopSharp,
//   IoPlayOutline,
// } from "react-icons/io5";
// import Button from "../liquid-glass/Button";
// import { useState } from "react";
// import { cn } from "../cn";

// const Pomodoro = () => {
//   const [initTimeMin, setInitTimeMin] = useState(25);

//   const [isCounting, setIsCounting] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);

//   const [intervalId, setIntervalId] = useState<any>(undefined);

//   const [timeLeftSec, setTimeLeftSec] = useState(25 * 60);

//   const startCounting = () => {
//     if (isCounting) return;

//     setIsCounting(true);
//     setIsPaused(false);
//     setTimeLeftSec(initTimeMin * 60);
//     startInterval();
//   };

//   const startInterval = () => {
//     setIntervalId(
//       setInterval(() => {
//         setTimeLeftSec((prevTime) => {
//           console.log("TIME LEFT: ", prevTime);

//           if (prevTime <= 0) {
//             stopCounting();
//           }

//           return prevTime - 1;
//         });
//       }, 1000)
//     );
//   };

//   const pauseCounting = () => {
//     if (isPaused) return;

//     setIsPaused(true);
//     clearInterval(intervalId);
//     setIntervalId(undefined);
//   };

//   const stopPausing = () => {
//     if (!isPaused) return;

//     setIsPaused(false);
//     startInterval();
//   };

//   const stopCounting = () => {
//     if (!isCounting) return;

//     setIsCounting(false);
//     setIsPaused(false);
//     clearInterval(intervalId);
//     setIntervalId(undefined);
//   };

//   const secondsToMinSec = (seconds: any) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
//   };

//   return (
//     <div>
//       {!isCounting ? (
//         <>
//           <div className="flex justify-center items-center gap-6">
//             <Button
//               rounded
//               className={cn("p-1 bg-gradient-to-br border", 
// initTimeMin == 1 ? "from-gray-500/15 to-zinc-500/15 border-gray-300/25 hover:cursor-not-allowed" : "from-pink-500/15 to-orange-500/15 border-pink-300/25")}
//               disabled={initTimeMin == 1}
//               onClick={() => setInitTimeMin(initTimeMin - 1)}
//             >
//               <IoRemoveSharp className="text-2xl" />
//             </Button>

//             <div>
//               <h1 className="text-center text-6xl font-bold tracking-tight text-balance font-default p-0 m-0 w-18">
//                 {initTimeMin}
//               </h1>
//             </div>

//             <Button
//               rounded
//               className={cn("p-1 bg-gradient-to-br border", 
// initTimeMin == 60 ? "from-gray-500/15 to-zinc-500/15 border-gray-300/25 hover:cursor-not-allowed" : "from-green-500/15 to-emerald-500/15 border-green-300/25"

//               )}
//               disabled={initTimeMin == 60}
//               onClick={() => setInitTimeMin(initTimeMin + 1)}
//             >
//               <IoAddSharp className={cn("text-2xl", initTimeMin == 60 ? "text-gray-300" : "text-white")} />
//             </Button>
//           </div>
//           <p className="text-lg text-center p-0 m-0 font-sans font-thin italic text-gray-300">
//             dakika
//           </p>
//         </>
//       ) : (
//         <>
//           <div className="flex justify-center items-center gap-4">
//             <Button
//               rounded
//               className="p-1 bg-gradient-to-br from-pink-500/15 to-orange-500/15 border border-pink-300/25"
//               onClick={stopCounting} // Use the main stop function
//             >
//               <IoStopSharp className="text-2xl" />
//             </Button>

//             <div>
//               <h1 className="text-center text-6xl font-bold tracking-tight text-balance font-default p-0 m-0">
//                 {secondsToMinSec(timeLeftSec)}
//               </h1>
//             </div>

//             <Button
//               rounded
//               className="p-1 bg-gradient-to-br from-green-500/15 to-emerald-500/15 border border-green-300/25"
//               onClick={isPaused ? stopPausing : pauseCounting}
//             >
//               {isPaused ? (
//                 <IoPlayOutline className="text-2xl" />
//               ) : (
//                 <IoPauseOutline className="text-2xl" />
//               )}
//             </Button>
//           </div>
//         </>
//       )}

//       {!isCounting && (
//         <Button
//           rounded
//           className="py-1 px-2 text-center m-auto mt-2"
//           onClick={startCounting}
//         >
//           Başlat
//         </Button>
//       )}
//     </div>
//   );
// };

// export default Pomodoro;
