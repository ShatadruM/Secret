import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin once outside the component
gsap.registerPlugin(ScrollTrigger);

export default function ScrollTextEffect() {
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  const containerRef = useRef(null);
  
  // useLayoutEffect is preferred over useEffect for GSAP to prevent visual "flashing"
  useLayoutEffect(() => {
    // Create a gsap context for easy cleanup
    let ctx = gsap.context(() => {
      
      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=2000',
          scrub: 1,
          pin: true,
          // markers: true, // Uncomment for debugging
        }
      });
      
      // First text dissipates
      tl.to(firstTextRef.current, {
        opacity: 0,
        filter: 'blur(20px)',
        scale: 1.1,
        ease: 'power2.in',
        duration: 0.5
      });
      
      // Second text appears
      tl.fromTo(secondTextRef.current, 
        {
          opacity: 0,
          filter: 'blur(15px)',
          scale: 0.95
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1,
          ease: 'power2.out',
          duration: 0.5
        },
        '-=0.2'
      );

    }, containerRef); // Scope selector to this container

    // Cleanup function: reverts all animations/triggers created in this context
    return () => ctx.revert();
    
  }, []); // Empty dependency array
  
  const firstText = "NEXT TECH LAB";
  const secondText = "SRM AP's first Student led Interdisciplinary Lab. Started in 2018. Where tech meets Innovation";
  
  return (
    <div className="bg-black">
      <div ref={containerRef} className="h-screen relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center px-4">
          
          {/* First Text */}
          <div ref={firstTextRef} className="text-4xl wrap md:text-9xl unbounded-bold font-bold tracking-wider text-center text-white">
            {firstText}
            <div className='flex mt-6 unbounded-normal text-xs md:text-5xl justify-between'>
              <div>Students</div>
              <div>Innovation</div>
              <div>Technology</div>
            </div>
          </div>
          
          {/* Second Text */}
          <div 
            ref={secondTextRef}
            className="absolute inset-0 flex items-center justify-center px-8 md:px-16 opacity-0" 
          >
            <p className="text-2xl md:text-4xl unbounded-normal font-light text-white text-center max-w-4xl leading-relaxed">
              {secondText}
            </p>
          </div>

        </div>
      </div>
      
      {/* Spacer to allow scrolling past the pinned section */}
      <div className="h-screen bg-black"></div>
    </div>
  );
}