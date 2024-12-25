'use client'

import { Button } from "@nextui-org/react"
import { usePathname } from "next/navigation"
import NextLink from "next/link"

interface CalculatorTool {
  name: string
  icon: string
  href: string
}

export function CalculatorTools() {
  const pathname = usePathname()
  
  const tools: CalculatorTool[] = [
    { name: "Newly built", icon: "🏗️", href: "/newly-built" },
    { name: "Secondary", icon: "🏢", href: "/" },
    { name: "Cottage", icon: "🏡", href: "/cottage" },
    { name: "Refinance", icon: "💰", href: "/refinance" },
    { name: "Earth", icon: "🌍", href: "/earth" },
    { name: "Military Mortgage", icon: "🎖️", href: "/military" },
    { name: "God's support", icon: "🙏", href: "/support" },
    { name: "More meters", icon: "📏", href: "/meters" },
  ]

  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
      {tools.map((tool) => (
        <NextLink
          key={tool.href}
          href={tool.href}
          className="block"
        >
          <Button
            className="w-full h-full min-h-[80px] flex-col gap-2"
            variant={pathname === tool.href ? "solid" : "light"}
            color={pathname === tool.href ? "primary" : "default"}
          >
            <span className="text-2xl">{tool.icon}</span>
            <span className="text-xs text-center">{tool.name}</span>
          </Button>
        </NextLink>
      ))}
    </div>
  )
} 