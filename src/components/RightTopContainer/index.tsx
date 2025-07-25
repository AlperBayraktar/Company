import { IoAddSharp, IoRemoveSharp } from "react-icons/io5";
import Container from "../liquid-glass/Container";
import Button from "../liquid-glass/Button";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Pomodoro from "./Pomodoro";
import Settings from "./Spotify";

const RightTopContainer = () => {
  const [time, setTime] = useState(25);
  const [isCounting, setIsCounting] = useState(false);
  const [intervalId, setIntervalId] = useState<any>(undefined);

  const [timeLeft, setTimeLeft] = useState([]);

  const startCounting = () => {
    setIntervalId(setInterval(() => {}, 1000));
  };

  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }

    setSlideCount(api.scrollSnapList().length);
    setCurrentSlide(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Container 
    className="w-100 fixed top-4 right-4 z-200 content-center px-12 py-8"
    >
      <Carousel setApi={setApi}>
        <CarouselContent >
          <CarouselItem className="content-center">
            <Pomodoro />
          </CarouselItem>
          <CarouselItem >
            <Settings />
          </CarouselItem>
        </CarouselContent >
        
        {currentSlide > 1 && <CarouselPrevious />}
        {currentSlide < slideCount && <CarouselNext />}
      </Carousel>

      <div
        className="flex justify-center gap-3 mt-6"
        style={{
          position: "absolute",
          left: "50%",
          top: "100%",
          transform: "translateX(-50%) translateY(-4px)",
        }}
      >
        {new Array(slideCount).fill(0).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-0.5 rounded-full transition-all duration-300 ${
              index === currentSlide - 1
                ? "bg-white/80 w-8"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </Container>
  );
};

export default RightTopContainer;
