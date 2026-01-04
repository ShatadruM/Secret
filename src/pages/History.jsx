import React from "react";
import Plus from "../components/Plus";
import Line from "../components/Line";
import Menu from "../components/Menu";
import Star from "../components/Star";
import Time from "../components/Time";
import Location from "../components/Location";
import HistoryContent from "./HistoryContent";

const Home = () => {
  return (
    <>
      {/* 1. CHANGED: Use min-h-screen so the page can be taller than the viewport */}
      <div className="bg-black w-full min-h-screen relative">
        
        {/* 2. CHANGED: Removed 'absolute inset-0'. 
            This allows HomeContent to push the page height down, creating a scrollbar. */}
        <div className="relative z-0">
          <HistoryContent />
        </div>

        {/* BORDER ELEMENTS (UI Overlay) */}
        {/* 3. ADDED: pointer-events-none so this layer doesn't block mouse interactions */}
        <div className="fixed inset-0 pointer-events-none">
          
          {/* TOP LEFT */}
          <Plus className="absolute top-4 left-4" size={20} thickness={2} />
          <div className="absolute top-12 left-12 lg:top-18 lg:left-24 z-10">
            
           <Time/>
          </div>

          {/* TOP RIGHT */}
          <Plus className="absolute top-4 right-4" size={20} thickness={2} />

         
          <div className="absolute top-12 right-12 lg:top-18 lg:right-24 flex gap-5 z-10">
            <Star className="w-4 h-4 md:w-5 md:h-5 lg:w-10 lg:h-10 text-white" />
            <Star className="w-4 h-4 md:w-5 md:h-5 lg:w-10 lg:h-10 text-white" />
            <Star className="w-4 h-4 md:w-5 md:h-5 lg:w-10 lg:h-10 text-white" />
          </div>

          {/* Right Vertical Line */}
          <div
            className="
              p-[11px]
              absolute 
              top-[calc(1rem+25px)]
              bottom-[calc(1rem+25px)]
              right-4
              w-0.5
            "
          >
            <Line variant="vertical" thickness={2} />
          </div>

          {/* Left Vertical Line */}
          <div
            className="
              p-[11px]
              absolute 
              top-[calc(1rem+25px)]
              bottom-[calc(1rem+25px)]
              left-4
              w-0.5
            "
          >
            <Line variant="vertical" thickness={2} />
          </div>

          {/* BOTTOM LEFT */}
          <Plus className="absolute bottom-4 left-4" size={20} thickness={2} />

          {/* Bottom Horizontal Line */}
          <div
            className="
              p-[11px]
              absolute bottom-4
              left-[calc(1rem+25px)]
              right-[calc(1rem+25px)]
              h-0.5
            "
          >
            <Line variant="horizontal" thickness={1} />
          </div>

          {/* TOP MENU & LINE */}
          {/* Note: Added pointer-events-auto to Menu so buttons still work */}
          <div className="z-50 absolute top-8 left-0 right-0 flex justify-center pointer-events-auto">
            <Menu />
          </div>
          <div
            className="
              p-[11px]
              absolute top-4
              left-[calc(1rem+25px)]
              right-[calc(1rem+25px)]
              h-0.5
            "
          >
            <Line variant="horizontal" thickness={2} />
          </div>

          {/* BOTTOM RIGHT */}
          <Plus className="absolute bottom-4 right-4" size={20} thickness={2} />
          <div className="absolute bottom-12 right-12 lg:bottom-18 lg:right-24 z-10">
            <Location/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;