import dynamic from "next/dynamic";
import RegionList from "./region-list";
import LoadingMap from "./loading-map";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

const PhilippinesMap = dynamic(() => import("./philippines-map"), {
  loading: () => <LoadingMap />,
  ssr: false,
});

function LearnPage() {
  return (
    <div className="flex h-full w-full justify-between gap-4">
      <Card className="hidden h-full w-1/3 border-2 sm:block">
        <h1 className="p-2 text-2xl font-bold">Region List</h1>
        <Separator />
        <RegionList />
      </Card>

      <div className="relative h-full w-full overflow-hidden rounded-lg border-2">
        <PhilippinesMap />
      </div>
    </div>
  );
}

export default LearnPage;
