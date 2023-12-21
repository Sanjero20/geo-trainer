"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import InteractiveMapLoader from "@/components/interactive-map/loader";

import { getAllProvinces } from "@/data/provinces";
import { shuffleArray } from "@/lib/array-utils";

const PlayableMap = dynamic(() => import("./play-map"), {
  loading: () => <InteractiveMapLoader />,
  ssr: false,
});

function PlayPage() {
  useEffect(() => {
    let provinces: any = getAllProvinces();

    provinces = provinces.map((province: any) => ({
      name: province,
      guessed: null,
    }));

    provinces = shuffleArray(provinces);
    localStorage.setItem("provinces", JSON.stringify(provinces));
    localStorage.setItem("current", "0");
  }, []);

  return (
    <div className="h-full w-full">
      <PlayableMap />
    </div>
  );
}

export default PlayPage;
