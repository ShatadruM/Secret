import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Line from '../components/Line';
import Star from '../components/Star';

const HistoryContent = () => {
  return (
    <div className='text-white'>
        <div className='flex flex-col gap-4 items-center mx-9'>
            <div className='melodrama-regular text-center text-6xl md:text-8xl'>2018 : Story like Title</div>
            <div className=' text-base text-center md:text-2xl'> We won Microsoft Garage India, Hyderabad - Rs. 75,000 cash prize</div>
        </div>
        <div className='flex h-10 my-10 w-full px-10 md:w-full justify-between'>
            <div className='w-2/5 flex items-center'> <Line variant="horizontal" thickness={2} /></div>
            <div className='w-1/5 flex items-center justify-center'><Star className='w-4 h-4 md:w-5 md:h-5 lg:w-10 lg:h-10 text-white fill-white'/></div>
            <div className='w-2/5 flex items-center'> <Line variant="horizontal" thickness={2} /></div>
        </div>
        <div></div>
    </div>
  )
}

export default HistoryContent