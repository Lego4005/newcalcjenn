'use client'; // Required because the component uses useEffect

import { BounceCards } from "@/components/ui/bounce-cards";

// Updated image URLs to represent houses better
const images = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=500&auto=format&fit=crop", // Modern house
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=500&auto=format&fit=crop", // House with pool
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=500&auto=format&fit=crop", // Suburban house
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=500&auto=format&fit=crop", // Dashboard image
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=500&auto=format&fit=crop"  // Different house
];

const transformStyles = [
  "rotate(10deg) translate(-80px)",
  "rotate(5deg) translate(-40px)",
  "rotate(-3deg)",
  "rotate(-10deg) translate(40px)",
  "rotate(2deg) translate(80px)"
];

export default function BounceCardsDemoPage() {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <h1 className="text-2xl font-bold mb-8">Bounce Cards Demo</h1>
      <BounceCards
        images={images}
        containerWidth={500}
        containerHeight={500}
        animationDelay={1}
        animationStagger={0.08}
        easeType="elastic.out(1, 0.5)"
        transformStyles={transformStyles}
        className="mb-8" // Added margin bottom
      />
      <p className="text-sm text-foreground-500">
        Animated card display using GSAP.
      </p>
    </div>
  );
} 