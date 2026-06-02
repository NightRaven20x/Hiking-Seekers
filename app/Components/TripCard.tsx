import React from 'react';
import Link from 'next/link';

type Difficulty = 'Easy' | 'Medium' | 'Hard';
type Variant = 'wide' | 'compact';

interface TripCardProps {
  id: number;
  title: string;
  imageUrl: string;
  difficulty?: Difficulty;
  variant?: Variant;
}

const difficultyConfig: Record<Difficulty, { color: string; label: string }> = {
  Easy:   { color: 'bg-[#12B872]/80', label: 'Easy' },
  Medium: { color: 'bg-[#FF7800]/80', label: 'Medium' },
  Hard:   { color: 'bg-[#DD3131]/80', label: 'Hard' },
};

const variantConfig: Record<Variant, { card: string; image: string }> = {
  wide:    { 
    card:  'w-full sm:w-[580px] lg:w-[630px]', 
    image: 'h-[220px] sm:h-[260px] lg:h-[300px]' 
  },
  compact: { 
    card:  'w-full sm:w-[580px] lg:w-[490px]', 
    image: 'h-[220px] sm:h-[260px] lg:h-[300px]' 
  },
};

const TripCard: React.FC<TripCardProps> = ({
  id,
  title,
  imageUrl,
  difficulty = 'Medium',
  variant = 'wide',
}) => {
  const { color } = difficultyConfig[difficulty];
  const { card, image } = variantConfig[variant];

  return (
    <Link href={`/trips/${id}`} className="block group w-full sm:w-auto">
      <div className={`relative mx-auto ${card}`}>

        {/* Card Container */}
        <div className="relative bg-white rounded-[100px] overflow-visible shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

          {/* Image */}
          <div className={`relative overflow-hidden rounded-t-[100px] rounded-b-[30px] ${image}`}>
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Difficulty dot */}
            <div
              className={`absolute bottom-16 right-4 w-10 h-10 rounded-full shadow-lg border border-white/30 backdrop-blur-md ${color}`}
            />
          </div>

          {/* Bottom white section */}
          <div className="relative -mt-16 pt-6 pb-6 px-8 text-center rounded-tr-[50px] bg-white rounded-b-[100px]">
            <h3 className="text-2xl md:text-3xl font-semibold text-black uppercase tracking-tight mb-3"
                style={{ fontFamily: 'var(--font-montserrat)' }}>
              {title}
            </h3>
            <button className="inline-block px-8 py-2.5 border-2 border-[#E67E22]/40 text-[#E67E22] rounded-full font-medium text-sm tracking-wider transition-all duration-300 hover:bg-[#E67E22] hover:text-white hover:scale-105 hover:border-[#E67E22]"
                    style={{ fontFamily: 'var(--font-montserrat)' }}>
              FULL OVERVIEW
            </button>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default TripCard;