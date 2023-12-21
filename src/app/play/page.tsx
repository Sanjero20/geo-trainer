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

type LocalStorageProvince = {
  name: string;
  guessed: boolean | null;
};

function PlayPage() {
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

  return (
    <div className="h-full w-full">
      <PlayableMap />
    </div>
  );
}

export default PlayPage;
