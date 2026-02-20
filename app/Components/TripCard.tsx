import React from 'react';

interface TripCardProps {
  title: string;
  price: string;
  difficulty: string;
  imageUrl: string;
  difficultyColor: string;
}

const TripCard: React.FC<TripCardProps> = ({ title, price, difficulty, imageUrl, difficultyColor }) => {
  return (
    <div className="bg-trip-card rounded-[20px] overflow-hidden shadow-sm flex flex-col group cursor-pointer transition-transform hover:-translate-y-1 duration-300">
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
      <div className="p-4 px-5 flex justify-between items-center bg-trip-card border-t border-trip-card-border">
        <h3 className="font-serif text-xl font-bold text-foreground">{title}</h3>
        <div className="w-8 h-8 bg-trip-arrow-bg rounded flex items-center justify-center text-muted-foreground group-hover:bg-trip-orange group-hover:text-trip-orange-foreground transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
