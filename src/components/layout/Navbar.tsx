'use client' // Need client component for hook

import React from 'react';
import { useTheme } from "next-themes";
import { Button } from "@heroui/react"; // Assuming HeroUI Button

export const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>Navbar</div>
        <Button 
          variant="light" // Example variant
          size="sm"      // Example size
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          Toggle Theme ({theme})
        </Button>
      </div>
    </nav>
  );
};
 