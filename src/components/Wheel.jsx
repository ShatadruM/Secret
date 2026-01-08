import React, { useState } from 'react';

const Wheel = ({ sections, onSliceClick }) => {
  
  // 1. Configuration
  const size = 500; 
  const cx = size / 2; 
  const cy = size / 2; 
  const radius = 200; 
  const iconRadius = 140; 
  const iconSize = 140; 
  
  const numSections = sections.length; 
  const angleStep = 360 / numSections; 

  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Helpers
  const getCoordinatesForAngle = (angle, offsetRadius = radius) => {
    const rads = (angle - 90) * (Math.PI / 180.0);
    return {
      x: cx + offsetRadius * Math.cos(rads),
      y: cy + offsetRadius * Math.sin(rads),
    };
  };

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
    <div className="w-full max-w-3xl p-4 flex items-center justify-center">
      <svg 
        viewBox={`0 0 ${size} ${size}`} 
        className="w-full h-auto drop-shadow-2xl overflow-visible"
      >
        <defs>
          {sections.map((item, index) => (
            <radialGradient
              key={`grad-${index}`}
              id={`gradient-${index}`}
              cx={cx} cy={cy}
              r={radius}
              gradientUnits="userSpaceOnUse"
              className={item.color} 
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {sections.map((item, index) => {
          const startAngle = index * angleStep;
          const endAngle = (index + 1) * angleStep;
          const midAngle = startAngle + (angleStep / 2);
          const iconCoords = getCoordinatesForAngle(midAngle, iconRadius);
          
          const isHovered = hoveredIndex === index;
          const pathData = createSlicePath(startAngle, endAngle);

          return (
            <g 
              key={index} 
              onClick={() => onSliceClick(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                group cursor-pointer 
                transition-transform duration-300 ease-out 
                origin-[250px_250px] 
                hover:scale-105
                ${isHovered ? item.color : 'text-white'}
              `}
            >
              {/* LAYER 1: The Gradient Fill (Animated) */}
              <path
                d={pathData}
                fill={`url(#gradient-${index})`}
                className={`
                  stroke-none 
                  transition-opacity duration-500 ease-in-out /* Smooth Fade Logic */
                  ${isHovered ? 'opacity-100' : 'opacity-0'}  /* Trigger */
                `}
              />

              {/* LAYER 2: The White Border (Static) */}
              <path
                d={pathData}
                fill="transparent"
                className="stroke-2 stroke-white pointer-events-none" 
              />
              
              {/* LAYER 3: The Icon */}
              <item.Component
                x={iconCoords.x - (iconSize / 2)}
                y={iconCoords.y - (iconSize / 2)}
                width={iconSize}
                height={iconSize}
                className="
                    pointer-events-none 
                    text-white 
                    [&_path]:fill-current
                    drop-shadow-lg
                "
              />
            </g>
          );
        })}

        <circle 
          cx={cx} 
          cy={cy} 
          r={25} 
          className="fill-black stroke-white stroke-2 pointer-events-none z-50 relative"
        />
      </svg>
    </div>
  );
};

export default Wheel;