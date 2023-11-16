import Link from "next/link";
import { Button } from "../ui/button";

function GetStartedButton() {
  return (
    <Button asChild className="w-fit rounded-full px-12">
      <Link href={"/learn"}>Get Started</Link>
    </Button>
  );
}

export default GetStartedButton;
