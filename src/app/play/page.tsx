"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import InteractiveMapLoader from "@/components/interactive-map/loader";
import { defaultStyles } from "@/components/interactive-map/map-settings";

import { Button } from "@/components/ui/button";
import ModalResetGame from "./reset-modal";

import { useGameStore } from "@/stores/game";
import { calculateScore } from "@/lib/game";

const PlayableMap = dynamic(() => import("./play-map"), {
  loading: () => <InteractiveMapLoader />,
  ssr: false,
});

function PlayPage() {
  const [restartModalOpen, setRestartModalOpen] = useState(false);

  const [mapStyles, setMapStyles] = useState<any>(defaultStyles);

  const { provinces, status, setGameStatus, remaining, resetGameData } =
    useGameStore();

  const restartGame = () => {
    setMapStyles({ ...defaultStyles });
    setGameStatus("playing");
    resetGameData();
    setRestartModalOpen(false);
  };

  useEffect(() => {
    // Reset details on unmount
    return () => {
      setGameStatus("not-playing");
      resetGameData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="relative flex h-full w-full flex-col gap-1">
        <PlayableMap mapStyles={mapStyles} restartGame={restartGame} />

        {/* Footer */}

        {status !== "not-playing" && (
          <section className="flex items-center justify-between">
            {remaining === 0 ? (
              <Button onClick={restartGame}>Play Again</Button>
            ) : (
              <Button
                variant="destructive"
                onClick={() => setRestartModalOpen(true)}
              >
                Restart
              </Button>
            )}

            <div className="flex items-center gap-4 font-bold text-primary">
              <p>
                {remaining !== 0
                  ? `${remaining} remaining`
                  : `Score: ${calculateScore(provinces)}`}
              </p>
            </div>
          </section>
        )}
      </div>

      {/* Dialogs */}
      <ModalResetGame
        open={restartModalOpen}
        onOpenChange={setRestartModalOpen}
        restartGame={restartGame}
      />
    </>
  );
}

export default PlayPage;
