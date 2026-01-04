import React, { useState } from "react";

export default function Menu({ className = '' }) {
  const [isOpen, setIsOpen] = useState(false);

  // Configuration
  const innerRadius = 114; 
  const outerRadius = 320; 
  const center = { x: 350, y: 0 }; 

  const handleNav = (link) => {
    // console.log("Navigating to:", link);
    // window.location.href = link; 
    setIsOpen(false);
  };

  const mobileItems = [
    { label: 'HOME', path: '/' },
    { label: 'WORK', path: '/work' },
    { label: 'ABOUT', path: '/about' }
  ];

  return (
    <>
      {/* overlay  */}
      <div 
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setIsOpen(false)}
      />

      <div className={`relative flex items-center justify-center ${className} z-50`}>

       
        {/* DESKTOP DIAL (Hidden on Mobile)*/}
        
        <div 
          className={`
            hidden md:block
            absolute top-0
            transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            origin-top
            ${isOpen ? "scale-100" : "scale-0"}
          `}
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
           <svg width="700" height="350" viewBox="0 0 700 350" className="overflow-visible drop-shadow-2xl">
            {/* LEFT SLICE (Work) */}
            <g onClick={() => handleNav('/work')} className="group cursor-pointer">
              <path 
                d={`
                  M ${center.x - innerRadius} ${center.y} 
                  L ${center.x - outerRadius} ${center.y} 
                  A ${outerRadius} ${outerRadius} 0 0 0 ${center.x + outerRadius * Math.cos(2.0944)} ${center.y + outerRadius * Math.sin(2.0944)}
                  L ${center.x + innerRadius * Math.cos(2.0944)} ${center.y + innerRadius * Math.sin(2.0944)}
                  A ${innerRadius} ${innerRadius} 0 0 1 ${center.x - innerRadius} ${center.y} 
                  Z
                `}
                className="fill-black stroke-white stroke-[1.5] transition-colors duration-300 group-hover:fill-white"
              />
              <text 
                x={center.x + (innerRadius + 120) * Math.cos(2.61799)} 
                y={center.y + (innerRadius + 120) * Math.sin(2.61799)} 
                className="fill-white text-2xl font-bold transition-colors duration-300 group-hover:fill-black pointer-events-none"
                textAnchor="middle"
                transform={`rotate(-30 ${center.x + (innerRadius + 120) * Math.cos(2.61799)} ${center.y + (innerRadius + 120) * Math.sin(2.61799)})`}
              >
                WORK
              </text>
            </g>

            {/* MIDDLE SLICE (Home) */}
            <g onClick={() => handleNav('/')} className="group cursor-pointer">
              <path 
                d={`
                  M ${center.x + innerRadius * Math.cos(2.0944)} ${center.y + innerRadius * Math.sin(2.0944)}
                  L ${center.x + outerRadius * Math.cos(2.0944)} ${center.y + outerRadius * Math.sin(2.0944)}
                  A ${outerRadius} ${outerRadius} 0 0 0 ${center.x + outerRadius * Math.cos(1.0472)} ${center.y + outerRadius * Math.sin(1.0472)}
                  L ${center.x + innerRadius * Math.cos(1.0472)} ${center.y + innerRadius * Math.sin(1.0472)}
                  A ${innerRadius} ${innerRadius} 0 0 1 ${center.x + innerRadius * Math.cos(2.0944)} ${center.y + innerRadius * Math.sin(2.0944)}
                  Z
                `}
                className="fill-black stroke-white stroke-[1.5] transition-colors duration-300 group-hover:fill-white"
              />
              <text 
                x={center.x} 
                y={center.y + innerRadius + 100} 
                className="fill-white text-2xl font-bold transition-colors duration-300 group-hover:fill-black pointer-events-none"
                textAnchor="middle"
              >
                HOME
              </text>
            </g>

            {/* RIGHT SLICE (About) */}
            <g onClick={() => handleNav('/about')} className="group cursor-pointer">
              <path 
                d={`
                  M ${center.x + innerRadius * Math.cos(1.0472)} ${center.y + innerRadius * Math.sin(1.0472)}
                  L ${center.x + outerRadius * Math.cos(1.0472)} ${center.y + outerRadius * Math.sin(1.0472)}
                  A ${outerRadius} ${outerRadius} 0 0 0 ${center.x + outerRadius} ${center.y}
                  L ${center.x + innerRadius} ${center.y}
                  A ${innerRadius} ${innerRadius} 0 0 1 ${center.x + innerRadius * Math.cos(1.0472)} ${center.y + innerRadius * Math.sin(1.0472)}
                  Z
                `}
                className="fill-black stroke-white stroke-[1.5] transition-colors duration-300 group-hover:fill-white"
              />
              <text 
                x={center.x + (innerRadius + 120) * Math.cos(0.5236)} 
                y={center.y + (innerRadius + 120) * Math.sin(0.5236)} 
                className="fill-white text-2xl font-bold transition-colors duration-300 group-hover:fill-black pointer-events-none"
                textAnchor="middle"
                transform={`rotate(30 ${center.x + (innerRadius + 120) * Math.cos(0.5236)} ${center.y + (innerRadius + 120) * Math.sin(0.5236)})`}
              >
                ABOUT
              </text>
            </g>
           </svg>
        </div>

       
        {/* MOBILE MENU (Updated Structure)*/}
        
        <div className={`
            md:hidden
            absolute 
            /* Changed top-36 to top-28 to fit closer to the smaller button */
            top-28
            flex flex-col
            items-center
            w-80
            bg-transparent
            transition-all duration-300
            ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
        `}>
          {mobileItems.map((item) => (
             <div 
               key={item.label}
               className="
                 w-full 
                 border-b border-white 
                 last:border-b-0
                 flex justify-center
               "
             >
                <button 
                  onClick={() => handleNav(item.path)}
                  className="
                    w-full py-6
                    text-white 
                    text-2xl font-bold tracking-widest text-center
                    hover:bg-white hover:text-black 
                    transition-colors
                  "
                >
                  {item.label}
                </button>
             </div>
          ))}
        </div>

       
        {/* MAIN BUTTON (Shared)                           */}
       
        
        {/* Decor Backing */}
        <div className="
          z-50
          absolute 
          /* MOBILE SIZES */
          -bottom-6 
          w-60
          h-24 
          
          /* DESKTOP SIZES (Restored to original) */
          md:-bottom-10
          md:w-80
          md:h-32

          bg-black 
          rounded-b-full
          rounded-t-none 
        "></div>

        {/* Interactive Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`
            z-50
            absolute 

            /* MOBILE SIZES */
            -bottom-8 
            w-40 
            h-20
            text-lg

            /* DESKTOP SIZES (Restored to original) */
            md:-bottom-12
            md:w-56 
            md:h-28 
            md:text-xl

            bg-black 
            text-white
            rounded-t-none
            rounded-b-full
            flex items-center justify-center
            border border-white
            transition-all duration-300
            
            hover:bg-white 
            hover:text-black
          `}
        >
          {isOpen ? "close" : "menu"}
        </button>

      </div>
    </>
  );
}