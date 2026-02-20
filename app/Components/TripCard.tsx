import React from 'react';

// 1. Define the TypeScript Interface for the props
interface TripCardProps {
  title: string;
  price: string;
  difficulty: string;
  imageUrl: string;
  difficultyColor: string;
}

// 2. Apply the interface to the component
const TripCard: React.FC<TripCardProps> = ({ title, price, difficulty, imageUrl, difficultyColor }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col transition-transform hover:scale-105 duration-300">
      {/* Image Container with Relative Positioning for Badges */}
      <div className="relative h-48 w-full">
        <img 
          src={imageUrl} 
          alt={`Hiking trip to ${title}`} 
          className="object-cover w-full h-full" 
        />
        
        {/* Floating Price Tag (Orange) */}
        <div className="absolute top-3 right-3 bg-[#ff6b35] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          {price} DZD
        </div>
        
        {/* Floating Difficulty Badge (Dynamic Color) */}
        <div className={`absolute bottom-3 right-3 ${difficultyColor} text-white text-xs font-bold px-3 py-1 rounded-md flex items-center gap-1 shadow-sm`}>
          <span>⛰️</span> {difficulty}
        </div>
      </div>

      {/* Title and Action Area */}
      <div className="p-4 flex justify-between items-center bg-gray-50">
        <h3 className="font-serif text-lg font-bold text-gray-900">{title}</h3>
        <button className="text-gray-400 hover:text-gray-800 transition-colors" aria-label={`View details for ${title}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TripCard;