import Link from "next/link";
import { Button } from "@/components/ui/button";

function GetStartedButton() {
  return (
    <Button asChild>
      <Link href={"/learn"}>Start Now</Link>
    </Button>
  );
}

export default GetStartedButton;
