import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Line from '../components/Line';
import Star from '../components/Star';


gsap.registerPlugin(ScrollTrigger);

import Image1 from '../assets/image1.png'; 
import Image2 from '../assets/image2.png';
import Image3 from '../assets/image3.png';
import Image4 from '../assets/image4.png';
import Image5 from '../assets/image5.png';
import Image6 from '../assets/image6.png';

const historyData = [
  { 
    id: 1, 
    year: "2018", 
    title: "The Beginning", 
    desc: "We won Microsoft Garage India - Rs. 75,000 cash prize",
    content: Image1
  },
  { 
    id: 2, 
    year: "2018", 
    title: "The Beginning", 
    desc: "Hosted the first ever 24-hour Hackathon.",
    content: Image2
  },
  { 
    id: 3, 
    year: "2018", 
    title: "The Beginning", 
    desc: "Our team represented India at the International Tech Summit.",
    content: Image3
  },
  { 
    id: 4, 
    year: "2019", 
    title: "Innovation Hub", 
    desc: "Launched the student incubator program for AI startups.",
    content: Image4
  },
  { 
    id: 5, 
    year: "2019", 
    title: "Innovation Hub", 
    desc: "Partnered with major industry leaders for campus placements.",
    content: Image5
  },
  { 
    id: 6, 
    year: "2019", 
    title: "Innovation Hub", 
    desc: "Expanding our labs to include Quantum Computing research.",
    content: Image6
  },
];

const HistoryContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const horizontalRef = useRef(null);
  
 
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const prevYearRef = useRef(historyData[0].year);

 
  useEffect(() => {
    const section = sectionRef.current;
    const horizontalContainer = horizontalRef.current;

    // Calculate how far we need to move left
    // (Total Width of scrolling content - Width of the Viewport)
    const getScrollAmount = () => {
        let itemsWidth = horizontalContainer.scrollWidth;
        return -(itemsWidth - window.innerWidth);
    };

    const tween = gsap.to(horizontalContainer, {
      x: getScrollAmount,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: "+=3000", 
      pin: true,
      animation: tween,
      scrub: 1, 
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Calculate which item is currently in the "center" based on scroll progress
        // This maps the 0 to 1 progress to an array index
        const progress = self.progress;
        const index = Math.min(
            Math.round(progress * (historyData.length - 1)),
            historyData.length - 1
        );
        
        setActiveIndex((prev) => {
            if (prev !== index) return index;
            return prev;
        });
      }
    });

    return () => {
      
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);


  
  useEffect(() => {
    const currentYear = historyData[activeIndex].year;
    
    // description animation
    gsap.fromTo(descRef.current,
      {  opacity: 0, filter: "blur(5px)" },
      {  opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power2.out" }
    );

    // Title animation
    if (currentYear !== prevYearRef.current) {
        gsap.fromTo(titleRef.current,
            {  opacity: 0, filter: "blur(5px)" },
            {  opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
        );
        prevYearRef.current = currentYear;
    }
    
  }, [activeIndex]);

  return (
    
    <div ref={triggerRef} className='bg-transparent relative overflow-hidden'>
      
      <div ref={sectionRef} className='h-screen w-full flex flex-col justify-center'>
        
        
        <div className='flex flex-col gap-4 items-center mx-9 transition-colors relative z-10'>
          
          {/* Title Container */}
          <div ref={titleRef} className='clash-title text-center text-3xl md:text-7xl'>
            <span className="text-blue-400 block md:inline">
                {historyData[activeIndex].year} : 
            </span>
            <span className="text-white ml-2">
                {historyData[activeIndex].title}
            </span>
          </div>

          {/* Description Container */}
          <div ref={descRef} className='clash-normal text-base text-center md:text-2xl text-gray-300 max-w-2xl'>
            {historyData[activeIndex].desc}
          </div>
        </div>

       
        <div className=' relative flex h-10 my-8 w-full px-20 justify-between items-center z-10'>
          <div className='w-2/5'> <Line variant="horizontal" thickness={2} /></div>
          <div className='w-1/5 flex justify-center'>
            <Star className='w-6 h-6 md:w-8 md:h-8 text-white fill-white' />
          </div>
          <div className='w-2/5'> <Line variant="horizontal" thickness={2} /></div>
        </div>

        {/* HORIZONTAL SCROLL AREA */}
        <div className='w-full h-[45vh] z-20 flex items-center overflow-visible'>
          <div 
            ref={horizontalRef} 
            className='flex flex-row gap-12 px-[40vw]' 
            style={{ width: 'fit-content' }}
          >
            {historyData.map((item, index) => (
              <div 
                key={item.id} 
                className={`
                   relative flex-shrink-0 
                   w-[300px] md:w-[450px] aspect-video
                   rounded-xl border border-white/10 overflow-hidden
                   transition-all duration-500 ease-out
                   ${index === activeIndex ? 'scale-110 opacity-100 ring-1 ring-blue-500/50' : 'scale-95 opacity-40 grayscale'}
                `}
              >
                <img 
                    src={item.content} 
                    alt={`Event ${item.year}`} 
                    className="w-full h-full object-cover"
                />
                
               
                <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${index === activeIndex ? 'opacity-0' : 'opacity-100'}`} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HistoryContent;