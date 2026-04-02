import React from 'react';
import Link from 'next/link';

interface TripCardProps {
  id: number;
  title: string;
  imageUrl: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  width?: string;
  height?: string;
  maxWidth?: string;
}

const TripCard: React.FC<TripCardProps> = ({ 
  id, 
  title, 
  imageUrl, 
  difficulty = 'Medium',
  width = "580px",
  height = "420px",
  maxWidth = "none"
}) => {
  
  // Difficulty color mapping
  const difficultyColors = {
    Easy: 'bg-[#12B872]/80 border-[0.5px] border-white/30 backdrop-blur-md shadow-inner',
    Medium: 'bg-[#FF7800]/80 border-[0.5px] border-white/30 backdrop-blur-md shadow-inner',
    Hard: 'bg-[#DD3131]/80 border-[0.5px] border-white/30 backdrop-blur-md shadow-inner'
  };

  return (
    <Link href={`/trips/${id}`} className="block group ">
      <div 
        className="relative mx-auto"
        style={{ width, maxWidth}}
      >
        
        {/* Main Card Container - Pill Shape */}
        <div className="relative bg-white rounded-[100px] overflow-visible shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          
          {/* Image Section - Pill Top with Custom Height */}
          <div 
            className="relative overflow-hidden rounded-t-[100px] rounded-b-[30px] rounnded-bl-[-100px] "
            style={{ height }}
          >
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Difficulty Circle - Bottom Right */}
            <div 
              className={`absolute bottom-20 right-4 w-10 h-10 rounded-full shadow-lg ${difficultyColors[difficulty as keyof typeof difficultyColors]}`}
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
              }}
            />
          </div>

          {/* White Bottom Section - Overlaps Image */}
          <div className="relative -mt-16 pt-6 pb-6 px-8 text-center rounded-tr-[50px] bg-white rounded-b-[100px]">
            
            {/* Trip Title */}
            <h3 className="text-3xl md:text-4xl font-Montserrat font-semibold text-black uppercase tracking-tight mb-3">
              {title}
            </h3>

            {/* Full Overview Button */}
            <button className="inline-block px-8 py-2.5 border-2 border-[#E67E22]/40 text-[#E67E22] rounded-full font-Montserrat font-medium text-sm tracking-wider transition-all duration-300 hover:bg-[#E67E22] hover:text-white hover:scale-105 hover:border-[#E67E22]">
              FULL OVERVIEW
            </button>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default TripCard;