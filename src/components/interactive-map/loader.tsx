import { mapBackgroundColor } from "@/components/interactive-map/map-settings";

function InteractiveMapLoader() {
  return (
    <div
      className="flex h-full w-full items-center justify-center text-white"
      style={{ background: mapBackgroundColor }}
    >
      <h1 className="text-4xl font-bold">Loading Map . . .</h1>
    </div>
  );
}

export default InteractiveMapLoader;
