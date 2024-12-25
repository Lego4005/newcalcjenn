'use client'

import { CommandMenu } from "@/components/RealEstateCalculator/CommandMenu"

export function Header() {
  return (
    <CommandMenu onAction={(action) => console.log(action)} />
  )
} 