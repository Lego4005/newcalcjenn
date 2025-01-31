'use client'

import { HeroUIProvider } from "@heroui/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useEffect, useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/cache"

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
        </NextThemesProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  )
} 