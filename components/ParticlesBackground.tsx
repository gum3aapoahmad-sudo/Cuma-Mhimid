
import React, { useEffect, useRef } from 'react';

interface Props {
  theme?: 'dark' | 'light';
}

const ParticlesBackground: React.FC<Props> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Performance: Use 'alpha: false' if transparency isn't needed, but here we need it for blending.
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    // Pre-calculate colors to avoid string interpolation in the loop
    const colorBase = theme === 'light' ? '180, 83, 9' : '251, 191, 36';

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      originalOpacity: number;
      phase: number; // For sine wave optimization

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 1.5 + 0.5; 
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.originalOpacity = this.opacity;
        this.phase = Math.random() * Math.PI * 2;
      }

      update(w: number, h: number, time: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > w) this.x = 0;
        else if (this.x < 0) this.x = w;
        
        if (this.y > h) this.y = 0;
        else if (this.y < 0) this.y = h;

        // Optimized twinkle using pre-calculated phase
        this.opacity = this.originalOpacity + Math.sin(time * 0.001 + this.phase) * 0.1;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Fillstyle is set once per frame in the main loop to reduce state changes
        context.globalAlpha = this.opacity;
        context.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const w = canvas.width;
      const h = canvas.height;
      // Optimization: Reduce density on mobile for FPS
      const pixelRatio = window.devicePixelRatio || 1;
      const divider = window.innerWidth < 768 ? 15000 : 10000; 
      const numberOfParticles = Math.floor((w * h) / divider);
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const animate = (time: number) => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Batch state changes
      ctx.fillStyle = `rgb(${colorBase})`;
      
      const w = canvas.width;
      const h = canvas.height;

      // Unroll loop slightly or just standard forEach
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update(w, h, time);
        p.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[5] pointer-events-none transition-opacity duration-1000"
      // Optimization: Force GPU layer
      style={{ 
        opacity: theme === 'light' ? 0.4 : 0.6,
        mixBlendMode: theme === 'light' ? 'multiply' : 'screen',
        transform: 'translate3d(0,0,0)',
        willChange: 'transform'
      }} 
    />
  );
};

export default ParticlesBackground;
