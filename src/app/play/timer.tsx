"use client";

import { useEffect } from "react";
import { useGameStore } from "@/stores/game";
import { useTimeStore } from "@/stores/time";

function Timer() {
  const { status } = useGameStore();
  const { isRunning, time, setTime } = useTimeStore();

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isRunning && status != "gameover") {
      intervalId = setInterval(() => {
        setTime(time + 1);
      }, 10);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, time, setTime, status]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 6000);
    const remainingSeconds = Math.floor((seconds % 6000) / 100);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  return (
    <div>
      <p>Time: {formatTime(time)}</p>
    </div>
  );
}

export default Timer;
