import React, { useState, useEffect, useCallback } from 'react';
import { slides } from '../data/slides';

const Presentation: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentSlide = slides[currentIndex];

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, isFullscreen]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[#020408] text-white overflow-hidden flex flex-col z-[100] font-sans">
      
      {/* Top Header */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-end items-center z-20 pointer-events-none">
        <div className="text-xs font-mono text-gray-500 bg-black/50 px-3 py-1.5 rounded border border-white/10">
          {currentIndex + 1} / {slides.length}
        </div>
      </div>

      {/* Main Slide Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative p-8 md:p-16">
        
        {/* Background Grid Pattern (like TREX) */}
        <div 
          className="absolute inset-0 z-0 opacity-10" 
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        <div className="z-10 w-full max-w-6xl h-full flex flex-col relative animate-fade-in transition-opacity duration-300">
          {/* Only show title block if it's not the first slide (which handles its own huge title) or the last slide */}
          {currentSlide.id !== 1 && currentSlide.id !== 12 && (
            <div className="mb-8 pl-8 border-l-4 border-cyber-blue">
              <h2 className="text-sm font-mono text-cyber-blue tracking-[0.2em] uppercase mb-1">
                CYBERSHIELD AI
              </h2>
              <h1 className="text-4xl font-bold text-white">
                {currentSlide.title}
              </h1>
            </div>
          )}
          
          <div className="flex-1 relative w-full h-full">
            {currentSlide.content}
          </div>
        </div>
      </div>

      {/* Speaker Notes Overlay */}
      {showNotes && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl bg-black/90 border border-cyber-blue/30 p-6 rounded-xl shadow-2xl z-30 backdrop-blur-xl">
          <h4 className="text-cyber-blue text-xs font-mono mb-2 border-b border-white/10 pb-2">SPEAKER NOTES</h4>
          <p className="text-gray-300 text-lg leading-relaxed font-sans">{currentSlide.speakerNotes}</p>
        </div>
      )}

      {/* Bottom Control Bar */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-black/80 border-t border-white/5 flex items-center justify-between px-6 z-20 backdrop-blur-md">
        
        {/* Left: Notes Toggle */}
        <button 
          onClick={() => setShowNotes(!showNotes)}
          className={`flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded transition-colors ${showNotes ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30' : 'text-gray-500 hover:text-white border border-transparent'}`}
        >
          {showNotes ? 'HIDE NOTES' : 'SPEAKER NOTES'}
        </button>

        {/* Center: Progress Bar */}
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'w-8 bg-cyber-blue' : 'bg-white/20 hover:bg-white/50'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleFullscreen}
            className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded transition-colors"
            title="Fullscreen"
          >
            ⛶
          </button>
          <div className="w-px h-6 bg-white/10 mx-2"></div>
          <button 
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
          >
            ←
          </button>
          <button 
            onClick={goToNext}
            disabled={currentIndex === slides.length - 1}
            className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
