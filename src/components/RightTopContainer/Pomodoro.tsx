import {
  IoAddSharp,
  IoRemoveSharp,
  IoPauseOutline,
  IoStopSharp,
  IoPlayOutline,
} from "react-icons/io5";
import Button from "../liquid-glass/Button";
import { useState } from "react";

const Pomodoro = () => {
  const [initTimeMin, setInitTimeMin] = useState(25);

  const [isCounting, setIsCounting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [intervalId, setIntervalId] = useState<any>(undefined);

  const [timeLeftSec, setTimeLeftSec] = useState(25 * 60);

  const startCounting = () => {
    setIsCounting(true);
    setIsPaused(false);
    setTimeLeftSec(initTimeMin * 60);
    startInterval();
  };

  const startInterval = () => {
    setIntervalId(
      setInterval(() => {
        setTimeLeftSec((prevTime) => {
          console.log("TIME LEFT: ", prevTime);

          if (prevTime <= 0) {
            stopCounting();
          }

          return prevTime - 1;
        });
      }, 1000)
    );
  };

  const pauseCounting = () => {
    setIsPaused(true);
    clearInterval(intervalId);
  };

  const stopPausing = () => {
    setIsPaused(false);
    startInterval();
  };

  const stopCounting = () => {
    setIsCounting(false);
    setIsPaused(false);

    clearInterval(intervalId);
  };

  const secondsToMinSec = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {!isCounting ? (
        <>
          <div className="flex justify-center items-center gap-6">
            <Button
              rounded
              className="p-1 bg-gradient-to-br from-pink-500/15 to-orange-500/15 border border-pink-300/25"
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
              className="p-1 bg-gradient-to-br from-green-500/15 to-emerald-500/15 border border-green-300/25"
              disabled={initTimeMin == 59}
              onClick={() => setInitTimeMin(initTimeMin + 1)}
            >
              <IoAddSharp className="text-2xl" />
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
    </div>
  );
};

export default Pomodoro;
