import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend, ReactThreeFiber } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

// --- تعريف مادة العلم السوري (Shader Material) ---
// نقوم بإنشاء خامة برمجية لرسم العلم والنجوم والتموجات
const SyrianFlagMaterial = shaderMaterial(
  { uTime: 0, uColorStart: new THREE.Color('#ffffff'), uColorEnd: new THREE.Color('#000000') },
  // Vertex Shader: مسؤول عن حركة التموج
  `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);

      // معادلة التموج (سينمائية)
      float elevation = sin(modelPosition.x * 1.5 - uTime * 2.0) * 0.2;
      elevation += sin(modelPosition.y * 3.0 - uTime * 1.5) * 0.1;

      modelPosition.z += elevation;
      vElevation = elevation;

      gl_Position = projectionMatrix * viewMatrix * modelPosition;
    }
  `,
  // Fragment Shader: مسؤول عن الألوان (أحمر، أبيض، أسود، نجوم خضراء)
  `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    // دالة لرسم النجوم (مبسطة كدوائر للعرض السريع)
    float circle(vec2 uv, vec2 center, float radius) {
        float dist = distance(uv, center);
        return 1.0 - smoothstep(radius - 0.01, radius + 0.01, dist);
    }

    void main() {
      vec3 color = vec3(1.0); // لون افتراضي أبيض
      
      // الألوان الرسمية للعلم
      vec3 red = vec3(0.81, 0.06, 0.13);   // أحمر
      vec3 white = vec3(1.0, 1.0, 1.0);    // أبيض
      vec3 black = vec3(0.0, 0.0, 0.0);    // أسود
      vec3 green = vec3(0.0, 0.48, 0.24);  // أخضر

      // تقسيم العلم إلى 3 أقسام
      // ملاحظة: الـ UV في Three.js يبدأ من (0,0) في الأسفل ويسار
      
      if (vUv.y > 0.66) {
          color = red;
      } else if (vUv.y < 0.33) {
          color = black;
      } else {
          color = white;
          
          // رسم النجمتين الخضراوين في المنتصف
          float star1 = circle(vUv, vec2(0.35, 0.5), 0.08);
          float star2 = circle(vUv, vec2(0.65, 0.5), 0.08);
          
          if (star1 > 0.0 || star2 > 0.0) {
              color = green;
          }
      }

      // إضافة الظلال بناءً على التموج لزيادة الواقعية
      color *= (0.8 + vElevation * 0.8);

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ SyrianFlagMaterial });

// Removed faulty global declaration that was breaking JSX.IntrinsicElements

const Flag3D = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh rotation={[0.2, 0, 0]} position={[0, 0, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* PlaneGeometry: Width, Height, SegmentsX, SegmentsY */}
      {/* زيادة عدد الـ Segments ضروري لنعومة التموج */}
      <planeGeometry args={[5, 3, 64, 64]} />
      {/* @ts-ignore */}
      <syrianFlagMaterial ref={materialRef} side={THREE.DoubleSide} />
    </mesh>
  );
};

// --- المكون الرئيسي للواجهة ---
const FlagHeroSection = () => {
  return (
    <div id="hero" className="h-[80vh] md:h-screen w-full bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* طبقة النص التكنولوجي */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center px-4 mt-20 md:mt-0">
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-6 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
          حلبي للخدمات
        </h1>
        <div className="flex items-center gap-4 mb-4 backdrop-blur-sm bg-black/30 p-2 rounded-full">
            <div className="h-[1px] w-12 bg-amber-500"></div>
            <p className="text-xl md:text-2xl text-amber-500 font-bold uppercase tracking-[0.3em] shadow-black drop-shadow-md">
            مستقبل سوريا الرقمي
            </p>
            <div className="h-[1px] w-12 bg-amber-500"></div>
        </div>
        <p className="text-lg text-gray-200 max-w-xl leading-relaxed drop-shadow-md bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
          حيث تلتقي التكنولوجيا المتقدمة بالأصالة السورية. بوابتك الأولى لكل الخدمات الرقمية والواقعية.
        </p>

        <div className="mt-12 pointer-events-auto flex gap-6">
            <a 
                href="#services"
                className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-black font-black rounded-full transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-105"
            >
                اكتشف الخدمات
            </a>
            <a 
                href="#contact"
                className="px-8 py-4 bg-black/40 hover:bg-black/60 text-white font-bold rounded-full transition-all border border-white/20 hover:scale-105 backdrop-blur-md"
            >
                تواصل معنا
            </a>
        </div>
      </div>

      {/* مشهد الـ 3D (العلم) */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <color attach="background" args={['#050505']} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            
            <Flag3D />

            {/* تأثير ضبابي لدمج العلم مع الخلفية */}
            <fog attach="fog" args={['#050505', 3, 10]} />
        </Canvas>
      </div>
      
      {/* تدرج لوني في الأسفل للدمج مع باقي الموقع */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[var(--bg-color)] to-transparent z-10"></div>
    </div>
  );
};

export default FlagHeroSection;