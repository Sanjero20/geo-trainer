import GetStartedButton from "./get-started";

function Home() {
  return (
    <div className="flex h-full flex-col">
      <section className="flex h-full flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-5xl font-bold">
          Master the map of the Philippines!
        </h1>

        <p className="text-2xl">
          Memorize the geolocation of provinces <br />
          Explore the beauty of the 🇵🇭 archipelago.
        </p>

        <GetStartedButton />
      </section>
    </div>
  );
}

export default Home;
