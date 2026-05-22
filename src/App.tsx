import React, { useState, useRef, useEffect } from 'react';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { AdaptationFeature } from './components/AdaptationFeature';
import { RegionMap } from './components/RegionMap';
import { MapPin, ArrowLeftRight, ArrowDown, ArrowUp, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { locationsData, regionalOverview } from './data';
import type { FeatureAnnotation } from './components/BeforeAfterSlider';

interface SliderConfig {
  title?: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  isSideBySideSplit?: boolean;
  features?: FeatureAnnotation[];
  vulnerabilityFeatures?: FeatureAnnotation[];
  beforeDesc?: React.ReactNode;
  afterDesc?: React.ReactNode;
  beforeCredit?: string;
  hideBaseImagery?: boolean;
  baseImageryCredit?: string;
  aspectRatioOverride?: number;
}

function CardImage({ images, alt = '' }: { images: string[]; alt?: string }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [images.length]);
  return (
    <div className="relative w-full h-full">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover block transition-opacity duration-700 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  );
}

function BeforeAfterDescription({ beforeDesc, afterDesc }: { beforeDesc?: React.ReactNode; afterDesc?: React.ReactNode }) {
  return (
    <div className="mt-8 flex flex-col md:flex-row gap-6 md:gap-12 justify-between text-[16px] leading-snug text-slate-500">
      <div className="flex-1">
        <strong className="text-[20px] leading-tight text-[#b23a3a] block mb-2">Current Conditions</strong>
        {beforeDesc}
      </div>
      <div className="flex-1">
        <strong className="text-[20px] leading-tight text-[#026873] block mb-2">Adapted Conditions</strong>
        {afterDesc}
      </div>
    </div>
  );
}

