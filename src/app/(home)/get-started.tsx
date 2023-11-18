import Link from "next/link";
import { Button } from "@/components/ui/button";

function GetStartedButton() {
  return (
    <Button asChild className="w-fit rounded-full bg-white px-12 text-black">
      <Link href={"/learn"}>Get Started</Link>
    </Button>
  );
}

export default GetStartedButton;
