import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight, LucideIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface FeatureAnnotation {
  icon: LucideIcon;
  title: string;
  description: string;
  position: { top: string; left: string };
  variant?: 'adaptation' | 'vulnerability';
  image?: string;
  imageCredit?: string;
  popupPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  imageContain?: boolean;
}

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  isSideBySideSplit?: boolean;
  features?: FeatureAnnotation[];
  vulnerabilityFeatures?: FeatureAnnotation[];
  aspectRatioOverride?: number;
  compact?: boolean;
  showOverlays?: boolean;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  isSideBySideSplit = false,
  features = [],
  vulnerabilityFeatures = [],
  aspectRatioOverride,
  compact = false,
  showOverlays = true
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeFeature, setActiveFeature] = useState<FeatureAnnotation | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  // Close any open detail popup when the overlays are hidden.
  useEffect(() => {
    if (!showOverlays) setActiveFeature(null);
  }, [showOverlays]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset the measured ratio when the source image changes (e.g. switching sites),
  // so the frame re-fits to the new image's natural dimensions on load.
  useEffect(() => {
    setAspectRatio(null);
  }, [beforeImage]);

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

  // Open the detail popup in the corner diagonally opposite the clicked marker,
  // so the window never covers the icon you need to click again to close it.
  // A marker can override this with an explicit popupPosition.
  const cornerClasses = {
    'top-left': 'top-3 left-3 md:top-6 md:left-6',
    'top-right': 'top-3 right-3 md:top-6 md:right-6',
    'bottom-left': 'bottom-3 left-3 md:bottom-6 md:left-6',
    'bottom-right': 'bottom-3 right-3 md:bottom-6 md:right-6',
  } as const;
  const popupCorner = activeFeature
    ? (activeFeature.popupPosition
        ? cornerClasses[activeFeature.popupPosition]
        : `${parseFloat(activeFeature.position.top) > 55 ? 'top-3 md:top-6' : 'bottom-3 md:bottom-6'} ${parseFloat(activeFeature.position.left) > 50 ? 'left-3 md:left-6' : 'right-3 md:right-6'}`)
    : 'bottom-3 left-3 md:bottom-6 md:left-6';

  // Size the frame to the image's natural aspect ratio and cap its height, so the
  // whole image always shows. Capping via max-width (ratio × maxHeight) keeps tall
  // or near-square images fully visible (centered, narrower) instead of cropping them.
  const MAX_FRAME_HEIGHT = compact ? 700 : 900;
  const frameRatio = isSideBySideSplit ? 16 / 10 : (aspectRatioOverride ?? aspectRatio ?? 16 / 10);
  const frameMaxWidth = Math.round(frameRatio * MAX_FRAME_HEIGHT);

  return (
    <div className="relative isolate">
      <div
        ref={containerRef}
        className="relative w-full mx-auto rounded-2xl overflow-hidden select-none cursor-ew-resize shadow-2xl ring-1 ring-slate-900/10"
        style={{ aspectRatio: String(frameRatio), maxWidth: `${frameMaxWidth}px` }}
        onMouseDown={(e) => {
          setActiveFeature(null);
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setActiveFeature(null);
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* Target Image (Before) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover"
            style={isSideBySideSplit ? { width: '200%', objectPosition: 'left center', maxWidth: 'none' } : undefined}
            draggable={false}
            referrerPolicy="no-referrer"
            onLoad={(e) => {
              const img = e.currentTarget;
              if (!isSideBySideSplit && img.naturalWidth && img.naturalHeight) {
                setAspectRatio(img.naturalWidth / img.naturalHeight);
              }
            }}
          />
          {showOverlays && (
            <div className="absolute top-2.5 left-2.5 sm:top-5 sm:left-5 z-20 bg-[#b23a3a]/95 backdrop-blur-md text-white px-2.5 sm:px-3 pt-[7px] pb-[5px] sm:pt-[8px] sm:pb-[6px] rounded-full text-[10px] sm:text-xs font-medium tracking-wide uppercase shadow-md shadow-[#7a1f1f]/50 inline-flex items-center leading-none">
              {beforeLabel}
            </div>
          )}
        </div>

        {/* Vulnerability Annotations (Before side, reverse clipped) */}
        <div
          className="absolute inset-0 w-full h-full z-20 overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          {showOverlays && vulnerabilityFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            const tagged = { ...feat, variant: 'vulnerability' as const };
            return (
              <div
                key={`v-${idx}`}
                className="absolute z-40 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ top: feat.position.top, left: feat.position.left }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveFeature(activeFeature?.title === feat.title ? null : tagged);
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-[#e06666] rounded-full animate-ping opacity-50 group-hover:opacity-80" />
                  <div className="relative bg-[#b23a3a] text-white p-1.5 sm:p-2 md:p-2.5 rounded-full shadow-lg border border-white sm:border-2 group-hover:scale-110 group-hover:bg-[#8a2828] transition-all duration-200 shadow-[#7a1f1f]/50">
                    <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
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
          <img
            src={afterImage}
            alt={afterLabel}
            className="absolute inset-0 w-full h-full object-cover"
            style={isSideBySideSplit ? { width: '200%', objectPosition: 'right center', left: '-100%', maxWidth: 'none' } : undefined}
            draggable={false}
            referrerPolicy="no-referrer"
          />
          {showOverlays && (
            <div className="absolute top-2.5 right-2.5 sm:top-5 sm:right-5 z-20 bg-[#026873] text-white px-2.5 sm:px-3 pt-[7px] pb-[5px] sm:pt-[8px] sm:pb-[6px] rounded-full text-[10px] sm:text-xs font-medium tracking-wide uppercase shadow-lg shadow-[#014f57]/50 whitespace-nowrap inline-flex items-center leading-none">
              {afterLabel}
            </div>
          )}

          {/* Feature Annotations inside the clipped area */}
          {showOverlays && features.map((feat, idx) => {
            const Icon = feat.icon;
            const tagged = { ...feat, variant: 'adaptation' as const };
            return (
              <div
                key={idx}
                className="absolute z-40 transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: feat.position.top, left: feat.position.left }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveFeature(activeFeature?.title === feat.title ? null : tagged);
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-[#028a99] rounded-full animate-ping opacity-60 group-hover:opacity-100" />
                  <div className="relative bg-[#026873] text-white p-1.5 sm:p-2 md:p-2.5 rounded-full shadow-lg border border-white sm:border-2 group-hover:scale-110 group-hover:bg-[#014f57] transition-all duration-200 shadow-[#014f57]/50">
                    <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform shadow-slate-900/50 border border-slate-100">
            <ArrowLeftRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-slate-900" strokeWidth={2.5} />
          </div>
        </div>

        {/* Active Feature Detail Overlay — inside the frame so it clips and swipes away with the slider */}
        <AnimatePresence>
        {activeFeature && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${popupCorner} ${compact ? (activeFeature.image ? 'w-[260px] md:w-[300px]' : 'w-[210px] md:w-[230px]') : (activeFeature.image ? 'w-[280px] md:w-[360px]' : 'w-[240px] md:w-[300px]')} max-w-[72%] md:max-w-[85%] max-h-[80%] overflow-y-auto backdrop-blur-md text-white p-3 md:p-4 rounded-xl md:rounded-2xl z-50 shadow-2xl pointer-events-auto ring-1 ring-white/10 ${activeFeature.variant === 'vulnerability' ? 'bg-[#7a1f1f]/95' : 'bg-[#014f57]/95'}`}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                setActiveFeature(null);
              }}
              className={`absolute ${activeFeature.image ? 'top-4 right-4 md:top-7 md:right-7' : 'top-2.5 right-2.5 md:top-3 md:right-3'} z-10 flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors`}
            >
              <X className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2.5} />
            </button>
            {activeFeature.image && (
              <div className="mb-2 md:mb-3">
                <img
                  src={activeFeature.image}
                  alt={activeFeature.title}
                  className={`w-full ${activeFeature.imageContain ? 'h-32 md:h-56 object-contain bg-black/20' : 'h-24 md:h-44 object-cover object-[center_72%]'} rounded-lg md:rounded-xl ring-1 ring-white/15`}
                  draggable={false}
                />
                {activeFeature.imageCredit && (
                  <p className="mt-1.5 md:mt-2 text-[10px] text-white/60 leading-tight">
                    Photo: {activeFeature.imageCredit}
                  </p>
                )}
              </div>
            )}
            <div className={`flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2 pr-6 md:pr-7 ${activeFeature.variant === 'vulnerability' ? 'text-[#ffb8b8]' : 'text-[#7fd4e0]'}`}>
              <activeFeature.icon className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
              <h3 className="text-sm md:text-lg font-bold text-white leading-tight whitespace-pre-line">{activeFeature.title}</h3>
            </div>
            <p className={`text-xs md:text-sm leading-snug md:leading-relaxed ${activeFeature.variant === 'vulnerability' ? 'text-red-50/90' : 'text-sky-50/90'}`}>
              {activeFeature.description}
            </p>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}
