import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { notFound } from "next/navigation";
import { tripsData } from "../../data/trips";
import TripDetailClient from "../../Components/TripDetailClient";

export default async function TripDetails({ params }: { params: Promise<{ id: string }> }) {
  // Await params in Next.js 15
  const { id } = await params;
  
  // Find the trip
  const trip = tripsData.find((t) => t.id.toString() === id);

  // If trip not found, show 404
  if (!trip) notFound();

  return (
    <main className="min-h-screen bg-[#F0EDE8]">
      <Navbar />
      
      {/* Pass trip data to client component */}
      <TripDetailClient trip={trip} />

      <Footer />
    </main>
  );
}
