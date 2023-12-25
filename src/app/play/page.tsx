"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import InteractiveMapLoader from "@/components/interactive-map/loader";
import { Card } from "@/components/ui/card";
import { useGameStore } from "@/stores/game";
import { defaultStyles } from "@/components/interactive-map/map-settings";
import HowToPlay from "./how-to-play";
import ModalResetGame from "./reset-modal";
import { Button } from "@/components/ui/button";

const PlayableMap = dynamic(() => import("./play-map"), {
  loading: () => <InteractiveMapLoader />,
  ssr: false,
});

function PlayPage() {
  const [restartModalOpen, setRestartModalOpen] = useState(false);
  const [tutorialModalOpen, setTutorialModalOpen] = useState(false);
  const [mapStyles, setMapStyles] = useState<any>(defaultStyles);

  const { remaining, resetGame } = useGameStore();

  const restartGame = () => {
    setRestartModalOpen(false);
    setMapStyles({ ...defaultStyles });
    resetGame();
  };

  return (
    <>
      <div className="relative flex h-full w-full flex-col gap-1">
        <PlayableMap mapStyles={mapStyles} restartGame={restartGame} />

        <Button onClick={() => setTutorialModalOpen(true)}>?</Button>
        <section className="flex items-center justify-between">
          <Button
            variant="destructive"
            onClick={() => setRestartModalOpen(true)}
          >
            Restart
          </Button>

          <div className="dark flex gap-2">
            <Card className="px-8 py-2">00:00</Card>
            <Card className="px-8 py-2">{remaining} remaining</Card>
          </div>
        </section>
      </div>

      {/* Dialogs */}
      <HowToPlay open={tutorialModalOpen} onOpenChange={setTutorialModalOpen} />

      <ModalResetGame
        open={restartModalOpen}
        onOpenChange={setRestartModalOpen}
        restartGame={restartGame}
      />
    </>
  );
}

export default PlayPage;
