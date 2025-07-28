import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Splash from "./components/Splash";
import { AnimatePresence } from "framer-motion";
import RightTopContainer from "./components/RightTopContainer";
import DateTimeText from "./components/DateTimeText";
import RightBottomContainer from "./components/RightBottomContainer";
import { BackgroundProvider } from "./contexts/BackgroundContext";
import BackgroundRenderer from "./components/BackgroundRenderer";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <BackgroundProvider>
      <main className="w-screen h-screen overflow-hidden m-0 p-0">
        <AnimatePresence>
          {showSplash ? (
            <Splash key="splash" onFinish={() => setShowSplash(false)} />
          ) : (
           <div className="w-screen h-screen overflow-hidden m-0 p-0">
            <BackgroundRenderer />

            <RightTopContainer />
            <div className="w-screen h-screen grid justify-items-center items-center overflow-hidden">
            <div className="absolute top-4 left-4">
              <Navbar />
            </div>

            <DateTimeText />
            
            <RightBottomContainer />
            </div>
           </div>
            
          )}
        </AnimatePresence>
      </main>
    </BackgroundProvider>
  );
}

export default App;
