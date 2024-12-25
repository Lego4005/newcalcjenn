'use client'

import { Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react"
import { Bell, ChevronLeft, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

interface UserSectionProps {
  isCollapsed: boolean
}

export function UserSection({ isCollapsed }: UserSectionProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="flex items-center gap-2">
      {!isCollapsed ? (
        <>
          <Dropdown placement="top-end">
            <DropdownTrigger>
              <Button
                variant="light"
                className="flex-1 justify-start gap-2 text-default-500 data-[hover]:bg-default-100"
              >
                <Avatar
                  src="https://i.pravatar.cc/40?img=3"
                  className="w-8 h-8"
                />
                <span className="text-sm">John Smith</span>
                <ChevronLeft className="w-4 h-4 rotate-90" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile">Profile</DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem key="team">Team</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="help">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" className="text-danger" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div className="flex gap-2">
            <Button
              isIconOnly
              variant="light"
              className="text-default-500 data-[hover]:bg-default-100"
            >
              <Bell className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              variant="light"
              className="text-default-500 data-[hover]:bg-default-100"
              onClick={toggleTheme}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>
          </div>
        </>
      ) : (
        <Button
          isIconOnly
          variant="light"
          className="w-full text-default-500 data-[hover]:bg-default-100"
        >
          <Avatar
            src="https://i.pravatar.cc/40?img=3"
            className="w-8 h-8"
          />
        </Button>
      )}
    </div>
  )
} 