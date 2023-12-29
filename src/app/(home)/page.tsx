import { Separator } from "@/components/ui/separator";
import GetStartedButton from "./get-started";
import Image from "next/image";
import Link from "next/link";

function Home() {
  return (
    <div className="flex h-full flex-col">
      <section className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-3xl font-bold sm:text-5xl">
          Master the map of the Philippines!
        </h1>

        <p className="sm:text-2xl">
          Memorize the geolocation of provinces <br />
          Explore the beauty of the 🇵🇭 archipelago.
        </p>

        <GetStartedButton />
      </section>

      <Separator />

      <footer className="pt-2 text-center text-primary/80">
        <div className="flex h-full items-center justify-center gap-2">
          Made by Sanjero20
          <Link
            href="https://github.com/sanjero20"
            target="_blank"
            className="flex items-center gap-2"
          >
            <Image
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              width={32}
              height={32}
              alt="github"
              className="opacity-80"
            />
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Home;
