export default function StatsBar() {
  const stats = [
    { label: "Satisfaction", value: "94%" },
    { label: "Years of Experience", value: "02+" },
    { label: "Total Trips", value: "1k" },
    { label: "Average Rating", value: "4.6" },
  ];
 
  return (
    <section className="relative z-20 px-4 max-w-6xl mx-auto">
      {/* Negative margin pulls this UP to overlap the hero image */}
      <div className="-mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-lg py-6 px-4 text-center transform transition hover:-translate-y-1 duration-300"
          >
            <h3 className="text-3xl font-bold text-gray-900 font-serif">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-500 mt-1 uppercase tracking-wide font-montserrat font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}