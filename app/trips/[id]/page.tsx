import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import { tripsData } from "../../data/trips";

export default async function TripDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Find the exact trip based on the ID in the URL
  const trip = tripsData.find((t) => t.id.toString() === id);

  // If someone types a random ID like /trips/99, show a 404 page
  if (!trip) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F3F4F6]">
      <Navbar />

      {/* 1. Full-Width Hero Header */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image 
          src={trip.imageUrl} 
          alt={trip.title} 
          fill 
          className="object-cover"
          priority
        />
        {/* Dark overlay to make text pop */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col justify-end max-w-5xl mx-auto px-6 pb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-4 py-1.5 rounded-full text-white text-sm font-bold shadow-md ${trip.difficultyColor}`}>
              {trip.difficulty}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[#FF7B29] text-white text-sm font-bold shadow-md">
              {trip.price} DZD
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white drop-shadow-lg">
            {trip.title}
          </h1>
        </div>
      </div>

      {/* 2. Main Content Layout */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Left Column: Details & Map (Takes up 2/3 of space) */}
        <div className="md:col-span-2 space-y-12">
          
          {/* Quick Stats Grid */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm flex justify-between border border-gray-100">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Distance</p>
              <p className="text-xl font-bold text-gray-900">{trip.distance}</p>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Duration</p>
              <p className="text-xl font-bold text-gray-900">{trip.duration}</p>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Elevation</p>
              <p className="text-xl font-bold text-gray-900">{trip.elevation}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {trip.description}
            </p>
          </div>

          {/* Interactive Map */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Trail Location</h2>
            <div className="w-full h-[400px] rounded-[20px] overflow-hidden shadow-sm border border-gray-100">
              {trip.mapUrl ? (
                <iframe 
                  src={trip.mapUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-medium">
                  Map coming soon
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking Card (Takes up 1/3 of space) */}
        <div className="relative">
          <div className="sticky top-32 bg-white rounded-[20px] p-8 shadow-sm border border-gray-100">
            
            {/* Price Header inside the card */}
            <div className="flex items-end gap-2 mb-6 border-b border-gray-100 pb-6">
              <span className="text-4xl font-bold text-gray-900">{trip.price}</span>
              <span className="text-gray-500 font-medium mb-1">DZD / person</span>
            </div>

            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Included</h3>
            <ul className="space-y-3 mb-6">
              {trip.included.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-3 text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Render Not Included ONLY if it exists in the data */}
            {trip.notIncluded && trip.notIncluded.length > 0 && (
              <>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 mt-6">Not Included</h3>
                <ul className="space-y-3 mb-8">
                  {trip.notIncluded.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-gray-500 text-sm">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <button className="w-full bg-[#FF7B29] text-white py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors shadow-md mt-4">
              Book This Trip
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              Secure spot via CCP or BaridiMob
            </p>
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}