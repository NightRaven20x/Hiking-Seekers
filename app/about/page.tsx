import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Image from "next/image";
import { TbMountain, TbUsers, TbCertificate, TbHeart } from "react-icons/tb";

export default function AboutPage() {
  const features = [
    {
      icon: TbMountain,
      title: "Expert-Led Expeditions",
      description: "Our experienced local guides know every trail, ensuring safe and enriching adventures through Algeria's most iconic peaks."
    },
    {
      icon: TbUsers,
      title: "Small Group Sizes",
      description: "We limit group sizes to ensure personalized attention, better environmental impact, and a more intimate hiking experience."
    },
    {
      icon: TbCertificate,
      title: "Certified & Insured",
      description: "All our guides are professionally certified and our Trips are fully insured for your peace of mind on every adventure."
    },
    {
      icon: TbHeart,
      title: "Passionate Community",
      description: "Join a community of passionate hikers who share your love for nature, adventure, and Algeria's breathtaking landscapes."
    }
  ];

  return (
    <main className="min-h-screen bg-[#F3F4F6]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Background1.jpg"
            alt="About Hiking Seekers"
            fill
            className="object-cover rounded-b-3xl"
            priority
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-0" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-playfair font-medium italic text-white text-5xl md:text-7xl mb-6 drop-shadow-lg">
            Our Story
          </h1>
          <p className="font-montserrat text-white text-lg md:text-xl max-w-3xl drop-shadow-md leading-relaxed">
            Born from a passion for Algeria's natural beauty, we're dedicated to sharing the wonder of our homeland's trails with adventurers from around the world.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Where Adventure Meets <span className="text-[#4A7C59]">Heritage</span>
          </h2>
          <div className="w-20 h-1 bg-[#FF7B29] mx-auto mb-8"></div>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
          <p className="text-xl text-center">
            Hiking Seekers was founded by a group of passionate Algerian mountaineers who wanted to share the incredible beauty of our country's landscapes with the world.
          </p>
          
          <p>
            We believe that Algeria's mountains, valleys, and trails hold stories waiting to be discovered. From the dramatic peaks of Djurdjura to the serene waters of Lake Dhaya, each journey we offer is carefully crafted to showcase the diverse natural wonders of our homeland.
          </p>

          <p>
            Our mission goes beyond simply guiding hikes. We're committed to sustainable tourism practices, supporting local communities, and preserving the pristine environments we explore. Every expedition is designed to leave minimal impact while creating maximum memories.
          </p>

          <p>
            With professional local guides who have spent years exploring every trail, we ensure that your adventure is not only safe and well-organized but also rich with cultural insights and authentic experiences that you won't find anywhere else.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-[#4A7C59]">Hiking Seekers</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're more than just a hiking agency—we're your gateway to authentic Algerian adventures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-[#F3F4F6] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-[#4A7C59] rounded-full flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2 className="font-playfair font-medium italic text-4xl md:text-5xl text-gray-900 mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Join us on an unforgettable adventure through Algeria's most stunning landscapes. Your next great story begins here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/trips">
            <button className="px-8 py-4 bg-[#FF7B29] text-white font-bold rounded-full hover:bg-orange-600 transition-all duration-300 hover:scale-105 shadow-lg">
              Explore Our Trips
            </button>
          </a>
          <a href="/contact">
            <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-105">
              Get In Touch
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
