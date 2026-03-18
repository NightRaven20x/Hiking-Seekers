import React from 'react';
import Link from 'next/link';

interface TripCardProps {
  id: number;
  title: string;
  price: string;
  difficulty: string;
  imageUrl: string;
  difficultyColor: string;
}

const TripCard: React.FC<TripCardProps> = ({ id, title, price, difficulty, imageUrl, difficultyColor }) => {
  return (
    <Link href={`/trips/${id}`} className="block group">
      <div className="bg-white rounded-[20px] overflow-hidden shadow-sm flex flex-col cursor-pointer transition-transform hover:-translate-y-1 duration-300 border border-gray-100">
        
        <div className="relative h-[260px] w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-[#FF7B29] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md z-10">
            {price} DZD
          </div>
          <div className={`absolute bottom-4 right-4 ${difficultyColor} text-white text-sm font-semibold px-3 py-1.5 rounded-[8px] flex items-center gap-1.5 shadow-md z-10`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 6l7 15H3l6-10 2 4 3-9z" />
            </svg>
            {difficulty}
          </div>
        </div>

        <div className="p-4 px-5 flex justify-between items-center bg-white border-t border-gray-100">
          <h3 className="font-serif text-xl font-bold text-gray-900">{title}</h3>
          
          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-500 group-hover:bg-[#FF7B29] group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;