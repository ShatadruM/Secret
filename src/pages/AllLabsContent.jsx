import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom' 
import Wheel from "../components/Wheel"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Import SVGs
import PauschImage from "../assets/pausch_mascot.svg?react";
import NormanImage from "../assets/norman_mascot.svg?react";
import SatoshiImage from "../assets/satoshi_mascot.svg?react";
import MccarthyImage from "../assets/mccarthy_mascot.svg?react";
import TeslaImage from "../assets/tesla_mascot.svg?react";

const AllLabsContent = () => {
  const sections = [
    { 
      title: "Tesla", 
      desc: "Nikola Tesla was a futurist best known for his contributions to the design of the modern alternating current (AC) electricity supply system.",
      Component: TeslaImage,
      color: "text-yellow-400",
      link: "/members/tesla" 
    },
    { 
      title: "Pausch", 
      desc: "Randy Pausch was a professor known for his 'Last Lecture' and his work in computer science and human-computer interaction.",
      Component: PauschImage,
      color: "text-purple-400",
      link: "/members/pausch"
    },
    { 
      title: "Norman", 
      desc: "Don Norman is the director of The Design Lab and best known for his books on design, especially 'The Design of Everyday Things'.",
      Component: NormanImage,
      color: "text-blue-400",
      link: "/members/norman"
    },
    { 
      title: "Satoshi", 
      desc: "Satoshi Nakamoto is the presumed pseudonym of the person or persons who developed Bitcoin and authored the bitcoin white paper.",
      Component: SatoshiImage,
      color: "text-orange-500",
      link: "/members/satoshi"
    },
    { 
      title: "McCarthy", 
      desc: "John McCarthy was one of the founders of the discipline of artificial intelligence and created the Lisp programming language.",
      Component: MccarthyImage,
      color: "text-green-400",
      link: "/members/mccarthy"
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeData = sections[activeIndex];

  const containerRef = useRef(null);
  const textRef = useRef(null);
  const bgSvgRef = useRef(null);

  useGSAP(() => {
    // Text Animation
    gsap.fromTo(textRef.current.children, 
      { 
        opacity: 0, 
        filter: "blur(15px)",
        y: 10 
      },
      { 
        opacity: 1, 
        filter: "blur(0px)",
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      }
    );

    // Background SVG Animation
    gsap.fromTo(bgSvgRef.current, 
      { 
        opacity: 0, 
        filter: "blur(40px)", 
        scale: 0.95 
      },
      { 
        opacity: 1, 
        filter: "blur(0px)",
        scale: 1,
        duration: 1.2, 
        ease: "power2.out"
      }
    );

  }, { dependencies: [activeIndex], scope: containerRef });

  return (
    <div ref={containerRef} className='w-full h-full min-h-screen flex flex-col md:flex-row justify-start items-center overflow-hidden py-10 md:py-0'>
        
       
        <div className='w-full md:w-1/2 h-auto flex justify-center z-20 order-1'>
           
            <div className="scale-100 md:scale-275">
                <Wheel 
                  sections={sections} 
                  onSliceClick={setActiveIndex} 
                />
            </div>
        </div>

        <div className='relative w-full md:w-1/2 h-full flex flex-col justify-center items-center md:items-end px-6 md:px-16 z-10 text-center md:text-right order-2 mt-8 md:mt-0'>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-auto md:right-0 md:translate-x-1/3 pointer-events-none">
                <div ref={bgSvgRef}> 
                    <activeData.Component 
                        className={`
                          /* Mobile Size vs Desktop Size */
                          w-[300px] h-[300px] md:w-[1000px] md:h-[1000px] 
                          [&_path]:fill-current
                          ${activeData.color}
                          opacity-50 
                        `}
                    />
                </div>
            </div>

            {/* Text Content Wrapper */}
            <div ref={textRef} className="relative z-10 flex flex-col items-center md:items-end">
                {/* Title: Smaller on mobile */}
                <h1 className="clash-title text-5xl md:text-8xl font-bold text-white mb-4 md:mb-6 leading-tight">
                   {activeData.title}
                </h1>
                
                {/* Description: Smaller text on mobile */}
                <p className="unbounded-normal text-base md:text-xl text-zinc-300 leading-relaxed max-w-sm md:max-w-lg mb-6 md:mb-8">
                   {activeData.desc}
                </p>

                <Link 
                  to={activeData.link}
                  className="
                    unbounded-normal
                    text-white text-xs md:text-sm uppercase tracking-widest
                    border-2 border-white
                    px-6 py-2 md:px-8 md:py-3
                    transition-all duration-300
                    hover:bg-white hover:text-black hover:scale-105
                  "
                >
                  Members
                </Link>
            </div>
            
        </div>
    </div>
  )
}

export default AllLabsContent