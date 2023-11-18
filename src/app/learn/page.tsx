import dynamic from "next/dynamic";
import RegionList from "./region-list";
import { Card } from "@/components/ui/card";
import LoadingMap from "./loading-map";

const PhilippinesMap = dynamic(() => import("./philippines-map"), {
  loading: () => <LoadingMap />,
  ssr: false,
});

function LearnPage() {
  return (
    <div className="flex h-full w-full justify-between">
      <Card className="max-h-full w-1/2 overflow-hidden ">
        <RegionList />
      </Card>

      <div className="relative h-full w-full overflow-hidden rounded-lg border-2">
        <PhilippinesMap />
      </div>
    </div>
  );
}

export default LearnPage;
