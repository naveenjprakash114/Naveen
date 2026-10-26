import React, { useState, useEffect } from 'react';
import IceCream3D from './IceCream3D';
import { Play, Pause, RotateCcw, Maximize2, Minimize2, Sparkles, Sliders, Eye, Layers } from 'lucide-react';

export default function FloatingPage3DStage({ scrollProgress = 0, isHeroVisible = true }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoProgress, setAutoProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullPageBg, setIsFullPageBg] = useState(false);

  // Auto-play animation loop when play button is clicked
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setAutoProgress((prev) => (prev >= 1 ? 0 : prev + 0.015));
    }, 35);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const effectiveProgress = isPlaying ? autoProgress : scrollProgress;

  // Active section details for realistic 4K animation status
  const getSectionDetails = () => {
    if (effectiveProgress < 0.20) {
      return { name: '4K WAFFLE CONE FOUNDATION', color: '#D4AF61' };
    } else if (effectiveProgress < 0.40) {
      return { name: 'BELGIAN CHOCOLATE DROPS', color: '#8B4513' };
    } else if (effectiveProgress < 0.65) {
      return { name: 'WILD STRAWBERRY SCOOP', color: '#EFA1AE' };
    } else if (effectiveProgress < 0.85) {
      return { name: 'VANILLA FROST CREME', color: '#FDF6E3' };
    } else {
      return { name: 'SALEM 4K MASTERPIECE ASSEMBLED', color: '#3B82F6' };
    }
  };

  const currentSection = getSectionDetails();

  return (
    <>
      {/* Full Page Ambient 4K Animation Stage Layer (if user enables background view or when scrolling past hero) */}
      {isFullPageBg && (
        <div className="fixed inset-0 pointer-events-none z-10 opacity-30 mix-blend-screen flex items-center justify-center transition-opacity duration-700">
          <IceCream3D 
            scrollProgress={effectiveProgress} 
            glowColor={currentSection.color}
            activeSectionName={currentSection.name}
            interactive={false}
            className="w-full h-full max-w-4xl max-h-[80vh]"
          />
        </div>
      )}

      {/* Floating Interactive 3D Dock for Entire Home Page */}
      {!isHeroVisible && (
        <div 
          className={`fixed z-40 transition-all duration-500 ease-out ${
            isExpanded 
              ? 'bottom-6 right-6 w-80 h-96 sm:w-96 sm:h-[460px] glass-panel-dark rounded-3xl border-2 border-[#D4AF61]/60 shadow-2xl p-4 flex flex-col justify-between backdrop-blur-xl' 
              : 'bottom-6 right-6 w-40 h-52 sm:w-48 sm:h-60 glass-panel rounded-2xl border border-[#D4AF61]/40 shadow-2xl p-2.5 flex flex-col items-center justify-between hover:scale-105 backdrop-blur-md'
          }`}
        >
          {/* Header Controls */}
          <div className="w-full flex items-center justify-between z-20">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#160D22]/90 border border-[#D4AF61]/40">
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentSection.color }} />
              <span className="text-[10px] font-bold text-[#FFF8F0] tracking-wider uppercase">4K 3D STAGE</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsFullPageBg(!isFullPageBg)}
                className={`p-1 rounded-full transition-colors ${
                  isFullPageBg ? 'text-[#D4AF61] bg-[#4A2673]/60' : 'text-[#B99AD8] hover:text-[#D4AF61]'
                }`}
                title={isFullPageBg ? 'Disable Full Page Background Stage' : 'Enable Full Page Background Stage'}
              >
                <Eye className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded-full text-[#B99AD8] hover:text-[#D4AF61] hover:bg-[#271332] transition-colors"
                title={isExpanded ? 'Minimize 3D View' : 'Expand 3D View'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 3D Canvas Container */}
          <div className="w-full flex-grow relative flex items-center justify-center overflow-hidden my-1">
            <IceCream3D 
              scrollProgress={effectiveProgress} 
              glowColor={currentSection.color}
              activeSectionName={currentSection.name}
              className="w-full h-full"
            />
          </div>

          {/* Controls Bar */}
          <div className="w-full pt-1 flex items-center justify-between gap-2 z-20">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-full bg-[#D4AF61] text-[#160D22] font-bold hover:scale-110 active:scale-95 transition-all shadow-md"
                title={isPlaying ? 'Pause Auto Animation' : 'Play 3D Auto Animation'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>

              <button
                onClick={() => {
                  setIsPlaying(false);
                  setAutoProgress(0);
                }}
                className="p-1.5 rounded-full glass-card text-[#B99AD8] hover:text-[#D4AF61] transition-colors"
                title="Reset Frame"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Frame Scrubber in Expanded View */}
            {isExpanded && (
              <div className="flex-grow px-2 flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#D4AF61]" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={effectiveProgress}
                  onChange={(e) => {
                    setIsPlaying(false);
                    setAutoProgress(parseFloat(e.target.value));
                  }}
                  className="w-full h-1 bg-[#4A2673] rounded-lg appearance-none cursor-pointer accent-[#D4AF61]"
                />
              </div>
            )}

            <div className="text-[10px] font-mono font-extrabold text-[#D4AF61] px-2 py-0.5 rounded-full bg-[#160D22] border border-[#D4AF61]/40">
              {Math.round(effectiveProgress * 100)}%
            </div>
          </div>
        </div>
      )}
    </>
  );
}

