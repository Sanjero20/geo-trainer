"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import InteractiveMapLoader from "@/components/interactive-map/loader";
import { defaultStyles } from "@/components/interactive-map/map-settings";

import ModalResetGame from "./modal/reset-modal";

import { useGameStore } from "@/stores/game";
import GameFooter from "./game-summary";
import { useTimeStore } from "@/stores/time";

const PlayableMap = dynamic(() => import("./play-map"), {
  loading: () => <InteractiveMapLoader />,
  ssr: false,
});

function PlayPage() {
  const [mapStyles, setMapStyles] = useState<any>(defaultStyles);
  const [restartModalOpen, setRestartModalOpen] = useState(false);

  const { status, setGameStatus, resetGameData } = useGameStore();
  const { restartTime, startTime } = useTimeStore();

  const restartGame = () => {
    setMapStyles({ ...defaultStyles });
    setGameStatus("playing");

    restartTime();
    startTime();

    resetGameData();
    setRestartModalOpen(false);
  };

  useEffect(() => {
    return () => {
      setGameStatus("not-playing");
      resetGameData();
      restartTime();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="relative flex h-full w-full flex-col gap-1">
        <PlayableMap mapStyles={mapStyles} restartGame={restartGame} />

        {/* Displays the controller and scoreboard */}
        {status !== "not-playing" && (
          <GameFooter
            restartGame={restartGame}
            setRestartModalOpen={setRestartModalOpen}
          />
        )}
      </div>

      {/* Dialog */}
      <ModalResetGame
        open={restartModalOpen}
        onOpenChange={setRestartModalOpen}
        restartGame={restartGame}
      />
    </>
  );
}

export default PlayPage;
