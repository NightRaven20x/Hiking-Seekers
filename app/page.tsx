import Hero from "./Components/Hero";
import StatsBar from "./Components/StatsBar";
import "./globals.css";
import Navbar from "./Components/Navbar";
import TripCard from "./Components/TripCard";
import Footer from "./Components/Footer";
import Gallery from "./Components/Gallery";

export default function Home() {
  const tripsData = [
    {
      id: 1,
      title: "Tikjda",
      price: "2000",
      difficulty: "Hard",
      difficultyColor: "bg-red-600",
      imageUrl: "/images/tikjda.svg",
    },
    {
      id: 2,
      title: "Lakhdaria",
      price: "2000",
      difficulty: "Medium",
      difficultyColor: "bg-yellow-500",
      imageUrl: "/images/lakhdaria.svg",
    },
    {
      id: 3,
      title: "Djurdjura",
      price: "2000",
      difficulty: "Medium",
      difficultyColor: "bg-yellow-500",
      imageUrl: "/images/djurdjura.svg",
    },
    {
      id: 4,
      title: "Lake Dhaya",
      price: "2000",
      difficulty: "Easy",
      difficultyColor: "bg-green-600",
      imageUrl: "/images/lake_dhaya.svg",
    }
  ];

  return (
    <main className="min-h-screen bg-[#F3F4F6]">
      <Navbar />
      <Hero />
      <StatsBar />


      {/* Trips Section */}
      <section className="mt-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-end mb-14">
            <div>
              <p className="text-gray-400 text-sm tracking-widest mb-2">
                Best Trips
              </p>
              <h2 className="font-serif text-4xl font-bold text-gray-900">
                Algerian Trips
              </h2>
            </div>

            <p className="hidden md:block text-gray-400 italic font-serif text-lg">
              Escape the Ordinary
            </p>
          </div>

          {/* PERFECT 2x2 GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tripsData.map((trip) => (
              <TripCard key={trip.id} {...trip} />
            ))}
          </div>

        </div>
      </section>

      <Gallery />
      <Footer />
    </main>
  );
}