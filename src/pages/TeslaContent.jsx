import React, { useRef } from 'react'
import Star from '../components/Star'
import TeslaImage from "../assets/tesla_mascot.svg?react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const TeslaContent = () => {
  // Config
  const IMAGE_COUNT = 8;
  const OVERLAP_RATIO = 0.75;

  // Refs for animation
  const containerRef = useRef(null);
  const textRef = useRef(null);

  // GSAP Animation Logic
  useGSAP(() => {
    // Target the children of the text container (Title div + Keywords div)
    const elements = textRef.current.children;
    
    gsap.fromTo(elements, 
      { 
        opacity: 0, 
        filter: "blur(50px)", // Start blurry
        y: 0                 
      },
      { 
        opacity: 1, 
        filter: "blur(0px)",  // Clear up
        y: 0,
        duration: 1.2,        // Slow, dreamy duration
        stagger: 0.3,         // Title appears, then keywords follow
        ease: "power2.out",
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className='relative w-full min-h-screen bg-transparent overflow-hidden'>
      
      {/* === 1. BACKGROUND LAYER (Static) === */}
      <div className='absolute inset-0 w-full h-full pointer-events-none z-0 [--size:160vw] md:[--size:80vw] [--offset:-75%] md:[--offset:-25%]'>
        {Array.from({ length: IMAGE_COUNT }).map((_, index) => {
          const isRightSide = index % 2 === 0;
          
          return (
            <div
              key={index}
              className="absolute opacity-50 transition-all duration-300 ease-out" 
              style={{
                width: 'var(--size)',
                height: 'var(--size)',
                top: `calc(${index} * (var(--size) * ${OVERLAP_RATIO}) - (var(--size) * 0.5))`,
                right: isRightSide ? 'var(--offset)' : 'auto',
                left: isRightSide ? 'auto' : 'var(--offset)',
              }}
            >
              <TeslaImage 
                className={`
                  w-full h-full 
                  text-yellow-400
                  [&_path]:fill-current
                `} 
              />
            </div>
          );
        })}
      </div>

      {/* === 2. FOREGROUND CONTENT (Animated) === */}
      <div 
        ref={textRef} // Attached Ref Here
        className='relative z-10 flex flex-col justify-start pt-32 md:pt-44 items-center w-full gap-20 md:gap-44 min-h-[200vh]'
      >
        
        {/* Child 1: Title */}
        <div className="font-clash font-medium text-white text-title">
          Tesla
        </div>
        
        {/* Child 2: Keywords */}
        <div className='unbounded-normal flex flex-col md:flex-row items-center gap-4 md:gap-8 text-white text-2xl md:text-5xl'>
            <div>Embedded</div>
            <div><Star className='w-8 h-8 md:w-12 md:h-12 text-white fill-white flex items-center rotate-90 md:rotate-0'/></div>
            <div>Electronics</div>
            <div><Star className='w-8 h-8 md:w-12 md:h-12 text-white fill-white flex items-center rotate-90 md:rotate-0'/></div>
            <div>Bluetooth</div>
        </div>

      </div>
    
    </div>
  )
}

export default TeslaContent