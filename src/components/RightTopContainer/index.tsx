import Container from "../liquid-glass/Container";
import { useEffect, useState } from "react";
import Pomodoro from "./Pomodoro";

const RightTopContainer = () => {
  const [time, setTime] = useState(25);
  const [isCounting, setIsCounting] = useState(false);
  const [intervalId, setIntervalId] = useState<any>(undefined);

  const [timeLeft, setTimeLeft] = useState([]);

  const startCounting = () => {
    setIntervalId(setInterval(() => {}, 1000));
  };


  return (
    <Container 
    className="w-100 fixed top-4 right-4 content-center px-12 py-8"
    style={{
      zIndex: 2 
    }}
    >
          <Pomodoro />
    </Container>
  );
};

export default RightTopContainer;
