import React, { useRef, useEffect, useState } from 'react';

const TOTAL_FRAMES = 240;

export default function VideoIceCream3D({ scrollProgress = 0 }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);

  // Preload Transparent PNG Frames
  useEffect(() => {
    let isMounted = true;
    const loadedImages = [];
    let loadedCounter = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, '0');
      img.src = `/frames/frame_${frameNum}.png`;

      img.onload = () => {
        if (!isMounted) return;
        loadedCounter++;
        setLoadedCount(loadedCounter);
      };

      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, []);

  // Render Frame on True Full-Screen Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const targetFrameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(scrollProgress * (TOTAL_FRAMES - 1)))
    );

    const img = imagesRef.current[targetFrameIndex];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (img && img.complete && img.naturalWidth !== 0) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Full screen scale (cover mode filling entire viewport)
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height) * 0.95;
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  }, [scrollProgress, loadedCount]);

  // Handle Full-Window Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Full-Screen Transparent 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full w-screen h-screen object-cover drop-shadow-[0_35px_60px_rgba(59,33,24,0.22)] z-0"
        style={{ background: 'transparent' }}
      />

      {/* Floating Interactive Assembly Badge */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-panel px-7 py-3.5 rounded-full shadow-2xl border border-[#D4AF61]/50 text-xs sm:text-sm font-extrabold tracking-wider text-[#FFF8F0] flex items-center gap-3 z-30 pointer-events-auto">
        <span className="w-3 h-3 rounded-full bg-[#D4AF61] animate-ping" />
        {scrollProgress < 0.25 && '🍨 STEP 1: CONE INTRO (SCROLL DOWN)'}
        {scrollProgress >= 0.25 && scrollProgress < 0.55 && '🍫 STEP 2: BELGIAN CHOCOLATE SCOOP'}
        {scrollProgress >= 0.55 && scrollProgress < 0.85 && '🍓 STEP 3: WILD STRAWBERRY SCOOP'}
        {scrollProgress >= 0.85 && '✨ TRIPLE SCOOP CASTLE FULLY ASSEMBLED!'}
      </div>
    </div>
  );
}
