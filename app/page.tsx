import Hero from "./Components/Hero";
import StatsBar from "./Components/StatsBar";
import "./globals.css";
import Navbar from "./Components/Navbar";
import TripCard from "./Components/TripCard";

export default function Home() {
  // 1. Define the data inside the Home component, BEFORE the return statement
  const tripsData = [
    {
      id: 1,
      title: "Tikjda",
      price: "2000",
      difficulty: "Hard",
      difficultyColor: "bg-red-600",
      imageUrl: "/images/tkijda.svg" 
    },
    {
      id: 2,
      title: "Lakhdaria",
      price: "2000",
      difficulty: "Medium",
      difficultyColor: "bg-yellow-500",
      imageUrl: "/images/lakhdria.svg"
    },
    {
      id: 3,
      title: "Djurdjura",
      price: "2800",
      difficulty: "Medium",
      difficultyColor: "bg-yellow-500",
      imageUrl: "/images/Djurdjura.svg" 
    },
    {
      id: 4,
      title: "Lake Dhaya",
      price: "2000",
      difficulty: "Easy",
      difficultyColor: "bg-green-600",
      imageUrl: "/images/lake dhaya.svg"
    }
  ];

  // 2. The single return statement that renders the entire page
  return (
    <main className="min-h-screen bg-gray-100 pb-20">
      {/* Existing Top Components */}
      <Navbar />
      <Hero />
      <StatsBar />

      {/* New Trips Section */}
      <section className="py-12 bg-gray-100 max-w-6xl mx-auto px-4 mt-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h4 className="text-gray-400 text-sm uppercase tracking-widest">Best Trips</h4>
            <h2 className="font-serif text-4xl text-[#1e293b] mt-2">Algerian Trips</h2>
          </div>
          <p className="text-gray-400 italic">Escape the Ordinary</p>
        </div>

        {/* The Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tripsData.map((trip) => (
            <TripCard
              key={trip.id}
              title={trip.title}
              price={trip.price}
              difficulty={trip.difficulty}
              imageUrl={trip.imageUrl}
              difficultyColor={trip.difficultyColor}
            />
          ))}
        </div>
      </section>
    </main>
  );
}