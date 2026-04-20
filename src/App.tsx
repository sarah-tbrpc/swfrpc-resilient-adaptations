import React, { useState } from 'react';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { AdaptationFeature } from './components/AdaptationFeature';
import { MapPin, ArrowLeftRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { locationsData } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState(locationsData[0].id);
  const activeLocation = locationsData.find(loc => loc.id === activeTab) || locationsData[0];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Global Navigation */}
      <nav className="bg-white z-50 relative border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-bold text-lg tracking-wider uppercase text-[#026873] flex items-center gap-2">
            Coastal Resilience Visualizations
          </div>
          <div className="flex bg-slate-100 rounded-full p-1 overflow-x-auto max-w-full">
            {locationsData.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActiveTab(loc.id)}
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

      {/* Main Content Area transition */}
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
                <div className="flex items-center gap-2 text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full w-fit mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-sm font-medium tracking-wide uppercase">{activeLocation.location}</span>
                </div>
                <h1 className="text-[40px] md:text-[44px] leading-tight font-bold tracking-tight text-[#026873] mb-4">
                  {activeLocation.title}
                </h1>
                <p className="text-[22px] text-[#026873] leading-[24px] w-full">
                  {activeLocation.description}
                </p>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-10">
            {/* The Challenge & Strategy Combined */}
            <section className="mb-10">
              <div className="bg-white p-8 md:p-12 rounded-[2rem] ring-1 ring-slate-200 shadow-sm relative overflow-hidden">
                {/* Decorative background shape */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                <div className="grid lg:grid-cols-2 gap-0 lg:gap-16 relative">
                  {/* Vulnerability Section */}
                  <div className="pb-8 mb-8 border-b border-slate-100 lg:pb-0 lg:mb-0 lg:border-b-0">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h2 className="text-[28px] leading-tight font-semibold tracking-tight text-[#026873]">The Vulnerability</h2>
                    </div>
                    <div className="prose prose-slate [&_p]:text-[22px] [&_p]:leading-[24px] [&_p]:text-[#026873] max-w-none">
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
                    <div className="prose prose-slate [&_p]:text-[22px] [&_p]:leading-[24px] [&_p]:text-[#026873] [&_strong]:text-[#026873] mb-8 max-w-none">
                      {activeLocation.strategy}
                    </div>
                    <div className="bg-[#f0f9fb] rounded-2xl p-6 ring-1 ring-[#009bba]/20">
                      <ul className="space-y-3">
                        {activeLocation.strategyPoints.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 text-slate-700">
                            <div className="w-2 h-2 rounded-full bg-[#009bba] mt-1.5 shrink-0 shadow-sm shadow-[#009bba]/30" />
                            <span className="leading-normal text-[18px]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Slider Section */}
            <section className="mb-0">
              <div className="flex items-center justify-center gap-2 mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>Drag the slider below to see the simulated transformation</span>
              </div>
              <BeforeAfterSlider
                beforeImage={activeLocation.imageUrl}
                afterImage={activeLocation.imageUrl}
                beforeLabel={activeLocation.beforeLabel}
                afterLabel={activeLocation.afterLabel}
                isSideBySideSplit={activeLocation.isSideBySideSplit}
                features={activeLocation.features}
                vulnerabilityFeatures={activeLocation.vulnerabilityFeatures}
              />
              <div className="mt-8 flex flex-col md:flex-row gap-6 md:gap-12 justify-between text-[15px] leading-snug text-slate-500">
                <div className="flex-1">
                  <strong className="text-[20px] leading-tight text-[#b23a3a] block mb-2">Before: Flood Vulnerable</strong>
                  {activeLocation.beforeDesc}
                </div>
                <div className="flex-1">
                  <strong className="text-[20px] leading-tight text-[#026873] block mb-2">After: Adapted Condition</strong>
                  {activeLocation.afterDesc}
                </div>
              </div>
            </section>

            {/* Citations Section */}
            {activeLocation.citations && activeLocation.citations.length > 0 && (
              <section className="mt-10 mb-2 pt-6 border-t border-slate-200/60 w-full">
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

      <footer className="bg-white border-t border-slate-200 mt-auto py-6 px-6 lg:px-8 text-center text-sm">
        <p className="text-xs text-slate-500 leading-snug">
          These visualizations are conceptual planning aids produced for informational and public engagement purposes only. They do not represent finalized designs, engineering specifications, or regulatory commitments.
        </p>
      </footer>
    </div>
  );
}
