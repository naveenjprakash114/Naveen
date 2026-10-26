import React, { useState, useEffect, useRef } from 'react';
import { Snowflake, Sparkles } from 'lucide-react';

const TOTAL_FRAMES = 60;

export default function IceCream3D({ 
  scrollProgress = 0, 
  glowColor = '#D4AF61',
  activeSectionName = '',
  interactive = true,
  className = ''
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadCount, setLoadCount] = useState(0);

  // Smooth inertial lerp state for 60 FPS animation
  const targetProgressRef = useRef(scrollProgress);
  const currentFrameRef = useRef(0);
  const animationFrameRef = useRef(null);
  const prevFrameRef = useRef(0);
  const [displayFrame, setDisplayFrame] = useState(1);

  // Interactive mouse tilt state
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({ rx: 0, ry: 0 });

  // Sync scrollProgress into target ref
  useEffect(() => {
    targetProgressRef.current = Math.max(0, Math.min(1, scrollProgress));
  }, [scrollProgress]);

  // Preload all 60 transparent WebP frames
  useEffect(() => {
    let loaded = 0;
    const imgs = [];
    const timestamp = Date.now();

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      
      const primaryUrl = `/frames/frame_${numStr}.webp?t=${timestamp}`;
      const fallbackUrl1 = `/frames/ezgif-frame-${numStr}.jpg`;
      const fallbackUrl2 = `/frames/frame_${numStr}.jpg`;

      img.src = primaryUrl;

      const handleLoad = () => {
        loaded++;
        setLoadCount(loaded);
      };

      img.onload = handleLoad;

      img.onerror = () => {
        if (img.src.includes('.webp')) {
          img.src = fallbackUrl1;
        } else if (img.src.includes('ezgif-frame-')) {
          img.src = fallbackUrl2;
        } else {
          handleLoad();
        }
      };

      imgs.push(img);
    }

    imagesRef.current = imgs;
  }, []);

  // Nearest loaded image fallback
  const getNearestLoadedImage = (targetIndex) => {
    const imgs = imagesRef.current;
    if (!imgs || imgs.length === 0) return null;

    if (imgs[targetIndex] && imgs[targetIndex].complete && imgs[targetIndex].naturalWidth > 0) {
      return imgs[targetIndex];
    }

    for (let delta = 1; delta < TOTAL_FRAMES; delta++) {
      const prevIdx = targetIndex - delta;
      if (prevIdx >= 0 && imgs[prevIdx] && imgs[prevIdx].complete && imgs[prevIdx].naturalWidth > 0) {
        return imgs[prevIdx];
      }
      const nextIdx = targetIndex + delta;
      if (nextIdx < TOTAL_FRAMES && imgs[nextIdx] && imgs[nextIdx].complete && imgs[nextIdx].naturalWidth > 0) {
        return imgs[nextIdx];
      }
    }
    return null;
  };

  // Track mouse movement for subtle 3D parallax tilt
  const handleMouseMove = (e) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalized tilt (-1 to 1)
    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);
    
    mousePosRef.current.targetX = Math.max(-1, Math.min(1, normX));
    mousePosRef.current.targetY = Math.max(-1, Math.min(1, normY));
  };

  const handleMouseLeave = () => {
    mousePosRef.current.targetX = 0;
    mousePosRef.current.targetY = 0;
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Continuous 60 FPS Render Loop with sub-frame interpolation and 4K DPR scaling
  useEffect(() => {
    let active = true;

    const render = () => {
      if (!active) return;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const targetFrame = targetProgressRef.current * (TOTAL_FRAMES - 1);

          // Inertial dampening lerp
          const lerpFactor = 0.09;
          currentFrameRef.current += (targetFrame - currentFrameRef.current) * lerpFactor;

          // Mouse tilt lerp
          const mouse = mousePosRef.current;
          mouse.x += (mouse.targetX - mouse.x) * 0.06;
          mouse.y += (mouse.targetY - mouse.y) * 0.06;

          setTiltStyle({ rx: -mouse.y * 8, ry: mouse.x * 8 });

          const rawFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, currentFrameRef.current));
          const frame1Index = Math.floor(rawFrame);
          const frame2Index = Math.min(TOTAL_FRAMES - 1, frame1Index + 1);
          const blendRatio = rawFrame - frame1Index;

          const currentIntegerFrame = Math.round(rawFrame) + 1;
          if (currentIntegerFrame !== prevFrameRef.current) {
            setDisplayFrame(currentIntegerFrame);
            prevFrameRef.current = currentIntegerFrame;
          }

          // High DPR handling for 4K & Retina crispness
          const dpr = Math.max(window.devicePixelRatio || 1, 2);
          const displayWidth = canvas.clientWidth;
          const displayHeight = canvas.clientHeight;

          if (
            canvas.width !== Math.round(displayWidth * dpr) ||
            canvas.height !== Math.round(displayHeight * dpr)
          ) {
            canvas.width = Math.round(displayWidth * dpr);
            canvas.height = Math.round(displayHeight * dpr);
          }

          ctx.save();
          ctx.scale(dpr, dpr);
          ctx.clearRect(0, 0, displayWidth, displayHeight);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Apply subtle parallax translation based on mouse
          const tiltOffsetX = mouse.x * 15;
          const tiltOffsetY = mouse.y * 15;

          const img1 = getNearestLoadedImage(frame1Index);
          const img2 = getNearestLoadedImage(frame2Index);

          if (img1) {
            const imgRatio = img1.naturalWidth / img1.naturalHeight;
            const canvasRatio = displayWidth / displayHeight;

            let drawW, drawH, drawX, drawY;
            if (canvasRatio > imgRatio) {
              drawH = displayHeight;
              drawW = displayHeight * imgRatio;
              drawX = (displayWidth - drawW) / 2 + tiltOffsetX;
              drawY = tiltOffsetY;
            } else {
              drawW = displayWidth;
              drawH = displayWidth / imgRatio;
              drawX = tiltOffsetX;
              drawY = (displayHeight - drawH) / 2 + tiltOffsetY;
            }

            // Sub-frame optical cross-dissolve blending for 60 FPS ultra-realism
            if (blendRatio < 0.999) {
              ctx.globalAlpha = 1 - blendRatio;
              ctx.drawImage(img1, drawX, drawY, drawW, drawH);
            }
            if (blendRatio > 0.001 && img2) {
              ctx.globalAlpha = blendRatio;
              ctx.drawImage(img2, drawX, drawY, drawW, drawH);
            }
            ctx.globalAlpha = 1.0;
          }

          ctx.restore();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      active = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const isFullyLoaded = loadCount >= TOTAL_FRAMES;

  // Status message logic for 60 frames
  const getStatusMessage = () => {
    if (activeSectionName) return activeSectionName;
    if (displayFrame <= 15) return '4K REALISTIC WAFFLE CONE';
    if (displayFrame <= 30) return 'BELGIAN CHOCOLATE LAYER';
    if (displayFrame <= 45) return 'GOURMET BERRY SCOOP ASSEMBLY';
    return 'ULTRA-REALISTIC 4K MASTERPIECE';
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`w-full h-full relative flex items-center justify-center select-none cursor-grab active:cursor-grabbing ${className}`}
    >
      {/* Ambient Lighting Dynamic Aura */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none transition-all duration-1000 opacity-70"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}60 0%, #4A267340 50%, transparent 80%)`
        }}
      />

      {/* Floating Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)] transition-transform duration-200 ease-out"
        style={{
          transform: isHovered 
            ? `perspective(1000px) rotateY(${tiltStyle.ry}deg) rotateX(${tiltStyle.rx}deg) scale(1.03)` 
            : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)'
        }}
      />

      {/* Frame caching loader badge */}
      {!isFullyLoaded && (
        <div className="absolute bottom-6 right-6 glass-panel px-4 py-2 rounded-full z-30 flex items-center gap-2 shadow-xl border border-[#D4AF61]/40 animate-pulse">
          <Snowflake className="w-4 h-4 text-[#D4AF61] animate-spin" />
          <span className="text-[11px] text-[#FFF8F0] font-mono font-bold">
            4K Frames: {Math.round((loadCount / TOTAL_FRAMES) * 100)}%
          </span>
        </div>
      )}

    </div>
  );
}


