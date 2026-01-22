
import React, { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

const Preloader: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 800);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center transition-opacity duration-800 ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative mb-8">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
          HALABI
          <span className="text-amber-500">.</span>
        </h1>
        <div className="absolute -inset-10 bg-amber-500/20 blur-3xl rounded-full opacity-50 animate-pulse"></div>
      </div>
      
      <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
        <div 
          className="absolute top-0 left-0 h-full bg-amber-500 transition-all duration-100 ease-out box-shadow-[0_0_10px_#f59e0b]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="mt-4 text-xs font-mono text-amber-500/60 uppercase tracking-[0.3em]">
        Loading Experience {Math.floor(progress)}%
      </div>
    </div>
  );
};

export default Preloader;
