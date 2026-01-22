
import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setHeight(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-4 md:left-10 top-0 bottom-0 w-[1px] bg-white/5 z-40 hidden md:block">
      <div 
        className="w-full bg-gradient-to-b from-amber-300 to-amber-600 transition-all duration-100 ease-out shadow-[0_0_10px_#f59e0b]"
        style={{ height: `${height}%` }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_15px_#f59e0b] animate-pulse"></div>
      </div>
    </div>
  );
};

export default ScrollProgress;
