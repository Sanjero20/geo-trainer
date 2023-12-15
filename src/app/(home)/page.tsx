import GetStartedButton from "./get-started";

function Home() {
  return (
    <>
      {/* Background Image */}
      <div className="absolute left-0 top-0 z-[-1] h-full w-full bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat brightness-50">
        <div className="h-full bg-[radial-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-transparent to-black"></div>
      </div>

      {/* Main Content */}
      <main className="flex h-full flex-col justify-center text-white">
        <div className="flex flex-col items-center gap-4 sm:w-1/2 sm:items-start">
          <h1 className="text-center text-3xl font-bold sm:text-start sm:text-6xl">
            Memorize Philippines Province Geolocation
          </h1>

          <p className="text-center text-xl sm:text-start">
            Learn the geolocation of all provinces in the Philippines with our
            interactive project. Explore the map, take quizzes, and challenge
            yourself to remember the locations.
          </p>

          <GetStartedButton />
        </div>
      </main>
    </>
  );
}

export default Home;
