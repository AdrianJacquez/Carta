import { useState } from "react";
import NightBackground from "./components/NightBackground";
import Moon from "./components/Moon";
import MoonConversation from "./components/MoonConversation";
import "./App.css";

function App() {
  const [isMoonLit, setIsMoonLit] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handlePuzzleComplete = () => {
    setIsMoonLit(true);
    setShowLetter(true);
  };

  return (
    <NightBackground>
      <div className="experience">
        <Moon isLit={isMoonLit} hidden={showLetter} />
        <div className="dialogue-area">
          <MoonConversation onPuzzleComplete={handlePuzzleComplete} />
        </div>
      </div>
    </NightBackground>
  );
}

export default App;
