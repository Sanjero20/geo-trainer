"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import InteractiveMapLoader from "@/components/interactive-map/loader";

import { getAllProvinces } from "@/data/provinces";

const PhilippinesMap = dynamic(() => import("./play-map"), {
  loading: () => <InteractiveMapLoader />,
  ssr: false,
});

function PlayPage() {
  const [provinces, setProvinces] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const list = getAllProvinces().sort();

    // randomize the order of the provinces

    setProvinces(list);
  }, []);

  return (
    <div className="h-full w-full">
      {/* Scoreboard */}
      <div className="text-end">
        {score} / {provinces.length}
      </div>

      {/* 3 attempts for each province */}
      {/* numbers of provinces needed to guess */}
      {/* Score / Number*/}
      {/* MAP */}

      {/* Restart button  */}
      <PhilippinesMap guessProvince={provinces[5]} />
    </div>
  );
}

export default PlayPage;
