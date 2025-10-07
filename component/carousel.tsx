'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  'https://plus.unsplash.com/premium_photo-1664201890375-f8fa405cdb7d?q=80&w=870&auto=format&fit=crop',
  'https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?q=80&w=870&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1675516490928-e8fdfdf65ca8?q=80&w=870&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=870&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1726137569825-7535962addcd?q=80&w=870&auto=format&fit=crop',
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prevSlide = () => setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () => setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1));
  const goToSlide = (index: number) => setCurrent(index);

  // Auto-slide
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg h-96" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} >
      {/* Slides */}
      {images.map((src, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${   current === i ? 'opacity-100 z-10' : 'opacity-0 z-0' }`} >
          <Image src={src} alt={`Slide ${i + 1}`} fill className="object-cover" />
        </div>
      ))}

      {/* Prev / Next buttons */}
      <button onClick={prevSlide} aria-label="Previous Slide" className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-60 z-20"> &#10094; </button>
      <button onClick={nextSlide} aria-label="Next Slide" className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-60 z-20" > &#10095; </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <button key={i} onClick={() => goToSlide(i)} aria-label={`Go to slide ${i + 1}`} className={`w-3 h-3 rounded-full ${current === i ? 'bg-white opacity-100' : 'bg-white opacity-50'}`}/>
        ))}
      </div>
    </div>
  );
}
