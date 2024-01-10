import { Separator } from "@/components/ui/separator";
import GetStartedButton from "./get-started";
import Footer from "./footer";

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

      <Footer />
    </div>
  );
}

export default Home;
