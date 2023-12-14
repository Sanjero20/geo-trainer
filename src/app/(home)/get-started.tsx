import Link from "next/link";
import { Button } from "@/components/ui/button";

function GetStartedButton() {
  return (
    <Button
      asChild
      className="w-fit rounded-lg bg-white px-12 text-black hover:bg-white/80 hover:text-black/80"
    >
      <Link href={"/learn"}>Get Started</Link>
    </Button>
  );
}

export default GetStartedButton;
