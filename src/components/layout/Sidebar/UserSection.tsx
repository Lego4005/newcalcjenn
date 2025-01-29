'use client'

import { Avatar, Button, Tooltip } from "@heroui/react"
import { Bell, Moon } from "lucide-react"
import { useTheme } from "next-themes"

interface UserSectionProps {
  isCollapsed: boolean
}

export function UserSection({ isCollapsed }: UserSectionProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center' : 'px-2'}`}>
      {!isCollapsed && (
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Avatar
              name="John Smith"
              className="w-8 h-8"
              src="/avatars/avatar-1.png"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Smith</p>
              <p className="text-xs text-white/60 truncate">Agent</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-1">
        <Tooltip content="Notifications" placement="top">
          <Button
            isIconOnly
            variant="light"
            className="text-white/60 data-[hover]:text-white data-[hover]:bg-white/5"
            size="sm"
          >
            <Bell className="w-4 h-4" />
          </Button>
        </Tooltip>
        
        <Tooltip content="Toggle theme" placement="top">
          <Button
            isIconOnly
            variant="light"
            className="text-white/60 data-[hover]:text-white data-[hover]:bg-white/5"
            size="sm"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <Moon className="w-4 h-4" />
          </Button>
        </Tooltip>

        {isCollapsed && (
          <Tooltip content="John Smith" placement="right">
            <Avatar
              name="John Smith"
              className="w-8 h-8"
              src="/avatars/avatar-1.png"
            />
          </Tooltip>
        )}
      </div>
    </div>
  )
} 