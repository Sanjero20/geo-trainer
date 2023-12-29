"use client";

import { Button } from "@/components/ui/button";
import { calculateScore } from "@/lib/game";
import { useGameStore } from "@/stores/game";

interface Props {
  restartGame: () => void;
  setRestartModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function GameFooter({ restartGame, setRestartModalOpen }: Props) {
  const { remaining, provinces } = useGameStore();

  return (
    <footer className="flex items-center justify-between">
      {remaining === 0 ? (
        <Button onClick={restartGame}>Play Again</Button>
      ) : (
        <Button variant="destructive" onClick={() => setRestartModalOpen(true)}>
          Restart
        </Button>
      )}

      <div className="flex items-center gap-4 font-bold text-primary">
        <p>
          {remaining !== 0
            ? `${remaining} remaining`
            : `Score: ${calculateScore(provinces)} / ${provinces.length}`}
        </p>
      </div>
    </footer>
  );
}

export default GameFooter;
