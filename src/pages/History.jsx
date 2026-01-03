import React from "react";
import Plus from "../components/Plus";
import Line from "../components/Line";
import Menu from "../components/Menu";
import Star from "../components/Star";
import HistoryContent from "./HistoryContent";

const Home = () => {
  return (
    <>
      <div className="bg-black w-screen h-screen relative">
        {/* HOME CONTENT*/}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <HistoryContent/>
        </div>

        {/* BORDER ELEMENTS */}
        <div className=" fixed inset-0">
          {/* TOP LEFT */}
          <Plus className="absolute top-4 left-4" size={20} thickness={2} />

          {/* TOP RIGHT */}
          <Plus className="absolute top-4 right-4" size={20} thickness={2} />

          <div className="absolute top-12 right-12 lg:top-18 lg:right-24 flex gap-5 z-10">
            
            <Star className="w-4 h-4 md:w-5 md:h-5 lg:w-10 lg:h-10 text-white" />
            <Star className="w-4 h-4 md:w-5 md:h-5 lg:w-10 lg:h-10 text-white" />
            <Star className="w-4 h-4 md:w-5 md:h-5 lg:w-10 lg:h-10 text-white" />
          </div>

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

          {/*top line*/}
          <div className="z-50 absolute top-8 left-0 right-0 flex justify-center">
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
        </div>
      </div>
    </>
  );
};

export default Home;
