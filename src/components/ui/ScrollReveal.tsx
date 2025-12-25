import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number; // delay in ms
  width?: 'full' | 'auto';
  direction?: 'up' | 'left' | 'right'; // New prop for animation direction
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0, width = 'full', direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a tiny timeout to allow staggered effects if delay is passed
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          if (ref.current) observer.unobserve(ref.current); // Run once
        }
      },
      {
        threshold: 0.1, // Lower threshold to trigger earlier
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [delay]);

  // Determine initial transform based on direction
  // Increased translation values for more "movement" feel
  let translateClass = 'translate-y-24'; 
  if (direction === 'left') translateClass = '-translate-x-24';
  if (direction === 'right') translateClass = 'translate-x-24';

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 cubic-bezier(0.17, 0.55, 0.55, 1) transform ${width === 'full' ? 'w-full' : 'w-auto'} ${
        isVisible 
          ? 'opacity-100 translate-x-0 translate-y-0 filter blur-0 scale-100' 
          : `opacity-0 ${translateClass} filter blur-sm scale-95`
      }`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;