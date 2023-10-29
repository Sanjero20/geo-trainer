import dynamic from "next/dynamic";

const PhilippinesMap = dynamic(() => import("@/components/GeoMap"), {
  loading: () => <p>Loading the Philippines map...</p>,
  ssr: false,
});

function LearnPage() {
  return (
    <div className="flex h-full w-full p-4">
      <div className="hidden h-full w-1/2 sm:flex">REGIONS</div>

      <div className="h-full w-full overflow-hidden rounded-lg border-2 border-slate-500 sm:w-1/2">
        <PhilippinesMap />
      </div>
    </div>
  );
}

export default LearnPage;
