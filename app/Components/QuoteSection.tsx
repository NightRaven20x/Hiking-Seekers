import { TbCampfire } from "react-icons/tb";
import { FiMapPin } from "react-icons/fi";

export default function QuoteSection() {
  const sageColor = "#7A8B7D"; 

  return (
    <section className="py-24 flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      
      {/* --- BACKGROUND ARROWS --- */}
      <div 
        className="absolute inset-0 z-0 opacity-70 bg-[url('/images/Arrowss.svg')] bg-center bg-no-repeat bg-contain"
      ></div>

      {/* --- CONTENT WRAPPER --- */}
      {/* Added relative z-10 so the text and icons sit on TOP of the arrows */}
      <div className="relative z-10 flex flex-col items-center w-full">
      
        {/* --- TOP DIVIDER (CAMPFIRE) --- */}
        <div className="flex items-center gap-4 md:gap-6 mb-10">
          {/* Left Line & Diamond */}
          <div className="flex items-center w-24 md:w-40 lg:w-56">
            <div className="w-2 h-2 shrink-0 rotate-45" style={{ backgroundColor: sageColor }}></div>
            <div className="h-0.5 w-full" style={{ backgroundColor: sageColor }}></div>
          </div>

          {/* Campfire Icon */}
          <TbCampfire className="text-4xl md:text-5xl stroke-[1.5]" style={{ color: sageColor }} />

          {/* Right Line & Diamond */}
          <div className="flex items-center w-24 md:w-40 lg:w-56">
            <div className="h-0.5 w-full" style={{ backgroundColor: sageColor }}></div>
            <div className="w-2 h-2 shrink-0 rotate-45" style={{ backgroundColor: sageColor }}></div>
          </div>
        </div>

        {/* --- THE QUOTE --- */}
        <h2 className="text-2xl md:text-4xl font-semibold italic text-gray-900 max-w-4xl leading-relaxed mb-10">
          "Every path tells a story. <br className="hidden md:block" /> 
          Experience Algeria's iconic peaks through expert-led expeditions"
        </h2>

        {/* --- BOTTOM DIVIDER (MAP PIN) --- */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Left Line & Diamond */}
          <div className="flex items-center w-24 md:w-40 lg:w-56">
            <div className="w-2 h-2 shrink-0 rotate-45" style={{ backgroundColor: sageColor }}></div>
            <div className="h-0.5 w-full" style={{ backgroundColor: sageColor }}></div>
          </div>

          {/* Map Pin Icon */}
          <FiMapPin className="text-3xl md:text-4xl stroke-2" style={{ color: sageColor }} />

          {/* Right Line & Diamond */}
          <div className="flex items-center w-24 md:w-40 lg:w-56">
            <div className="h-0.5 w-full" style={{ backgroundColor: sageColor }}></div>
            <div className="w-2 h-2 shrink-0 rotate-45" style={{ backgroundColor: sageColor }}></div>
          </div>
        </div>

      </div>
    </section>
  );
}