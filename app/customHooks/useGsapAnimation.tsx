import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useGsapAnimation = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
        if (ref.current) {
            const q = gsap.utils.selector(ref.current);
            gsap.fromTo(q(".reveal-item"),
                {
                    opacity: 0,
                    y: 110,
                    ease: "power2.out",
                },
                {
                    opacity: 1,
                    y: 0,
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top 80%",
                        end: "bottom middle",
                    }
                }
            );
        }
    }, [ref]);
};

export default useGsapAnimation;
