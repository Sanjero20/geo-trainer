"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import InteractiveMapLoader from "@/components/interactive-map/loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGameStore } from "@/stores/game";
import { defaultStyles } from "@/components/interactive-map/map-settings";

const PlayableMap = dynamic(() => import("./play-map"), {
  loading: () => <InteractiveMapLoader />,
  ssr: false,
});

function PlayPage() {
  const { remaining, resetGame } = useGameStore();

  const [mapStyles, setMapStyles] = useState<any>(defaultStyles);

  const restartGame = () => {
    setMapStyles({ ...defaultStyles });
    resetGame();
  };

  return (
    <>
      <div className="relative flex h-full w-full flex-col gap-1">
        <PlayableMap mapStyles={mapStyles} restartGame={restartGame} />

        <section className="flex items-center justify-between">
          <Button
            className="w-24"
            variant={"destructive"}
            onClick={restartGame}
          >
            Reset
          </Button>

          <div className="dark flex gap-2">
            <Card className="px-8 py-2">00:00</Card>
            <Card className="px-8 py-2">{remaining} remaining</Card>
          </div>
        </section>
      </div>
    </>
  );
}

export default PlayPage;
