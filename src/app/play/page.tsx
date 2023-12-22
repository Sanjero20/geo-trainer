"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import InteractiveMapLoader from "@/components/interactive-map/loader";

import { getAllProvinces } from "@/data/provinces";
import { shuffleArray } from "@/lib/array-utils";
import { getGameData } from "@/lib/game-utils";

const PlayableMap = dynamic(() => import("./play-map"), {
  loading: () => <InteractiveMapLoader />,
  ssr: false,
});

function PlayPage() {
  const [remaining, setRemaining] = useState<number>(getAllProvinces().length);

  useEffect(() => {
    const provinces = shuffleArray(getAllProvinces());

    const parsedProvinces = provinces.map((province: any) => ({
      name: province,
      guessed: null,
    }));

    localStorage.setItem("provinces", JSON.stringify(parsedProvinces));
    localStorage.setItem("current", "0");

    return () => {
      localStorage.clear();
    };
  }, []);

  const triggerRemaining = () => {
    const { provinces, currentGuessIndex } = getGameData();

    const provinceLength = provinces.length;

    if (provinceLength - 1 === currentGuessIndex) {
      setRemaining(0);
      return;
    }

    setRemaining(provinceLength - currentGuessIndex);
  };

  return (
    <div className="h-full w-full">
      <PlayableMap triggerScore={triggerRemaining} />
    </div>
  );
}

export default PlayPage;
