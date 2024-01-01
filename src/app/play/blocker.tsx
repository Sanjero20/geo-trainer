"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/stores/game";
import HowToPlay from "./modal/how-to-play";
import { useTimeStore } from "@/stores/time";

function Blocker() {
  const [tutorialModalOpen, setTutorialModalOpen] = useState(false);

  const { setGameStatus } = useGameStore();
  const { startTime } = useTimeStore();

  const startGame = () => {
    setGameStatus("playing");
    startTime();
  };

  return (
    <>
      {/* Background blur */}
      <div className="absolute z-[500] h-full w-full backdrop-blur-sm"></div>

      {/* Main Content */}
      <div className="absolute z-[501] flex h-full w-full flex-col items-center justify-center gap-2">
        <Button className="z-[400] flex gap-1 px-8" onClick={startGame}>
          <Play size={18} />
          Play
        </Button>

        <Button variant="secondary" onClick={() => setTutorialModalOpen(true)}>
          How to play?
        </Button>
      </div>

      <HowToPlay open={tutorialModalOpen} onOpenChange={setTutorialModalOpen} />
    </>
  );
}

export default Blocker;