const SliderSection: React.FC<{ slider: SliderConfig; hideDescription?: boolean; compact?: boolean }> = ({ slider, hideDescription, compact }) => {
  const [showOverlays, setShowOverlays] = useState(true);
  return (
    <section>
      {slider.title && (
        <h3 className="text-center text-[24px] font-bold tracking-tight text-[#026873] mb-3">
          {slider.title}
        </h3>
      )}
      <div className="flex flex-col items-center gap-2.5 mb-4">
        <div className="flex items-center gap-2 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
          <ArrowLeftRight className="w-3.5 h-3.5 shrink-0" />
          <span>Drag the slider below to see the simulated transformation</span>
        </div>
        <button
          type="button"
          aria-label={showOverlays ? 'Hide labels and markers' : 'Show labels and markers'}
          onClick={() => setShowOverlays((v) => !v)}
          className="inline-flex items-center justify-center gap-1.5 bg-white text-slate-600 hover:text-[#026873] hover:border-[#026873] px-3 h-[26px] rounded-full text-xs font-medium border border-slate-200 shadow-sm transition-colors leading-none"
        >
          {showOverlays ? <EyeOff className="w-3.5 h-3.5 shrink-0" /> : <Eye className="w-3.5 h-3.5 shrink-0" />}
          <span>{showOverlays ? 'Hide labels' : 'Show labels'}</span>
        </button>
      </div>
      <BeforeAfterSlider
        beforeImage={slider.beforeImage}
        afterImage={slider.afterImage}
        beforeLabel={slider.beforeLabel}
        afterLabel={slider.afterLabel}
        isSideBySideSplit={slider.isSideBySideSplit}
        features={slider.features}
        vulnerabilityFeatures={slider.vulnerabilityFeatures}
        aspectRatioOverride={slider.aspectRatioOverride}
        compact={compact}
        showOverlays={showOverlays}
      />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-slate-400">
        <p>
          For conceptual planning and illustrative purposes only.
        </p>
        {(slider.beforeCredit || !slider.hideBaseImagery) && (
          <p className="whitespace-nowrap">
            {slider.beforeCredit && (
              <>Before image © {slider.beforeCredit}{!slider.hideBaseImagery ? ' · ' : ''}</>
            )}
            {!slider.hideBaseImagery && (
              <>Base imagery © {slider.baseImageryCredit ?? 'Google Maps'}</>
            )}
          </p>
        )}
      </div>
      {!hideDescription && (
        <BeforeAfterDescription beforeDesc={slider.beforeDesc} afterDesc={slider.afterDesc} />
      )}
    </section>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(locationsData[0].id);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);
  const [btnBottom, setBtnBottom] = useState(24);
  const activeLocation = locationsData.find(loc => loc.id === activeTab) || locationsData[0];
  const siteDetailRef = useRef<HTMLDivElement>(null);
  const disclaimerRef = useRef<HTMLParagraphElement>(null);

  // Always open at the top of the page on load/restore instead of letting the
  // browser restore a prior scroll position (which often landed mid–Moore Haven).
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 500);
      const el = disclaimerRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // Once the disclaimer scrolls into view, rest the button centered on that line
        // (48px button → 24px half-height offset); otherwise float near the bottom.
        const centerY = r.top + r.height / 2;
        setBtnBottom(centerY < vh ? Math.max(24, vh - centerY - 24) : 24);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const selectSite = (id: string) => {
    setActiveTab(id);
    requestAnimationFrame(() => {
      siteDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="bg-slate-50 font-sans text-slate-900">
      {/* Global Navigation */}
      <nav className="bg-white z-50 relative border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-bold text-lg tracking-wider uppercase text-[#026873] flex items-center gap-2">
            Flood Resilience Visualizations
          </div>
          <div className="flex bg-slate-100 rounded-full p-1 overflow-x-auto max-w-full">
            {locationsData.map((loc) => (
              <button
                key={loc.id}
                onClick={() => selectSite(loc.id)}
                className={`min-w-fit px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === loc.id
                    ? 'bg-[#026873] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#026873] hover:bg-white'
                }`}
              >
                {loc.tabLabel}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Regional Overview Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 md:py-14">
          <div className="mb-8">
            <div className="flex items-center gap-2 lg:gap-2.5 text-slate-500 bg-slate-100 px-4 py-1.5 lg:px-5 lg:py-2.5 rounded-full w-fit mb-4">
              <MapPin className="w-3.5 h-3.5 lg:w-5 lg:h-5" />
              <span className="text-sm lg:text-lg font-medium tracking-wide uppercase">{regionalOverview.eyebrow}</span>
            </div>
            <h1 className="text-[36px] leading-[40px] font-[570] not-italic tracking-tight font-sans text-[#026873] mb-4">
              {regionalOverview.title}
            </h1>
            <p className="text-[22px] font-[370] text-[#026873] leading-[33px]">
              {regionalOverview.description}
            </p>
            <p className="mt-4 text-[22px] font-[370] text-[#026873] leading-[33px]">
              Every study site is reimagined around nature-based design and{' '}
              <a
                href="https://gsi.floridadep.gov/gsi-basics/what-is-gsi/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline decoration-[#009bba]/50 underline-offset-2 hover:text-[#009bba]"
              >
                Green Stormwater Infrastructure (GSI)
              </a>
              , the common thread for resilient adaptation across the region.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 items-stretch">
            {/* Focused map of the six SWFRPC counties with site pins */}
            <figure className="lg:order-2 h-full">
              <div className="rounded-2xl ring-1 ring-slate-200 bg-white overflow-hidden shadow-sm h-full flex items-center">
                <RegionMap
                  activeId={activeRegion}
                  onHover={setActiveRegion}
                  onSelect={selectSite}
                  className="block w-full h-auto"
                />
              </div>
            </figure>

            {/* Linked site cards — hovering a card highlights its county and pin */}
            <div className="flex flex-col gap-3 lg:order-1">
              {locationsData.map((loc) => {
                const county = loc.location.split(',')[1]?.trim() || loc.location;
                const cardImages = [
                  loc.afterImage,
                  ...((loc.additionalSliders ?? []).map((s) => s.afterImage)),
                ].filter(Boolean);
                return (
                  <button
                    key={loc.id}
                    onClick={() => selectSite(loc.id)}
                    onMouseEnter={() => setActiveRegion(loc.id)}
                    onMouseLeave={() => setActiveRegion(null)}
                    className={`text-left bg-white p-4 rounded-2xl ring-1 transition-all group flex gap-4 items-stretch flex-1 ${
                      activeRegion === loc.id
                        ? 'ring-[#026873] shadow-md'
                        : 'ring-slate-200 hover:ring-[#026873] hover:shadow-sm'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-xs font-semibold tracking-wide uppercase">{county}</span>
                      </div>
                      <h3 className="text-[20px] font-bold text-[#026873] mb-1 leading-tight">
                        {loc.title}
                      </h3>
                      <p className="text-[16px] text-slate-600 leading-snug mb-2">
                        {loc.description}
                      </p>
                      <div className="text-xs font-semibold text-[#009bba] group-hover:text-[#026873] transition-colors">
                        Explore site →
                      </div>
                    </div>
                    <div className="w-28 sm:w-32 shrink-0 self-stretch min-h-[100px] rounded-lg overflow-hidden bg-slate-100 ring-1 ring-slate-200/60">
                      <CardImage images={cardImages} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            <div className="flex-1 h-px bg-slate-200" />
            <ArrowDown className="w-3.5 h-3.5" />
            <span>Site-by-site analysis below</span>
            <ArrowDown className="w-3.5 h-3.5" />
            <div className="flex-1 h-px bg-slate-200" />
          </div>
        </div>
      </section>

      {/* Main Content Area transition */}
      <div ref={siteDetailRef} />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLocation.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="flex-1"
        >
          {/* Header Section */}
          <header className="bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-6">
              <div className="w-full">
                <div className="flex items-center gap-2 lg:gap-2.5 text-slate-500 bg-slate-100 px-4 py-1.5 lg:px-5 lg:py-2.5 rounded-full w-fit mb-4">
                  <MapPin className="w-3.5 h-3.5 lg:w-5 lg:h-5" />
                  <span className="text-sm lg:text-lg font-medium tracking-wide uppercase">{activeLocation.location}</span>
                </div>
                <h1 className="text-[36px] leading-[40px] font-[570] not-italic tracking-tight font-sans text-[#026873] mb-4">
                  {activeLocation.title}
                </h1>
                <p className="text-[22px] font-[370] text-[#026873] leading-[33px] w-full">
                  {activeLocation.description}
                </p>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 md:pt-10 pb-8">
            {/* The Challenge & Strategy Combined */}
            <section className="mb-10">
              <div className="bg-white p-8 md:p-12 rounded-[2rem] ring-1 ring-slate-200 shadow-sm relative overflow-hidden">
                {/* Decorative background shape */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                <div className="grid lg:grid-cols-2 gap-0 lg:gap-16 relative">
                  {/* Vulnerability Section */}
                  <div className="pb-8 mb-8 border-b border-slate-100 lg:pb-0 lg:mb-0 lg:border-b-0 lg:flex lg:flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h2 className="text-[28px] leading-tight font-semibold tracking-tight text-[#026873]">The Problem</h2>
                    </div>
                    <div className="prose prose-slate [&_p]:text-[22px] [&_p]:leading-[33px] [&_p]:font-[370] [&_p]:text-[#026873] max-w-none lg:flex-1 lg:flex lg:flex-col lg:min-h-0">
                      {activeLocation.vulnerability}
                    </div>
                  </div>

                  {/* Vertical Divider (Desktop) */}
                  <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-slate-100 -translate-x-1/2" />

                  {/* Strategy Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-[#e6f4f7] text-[#009bba] flex items-center justify-center shrink-0 border border-[#bce4ec]">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h2 className="text-[28px] leading-tight font-semibold tracking-tight text-[#026873]">The Strategy</h2>
                    </div>
                    <div className="prose prose-slate [&_p]:text-[22px] [&_p]:leading-[33px] [&_p]:font-[370] [&_p]:text-[#026873] [&_strong]:text-[#026873] mb-8 max-w-none">
                      {activeLocation.strategy}
                    </div>
                    <div className="bg-[#f0f9fb] rounded-2xl p-6 ring-1 ring-[#009bba]/20">
                      <ul className="space-y-4">
                        {activeLocation.strategyPoints.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 text-slate-700">
                            <div className="w-2 h-2 rounded-full bg-[#009bba] mt-2 shrink-0 shadow-sm shadow-[#009bba]/30" />
                            <span className="leading-relaxed text-[18px]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Slider Section(s) — one or more before/after sliders per site.
                Multiple sliders lay out side by side on large screens. */}
            {(() => {
              const sliders = [
                {
                  title: activeLocation.sliderTitle,
                  beforeImage: activeLocation.beforeImage,
                  afterImage: activeLocation.afterImage,
                  beforeLabel: activeLocation.beforeLabel,
                  afterLabel: activeLocation.afterLabel,
                  isSideBySideSplit: activeLocation.isSideBySideSplit,
                  features: activeLocation.features,
                  vulnerabilityFeatures: activeLocation.vulnerabilityFeatures,
                  beforeDesc: activeLocation.beforeDesc,
                  afterDesc: activeLocation.afterDesc,
                  beforeCredit: activeLocation.beforeCredit,
                  hideBaseImagery: activeLocation.hideBaseImagery,
                  baseImageryCredit: activeLocation.baseImageryCredit,
                  aspectRatioOverride: activeLocation.sliderAspectRatio,
                },
                ...(activeLocation.additionalSliders ?? []),
              ] as SliderConfig[];
              if (sliders.length > 1) {
                return (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
                      {sliders.map((slider, i) => (
                        <SliderSection key={i} slider={slider} hideDescription compact />
                      ))}
                    </div>
                    <BeforeAfterDescription
                      beforeDesc={sliders[0].beforeDesc}
                      afterDesc={sliders[0].afterDesc}
                    />
                  </>
                );
              }
              return sliders.map((slider, i) => (
                <SliderSection key={i} slider={slider} />
              ));
            })()}

            {/* Citations Section */}
            {activeLocation.citations && activeLocation.citations.length > 0 && (
              <section className="mt-10 pt-6 border-t border-slate-200/60 w-full">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">References</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs text-slate-400">
                  {activeLocation.citations.map((citation, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-snug">
                      <span className="font-medium shrink-0">[{idx + 1}]</span>
                      <a 
                        href={(citation as any).url || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-[#009bba] hover:underline transition-colors"
                      >
                        {(citation as any).text || citation}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </main>
        </motion.div>
      </AnimatePresence>

      <footer className="bg-white border-t border-slate-200 py-6 px-6 lg:px-8 text-left text-sm">
        <p ref={disclaimerRef} className="max-w-7xl mx-auto text-xs text-slate-500 leading-snug">
          These visualizations were produced for informational and public engagement purposes only. They do not represent finalized designs, engineering specifications, or regulatory commitments.
        </p>
      </footer>

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          style={{ bottom: btnBottom }}
          className="fixed right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[#026873] text-white shadow-lg hover:bg-[#014f57] transition-all"
        >
          <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
