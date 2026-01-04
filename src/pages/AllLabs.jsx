import React from "react";
import Plus from "../components/Plus";
import Line from "../components/Line";
import Menu from "../components/Menu";
import Star from "../components/Star";
import Wheel from "../components/Wheel";

const AllLabs = () => {
  return (
    <>
      <div className="bg-transparent w-screen h-screen relative overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <Wheel />
        </div>

        <div className="fixed inset-0 pointer-events-none z-10">
          <Plus className="absolute top-4 left-4" size={20} thickness={2} />
          <Plus className="absolute top-4 right-4" size={20} thickness={2} />

          <div className="p-[11px] absolute top-[calc(1rem+25px)] bottom-[calc(1rem+25px)] right-4 w-0.5">
            <Line variant="vertical" thickness={2} />
          </div>

          <div className="p-[11px] absolute top-[calc(1rem+25px)] bottom-[calc(1rem+25px)] left-4 w-0.5">
            <Line variant="vertical" thickness={2} />
          </div>

          <Plus className="absolute bottom-4 left-4" size={20} thickness={2} />

          <div className="p-[11px] absolute bottom-4 left-[calc(1rem+25px)] right-[calc(1rem+25px)] h-0.5">
            <Line variant="horizontal" thickness={1} />
          </div>

          <div className="z-50 absolute top-8 left-0 right-0 flex justify-center pointer-events-auto">
            <Menu />
          </div>

          <div className="p-[11px] absolute top-4 left-[calc(1rem+25px)] right-[calc(1rem+25px)] h-0.5">
            <Line variant="horizontal" thickness={2} />
          </div>

          <Plus className="absolute bottom-4 right-4" size={20} thickness={2} />
        </div>
      </div>
    </>
  );
};

export default AllLabs;
