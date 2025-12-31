import React, { useEffect, useRef } from 'react';

export default function ScrollTextEffect() {
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Load GSAP and ScrollTrigger
    const script1 = document.createElement('script');
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    script1.async = true;
    
    const script2 = document.createElement('script');
    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
    script2.async = true;
    
    document.body.appendChild(script1);
    
    script1.onload = () => {
      document.body.appendChild(script2);
      
      script2.onload = () => {
        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        
        // Create timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=2000',
            scrub: 1,
            pin: true,
          }
        });
        
        // First text dissipates (simple fade and blur)
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
      };
    };
    
    return () => {
      if (document.body.contains(script1)) {
        document.body.removeChild(script1);
      }
      if (document.body.contains(script2)) {
        document.body.removeChild(script2);
      }
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);
  
  const firstText = "NEXT TECH LAB";
  const secondText = "SRM AP's first Student led Interdisciplinary Lab. Started in 2018. Where tech meets Innovation";
  
  return (
    <div className="bg-black">
      <div ref={containerRef} className="h-screen relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center px-4">
          {/* First Text */}
          <div ref={firstTextRef} className="text-6xl md:text-8xl font-bold tracking-wider text-center text-white">
            {firstText}
          </div>
          
          {/* Second Text */}
          <div 
            ref={secondTextRef}
            className="absolute inset-0 flex items-center justify-center px-8 md:px-16"
          >
            <p className="text-2xl md:text-4xl  font-light text-white text-center max-w-4xl leading-relaxed">
              {secondText}
            </p>
          </div>
        </div>
        
        
      </div>
      
      
    </div>
  );
}