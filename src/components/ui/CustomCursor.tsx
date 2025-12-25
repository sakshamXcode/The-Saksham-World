import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop
    if (window.matchMedia("(pointer: fine)").matches) {
        setIsVisible(true);
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-transform duration-100 ease-out will-change-transform"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 1})`,
      }}
    >
        {/* Core Dot */}
        <div className={`w-2 h-2 rounded-full ${isHovering ? 'bg-green-500' : 'bg-white'}`}></div>
        
        {/* Outer Ring */}
        <div 
            className={`absolute rounded-full border border-white opacity-50 transition-all duration-300 ease-out ${isHovering ? 'w-12 h-12 border-dashed animate-spin-slow' : 'w-8 h-8'}`}
        ></div>
    </div>
  );
};

export default CustomCursor;