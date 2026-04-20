import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface FeatureAnnotation {
  icon: LucideIcon;
  title: string;
  description: string;
  position: { top: string; left: string };
  variant?: 'adaptation' | 'vulnerability';
}

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  isSideBySideSplit?: boolean;
  features?: FeatureAnnotation[];
  vulnerabilityFeatures?: FeatureAnnotation[];
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  isSideBySideSplit = false,
  features = [],
  vulnerabilityFeatures = []
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeFeature, setActiveFeature] = useState<FeatureAnnotation | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent | React.MouseEvent) => {
    if (!isDragging) return;
    handleMove((e as MouseEvent).clientX);
  };

  const handleTouchMove = (e: TouchEvent | React.TouchEvent) => {
    if (!isDragging) return;
    handleMove((e as TouchEvent).touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <div className="relative isolate">
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] max-h-[700px] rounded-2xl overflow-hidden select-none cursor-ew-resize mt-8 shadow-2xl ring-1 ring-slate-900/10"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* Target Image (Before) */}
        <div className="absolute inset-0 w-full h-full">
          {!isSideBySideSplit && <div className="absolute inset-0 mix-blend-multiply bg-slate-500/40 z-10 pointer-events-none" />}
          <img
            src={beforeImage}
            alt={beforeLabel}
            className={`absolute inset-0 w-full h-full object-cover ${!isSideBySideSplit ? 'filter grayscale-[40%] brightness-90 sepia-[20%] hue-rotate-180' : ''}`}
            style={isSideBySideSplit ? { width: '200%', objectPosition: 'left center', maxWidth: 'none' } : undefined}
            draggable={false}
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-6 left-6 z-20 bg-[#b23a3a]/95 backdrop-blur-md text-white px-4 pt-[11px] pb-[9px] rounded-full text-sm font-medium tracking-wide uppercase shadow-md shadow-[#7a1f1f]/50 inline-flex items-center leading-none">
            {beforeLabel}
          </div>
        </div>

        {/* Vulnerability Annotations (Before side, reverse clipped) */}
        <div
          className="absolute inset-0 w-full h-full z-20 overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          {vulnerabilityFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            const tagged = { ...feat, variant: 'vulnerability' as const };
            return (
              <div
                key={`v-${idx}`}
                className="absolute z-40 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ top: feat.position.top, left: feat.position.left }}
                onMouseEnter={() => setActiveFeature(tagged)}
                onMouseLeave={() => setActiveFeature(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveFeature(activeFeature?.title === feat.title ? null : tagged);
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-[#e06666] rounded-full animate-ping opacity-50 group-hover:opacity-80" />
                  <div className="relative bg-[#b23a3a] text-white p-2 md:p-2.5 rounded-full shadow-lg border-2 border-white group-hover:scale-110 group-hover:bg-[#8a2828] transition-all duration-200 shadow-[#7a1f1f]/50">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clipped Image (After) */}
        <div
          className="absolute inset-0 w-full h-full z-20 overflow-hidden"
          style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
        >
          {!isSideBySideSplit && <div className="absolute inset-0 mix-blend-overlay bg-[#009bba]/10 z-10 pointer-events-none" />}
          <img
            src={afterImage}
            alt={afterLabel}
            className={`absolute inset-0 w-full h-full object-cover ${!isSideBySideSplit ? 'filter brightness-110 contrast-105 saturate-125' : ''}`}
            style={isSideBySideSplit ? { width: '200%', objectPosition: 'right center', left: '-100%', maxWidth: 'none' } : undefined}
            draggable={false}
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-6 right-6 z-20 bg-[#026873] text-white px-4 pt-[11px] pb-[9px] rounded-full text-sm font-medium tracking-wide uppercase shadow-lg shadow-[#014f57]/50 whitespace-nowrap inline-flex items-center leading-none">
            {afterLabel}
          </div>

          {/* Feature Annotations inside the clipped area */}
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            const tagged = { ...feat, variant: 'adaptation' as const };
            return (
              <div
                key={idx}
                className="absolute z-40 transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: feat.position.top, left: feat.position.left }}
                onMouseEnter={() => setActiveFeature(tagged)}
                onMouseLeave={() => setActiveFeature(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveFeature(activeFeature?.title === feat.title ? null : tagged);
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-[#028a99] rounded-full animate-ping opacity-60 group-hover:opacity-100" />
                  <div className="relative bg-[#026873] text-white p-2 md:p-2.5 rounded-full shadow-lg border-2 border-white group-hover:scale-110 group-hover:bg-[#014f57] transition-all duration-200 shadow-[#014f57]/50">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white z-30 shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform shadow-slate-900/50 border border-slate-100">
            <ArrowLeftRight className="w-5 h-5 text-slate-900" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Active Feature Detail Overlay */}
      <AnimatePresence>
        {activeFeature && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute bottom-6 ${activeFeature.variant === 'vulnerability' ? 'left-6' : 'right-6'} max-w-sm backdrop-blur-md text-white p-5 rounded-2xl z-50 shadow-2xl pointer-events-none ring-1 ring-white/10 ${activeFeature.variant === 'vulnerability' ? 'bg-[#7a1f1f]/95' : 'bg-[#014f57]/95'}`}
          >
            <div className={`flex items-center gap-3 mb-2 ${activeFeature.variant === 'vulnerability' ? 'text-[#ffb8b8]' : 'text-[#7fd4e0]'}`}>
              <activeFeature.icon className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white leading-tight">{activeFeature.title}</h3>
            </div>
            <p className={`text-sm leading-relaxed ${activeFeature.variant === 'vulnerability' ? 'text-red-50/90' : 'text-sky-50/90'}`}>
              {activeFeature.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
