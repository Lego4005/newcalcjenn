'use client'

import { Button } from "@heroui/react"
import { Users } from "lucide-react"

interface PropertyHeroProps {
  image: string
  address: string
  price: string
  beds: number
  baths: number
  status: 'Active' | 'Pending' | 'Closed'
}

export function PropertyHero({ image, address, price, beds, baths, status }: PropertyHeroProps) {
  return (
    <div className="relative w-full h-[200px] rounded-xl overflow-hidden mb-6">
      <img 
        src={image} 
        alt={address}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white mb-1">{address}</h1>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <span>{price}</span>
              <span>•</span>
              <span>{beds}bd {baths}ba</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                status === 'Active' ? 'bg-emerald-500/20 text-emerald-500' :
                status === 'Pending' ? 'bg-amber-500/20 text-amber-500' :
                'bg-red-500/20 text-red-500'
              }`}>
                {status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="bg-white/10 backdrop-blur-lg border border-white/20 text-white"
              size="sm"
              radius="full"
              startContent={<Users className="w-4 h-4" />}
            >
              Team
            </Button>
            <Button
              className="bg-white/10 backdrop-blur-lg border border-white/20 text-white"
              size="sm"
              radius="full"
            >
              Quick Actions
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 