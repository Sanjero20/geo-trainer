import Link from "next/navigation";
import { Button } from "@/components/ui/button";
import GetStartedButton from "@/components/custom/get-started";

function Home() {
  return (
    <>
      {/* Background Image */}
      <div className="absolute left-0 top-0 z-[-1] h-full w-full bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat brightness-50">
        <div className="h-full bg-[radial-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-transparent to-black"></div>
      </div>

      {/* Main Content */}
      <main className="flex h-full flex-col justify-center text-white">
        <div className="flex w-1/2 flex-col gap-8">
          <h1 className="text-6xl font-bold">
            Memorize Philippines Province Geolocation
          </h1>

          <p className="text-xl">
            Learn the geolocation of all provinces in the Philippines with our
            interactive project. Explore the map, take quizzes, and challenge
            yourself to remember the locations.{" "}
          </p>

          <GetStartedButton />
        </div>
      </main>
    </>
  );
}

export default Home;
