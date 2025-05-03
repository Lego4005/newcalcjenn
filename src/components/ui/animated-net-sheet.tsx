'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Original Interface
interface AnimatedNetSheetProps {
  images?: string[];
  className?: string;
  sheetWidth?: number;
  sheetMinHeight?: number;
  animationDelay?: number;
  cardStagger?: number;
  cardEase?: string;
}

// Original Component Logic
export function AnimatedNetSheet({
  images = [],
  className = '',
  sheetWidth = 350,
  sheetMinHeight = 450,
  animationDelay = 0.8,
  cardStagger = 0.2,
  cardEase = 'power3.out',
}: AnimatedNetSheetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  imageRefs.current = images.map((_, i) => imageRefs.current[i] ?? null);

  useEffect(() => {
    const sheetElement = sheetRef.current;
    const imageElements = imageRefs.current.filter(el => el !== null) as HTMLElement[];

    if (!sheetElement || imageElements.length === 0) return;

    const tl = gsap.timeline({ delay: animationDelay });

    // Initial setup: Hide sheet and cards
    gsap.set(sheetElement, { opacity: 0, scale: 0.95 });
    gsap.set(imageElements, { 
      opacity: 0, 
      scale: 0.5, 
      x: (index) => (index % 2 === 0 ? -300 : 300), // Alternate left/right start
      y: -50, // Start slightly above
      rotation: (index) => (index % 2 === 0 ? -15 : 15), // Alternate rotation
    });

    // 1. Animate Sheet into view
    tl.to(sheetElement, { 
      opacity: 1, 
      scale: 1, 
      duration: 0.5, 
      ease: 'power2.out' 
    });

    // 2. Animate images flying onto the sheet
    tl.to(imageElements, {
      opacity: 1,
      scale: 1,
      x: 0, // Target center horizontally
      y: (index) => (index * 50) - (images.length * 25) + 30, // Stagger vertically
      rotation: 0,
      stagger: cardStagger,
      duration: 0.6,
      ease: cardEase,
    }, "-=0.3"); 

  }, [images.length, animationDelay, cardStagger, cardEase]); 

  return (
    <div 
      ref={containerRef} 
      className={cn('relative flex items-center justify-center', className)}
      style={{ perspective: '1000px' }} 
    >
      {/* The Net Sheet background */}
      <div
        ref={sheetRef}
        className={cn(
          'relative bg-white dark:bg-content2',
          'border border-default-200 dark:border-default-100',
          'rounded-lg shadow-md',
          'p-4 overflow-hidden' 
        )}
        style={{
          width: `${sheetWidth}px`,
          minHeight: `${sheetMinHeight}px`,
        }}
      >
        {/* Original Simple Placeholders */}
        <div className="absolute inset-x-4 top-4 h-8 bg-gray-100 dark:bg-default-300/50 rounded opacity-50"></div>
        <div className="absolute inset-x-4 top-16 h-px bg-gray-200 dark:bg-default-300/30"></div>
        <div className="absolute inset-x-4 top-24 h-px bg-gray-200 dark:bg-default-300/30"></div>
      </div>

      {/* Image cards */}
      {images.map((src, idx) => (
        <div
          key={src + idx} 
          ref={(el) => (imageRefs.current[idx] = el)}
          className={cn(
            'card absolute w-[120px] h-auto aspect-[4/3] rounded-md overflow-hidden',
            'shadow-lg border-2 border-white dark:border-content1'
          )}
          style={{ 
            top: '50%', 
            left: '50%',
            translateX: '-50%',
            translateY: '-50%',
            opacity: 0, // Initially hidden
            willChange: 'transform, opacity' 
          }}
        >
          <Image
            fill 
            className="object-cover" 
            src={src}
            alt={`Net sheet item ${idx + 1}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
            priority={idx < 3} 
            loading={idx < 3 ? undefined : "lazy"} 
          />
        </div>
      ))}
    </div>
  );
} 