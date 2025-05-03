'use client';

import { AnimatedNetSheet } from "@/components/ui/animated-net-sheet";

// Using the same house images
const images = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=500&auto=format&fit=crop",
];

export default function AnimatedNetSheetDemoPage() {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <h1 className="text-2xl font-bold mb-8">Animated Net Sheet Demo</h1>
      <AnimatedNetSheet
        images={images}
        sheetWidth={400} // Slightly wider sheet
        sheetMinHeight={500} // Taller sheet
        className="mb-8"
      />
      <p className="text-sm text-foreground-500">
        Images animating onto a sheet element.
      </p>
    </div>
  );
} 