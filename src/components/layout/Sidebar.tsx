'use client'

import { Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from "@nextui-org/react"
import { Home, Building2, Settings, ChevronLeft, Users, FileText, PieChart, Plus, Bell, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { PropertyContext } from "@/components/PropertyContext"
import Logo from './Logo'

interface SidebarProps {
  isCollapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

export function Sidebar({ isCollapsed, onCollapse }: SidebarProps) {
  const { theme, setTheme } = useTheme()
  
  const toggleSidebar = () => {
    onCollapse(!isCollapsed)
    localStorage.setItem('sidebarCollapsed', String(!isCollapsed))
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <aside className={`fixed top-0 left-0 h-screen bg-black/90 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <Logo isCollapsed={isCollapsed} />
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4">
          <Button
            isIconOnly
            variant="light"
            className="text-white/90 data-[hover]:bg-white/10"
            radius="full"
            onClick={toggleSidebar}
          >
            <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        <div className="flex-1 px-2 py-4">
          <div className="space-y-2">
            <Button
              variant="light"
              className={`w-full justify-start text-white/90 data-[hover]:bg-white/10 ${isCollapsed ? 'px-0 justify-center' : ''}`}
              startContent={!isCollapsed && <Home className="w-4 h-4" />}
            >
              {isCollapsed ? <Home className="w-4 h-4" /> : "Dashboard"}
            </Button>
            
            <Button
              variant="light"
              className={`w-full justify-start text-white/90 data-[hover]:bg-white/10 ${isCollapsed ? 'px-0 justify-center' : ''}`}
              startContent={!isCollapsed && <Building2 className="w-4 h-4" />}
            >
              {isCollapsed ? <Building2 className="w-4 h-4" /> : "Properties"}
            </Button>

            <Button
              variant="light"
              className={`w-full justify-start text-white/90 data-[hover]:bg-white/10 ${isCollapsed ? 'px-0 justify-center' : ''}`}
              startContent={!isCollapsed && <Users className="w-4 h-4" />}
            >
              {isCollapsed ? <Users className="w-4 h-4" /> : "Team"}
            </Button>

            <Button
              variant="light"
              className={`w-full justify-start text-white/90 data-[hover]:bg-white/10 ${isCollapsed ? 'px-0 justify-center' : ''}`}
              startContent={!isCollapsed && <FileText className="w-4 h-4" />}
            >
              {isCollapsed ? <FileText className="w-4 h-4" /> : "Documents"}
            </Button>

            <Button
              variant="light"
              className={`w-full justify-start text-white/90 data-[hover]:bg-white/10 ${isCollapsed ? 'px-0 justify-center' : ''}`}
              startContent={!isCollapsed && <PieChart className="w-4 h-4" />}
            >
              {isCollapsed ? <PieChart className="w-4 h-4" /> : "Analytics"}
            </Button>
          </div>

          {!isCollapsed && (
            <div className="mt-6">
              <div className="px-3 py-2 flex items-center justify-between">
                <h3 className="text-xs font-medium text-white/50 uppercase">Properties</h3>
                <Tooltip content="Add Property">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    className="text-white/90 data-[hover]:bg-white/10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </Tooltip>
              </div>
              <PropertyContext isCompact={isCollapsed} />
            </div>
          )}
        </div>

        <div className="p-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            {!isCollapsed ? (
              <>
                <Dropdown placement="top-end">
                  <DropdownTrigger>
                    <Button
                      variant="light"
                      className="flex-1 justify-start gap-2 text-white/90 data-[hover]:bg-white/10"
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
                    className="text-white/90 data-[hover]:bg-white/10"
                  >
                    <Bell className="w-4 h-4" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    className="text-white/90 data-[hover]:bg-white/10"
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
                className="w-full text-white/90 data-[hover]:bg-white/10"
              >
                <Avatar
                  src="https://i.pravatar.cc/40?img=3"
                  className="w-8 h-8"
                />
              </Button>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
} 