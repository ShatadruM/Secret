import React from 'react';

const Wheel = () => {
  // 1. Configuration
  const size = 500; 
  const cx = size / 2; 
  const cy = size / 2; 
  const radius = 200; 
  const textRadius = 140; 
  const numSections = 5;
  const angleStep = 360 / numSections; 

  // 2. Placeholder Data
  const sections = [
    { title: "Tesla"},
    { title: "Pausch"},
    { title: "Norman" },
    { title: "Satoshi"},
    { title: "McCarthy"},
  ];

  // 3. Helper: Math for coordinates
  const getCoordinatesForAngle = (angle, offsetRadius = radius) => {
    const rads = (angle - 90) * (Math.PI / 180.0);
    return {
      x: cx + offsetRadius * Math.cos(rads),
      y: cy + offsetRadius * Math.sin(rads),
    };
  };

  // 4. Helper: Create SVG Path
  const createSlicePath = (startAngle, endAngle) => {
    const start = getCoordinatesForAngle(startAngle);
    const end = getCoordinatesForAngle(endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", cx, cy,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y,
      "Z"
    ].join(" ");
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 flex items-center justify-center">
      <svg 
        viewBox={`0 0 ${size} ${size}`} 
        className="w-full h-auto drop-shadow-2xl overflow-visible"
      >
        {sections.map((item, index) => {
          const startAngle = index * angleStep;
          const endAngle = (index + 1) * angleStep;
          const midAngle = startAngle + (angleStep / 2);
          const textCoords = getCoordinatesForAngle(midAngle, textRadius);

          return (
            // Added scale and origin on hover to the group for a "pop" effect
            <g 
              key={index} 
              className="
                group cursor-pointer 
                transition-transform duration-300 ease-out 
                origin-[250px_250px] 
                hover:scale-105
              "
            >
              
              {/* THE SLICE SHAPE */}
              <path
                d={createSlicePath(startAngle, endAngle)}
                className="
                  fill-transparent 
                  stroke-white 
                  stroke-2 
                  transition-all 
                  duration-300 
                  ease-out
                  group-hover:stroke-[6px] 
                  group-hover:fill-white/10
                "
              />
              
              {/* TEXT CONTENT */}
              <text
                x={textCoords.x}
                y={textCoords.y}
                textAnchor="middle" 
                dominantBaseline="middle" 
                className="fill-white pointer-events-none"
              >
                <tspan x={textCoords.x} dy="-0.6em" className="font-bold text-xl font-sans tracking-wider">
                  {item.title}
                </tspan>
                <tspan x={textCoords.x} dy="1.4em" className="text-xs font-sans opacity-70 uppercase tracking-widest">
                  {item.subtitle}
                </tspan>
              </text>
            </g>
          );
        })}

        {/* CENTER HUB */}
        {/* Radius reduced to 25 (was radius * 0.2 = 40) */}
        <circle 
          cx={cx} 
          cy={cy} 
          r={25} 
          className="fill-black stroke-white stroke-2 pointer-events-none"
        />
        
      </svg>
    </div>
  );
};

export default Wheel;