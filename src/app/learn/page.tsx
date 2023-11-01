import dynamic from "next/dynamic";
import RegionList from "./region-list";

const PhilippinesMap = dynamic(() => import("./philippines-map"), {
  loading: () => <p>Loading the Philippines map...</p>,
  ssr: false,
});

function LearnPage() {
  return (
    <div className="flex h-full w-full justify-between py-4">
      <div className="hidden h-full w-1/2 sm:flex">
        <RegionList />
      </div>

      <div className="h-full w-full overflow-hidden rounded-lg border-2 border-slate-500 sm:w-1/2">
        <PhilippinesMap />
      </div>
    </div>
  );
}

export default LearnPage;
