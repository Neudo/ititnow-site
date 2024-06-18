"use client"
import React, {useRef} from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import useGsapAnimation from '@/app/customHooks/useGsapAnimation';


gsap.registerPlugin(ScrollTrigger)

function Container({children}: {children: React.ReactNode}) {
    const el = useRef<HTMLDivElement>(null);
    useGsapAnimation(el);

    return (
        <div ref={el} className="flex-1 flex flex-col md:flex-row gap-6 container items-center pb-[20px] md:pb-[180px]">
            {children}
        </div>
    );
}

export default Container;
