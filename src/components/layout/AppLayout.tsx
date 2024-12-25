'use client'

import { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  Avatar,
  Badge,
  Divider,
  Listbox,
  ListboxItem,
  Tooltip,
  Accordion,
  AccordionItem,
} from "@nextui-org/react"
import { usePathname } from 'next/navigation'
import NextLink from 'next/link'
import { 
  Home,
  Search,
  FileText,
  BarChart,
  Settings,
  Sun,
  Moon,
  Bell,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { PropertyContext } from "@/components/PropertyContext"

interface SidebarItem {
  key: string
  title: string
  icon: React.ReactNode
  href?: string
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSidebarCompact, setSidebarCompact] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const menuItems: SidebarItem[] = [
    { key: 'net-seller', title: 'Net Seller Sheet', href: '/', icon: <Home className="w-5 h-5" /> },
    { key: 'search', title: 'Property Search', href: '/search', icon: <Search className="w-5 h-5" /> },
    { key: 'documents', title: 'Documents', href: '/documents', icon: <FileText className="w-5 h-5" /> },
    { key: 'analytics', title: 'Analytics', href: '/analytics', icon: <BarChart className="w-5 h-5" /> },
    { key: 'settings', title: 'Settings', href: '/settings', icon: <Settings className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className={`fixed left-0 top-0 h-screen flex-col border-r transition-all duration-200 ${
          isSidebarCompact ? 'w-[70px]' : 'w-80'
        } hidden lg:flex z-40`}>
          <div className="flex items-center justify-between p-4">
            <div className={`flex items-center ${isSidebarCompact ? 'hidden' : 'block'}`}>
              <img 
                src="https://rocatitle.com/wp-content/uploads/2022/03/PNG-04_small_v2a.png"
                alt="Roca Title"
                className="h-12 w-auto"
              />
            </div>
            <Button
              isIconOnly
              variant="light"
              onClick={() => setSidebarCompact(!isSidebarCompact)}
            >
              {isSidebarCompact ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </Button>
          </div>

          <Divider />

          <div className={`flex-grow ${isSidebarCompact ? 'px-2' : 'p-4'}`}>
            <PropertyContext isCompact={isSidebarCompact} />
          </div>

          <Divider />

          <Listbox
            aria-label="Navigation"
            className="p-4"
            itemClasses={{
              base: "px-3 gap-3 h-12 data-[hover=true]:bg-default-100",
            }}
          >
            {menuItems.map((item) => (
              <ListboxItem
                key={item.key}
                href={item.href}
                startContent={item.icon}
                textValue={item.title}
              >
                {isSidebarCompact ? (
                  <Tooltip content={item.title} placement="right">
                    <span className="sr-only">{item.title}</span>
                  </Tooltip>
                ) : (
                  item.title
                )}
              </ListboxItem>
            ))}
          </Listbox>
        </aside>

        {/* Mobile Sidebar */}
        <aside className={`fixed inset-y-0 left-0 w-72 bg-background border-r transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out lg:hidden z-50`}>
          <div className="flex h-14 items-center justify-between px-4">
            <img 
              src="https://rocatitle.com/wp-content/uploads/2022/03/PNG-04_small_v2a.png"
              alt="Roca Title"
              className="h-8 w-auto"
            />
            <Button
              isIconOnly
              variant="light"
              onClick={() => setIsMenuOpen(false)}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>

          <Divider />

          <div className="p-4">
            <PropertyContext isCompact={false} />
          </div>

          <Divider />

          <div className="p-4">
            {menuItems.map((item) => (
              <NextLink
                key={item.key}
                href={item.href || '#'}
                className={`flex items-center gap-3 px-3 h-12 rounded-lg ${
                  pathname === item.href 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground hover:bg-default-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.title}
              </NextLink>
            ))}
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 lg:hidden z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        <div className={`flex-1 ${isSidebarCompact ? 'lg:ml-[70px]' : 'lg:ml-80'}`}>
          <Navbar
            classNames={{
              base: "pt-2 lg:pt-4",
              wrapper: "px-4 sm:px-6",
              item: "data-[active=true]:text-primary",
            }}
            height="60px"
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
          >
            <NavbarBrand className="lg:hidden">
              <NavbarMenuToggle 
                className="mr-2"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              />
              <img 
                src="https://rocatitle.com/wp-content/uploads/2022/03/PNG-04_small_v2a.png"
                alt="Roca Title"
                className="h-8 w-auto"
              />
            </NavbarBrand>

            <NavbarContent
              className="hidden h-12 w-full gap-8 rounded-full bg-content2 px-6 dark:bg-content1 sm:flex"
              justify="center"
            >
              {menuItems.map((item) => (
                <NavbarItem key={item.key} isActive={pathname === item.href}>
                  <NextLink
                    className={`flex gap-2 text-inherit ${pathname === item.href ? 'text-primary' : ''}`}
                    href={item.href || '#'}
                  >
                    {item.title}
                  </NextLink>
                </NavbarItem>
              ))}
            </NavbarContent>

            <NavbarContent
              className="ml-auto flex h-12 max-w-fit items-center gap-0 rounded-full p-0 lg:bg-content2 lg:px-1 lg:dark:bg-content1"
              justify="end"
            >
              {/* Search */}
              <NavbarItem className="mr-2 hidden lg:flex">
                <Input
                  aria-label="Search"
                  classNames={{
                    inputWrapper:
                      "bg-default-100 group-data-[hover=true]:bg-default-50 group-data-[focus=true]:bg-100",
                  }}
                  labelPlacement="outside"
                  placeholder="Search..."
                  radius="full"
                  startContent={
                    <Search className="text-default-500 w-5 h-5" />
                  }
                />
              </NavbarItem>

              {/* Theme change */}
              <NavbarItem className="hidden lg:flex">
                <Button 
                  isIconOnly 
                  radius="full" 
                  variant="light"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                  {theme === 'light' ? (
                    <Moon className="text-default-500 w-5 h-5" />
                  ) : (
                    <Sun className="text-default-500 w-5 h-5" />
                  )}
                </Button>
              </NavbarItem>

              {/* Notifications */}
              <NavbarItem className="flex">
                <Popover offset={12} placement="bottom-end">
                  <PopoverTrigger>
                    <Button
                      disableRipple
                      isIconOnly
                      className="overflow-visible"
                      radius="full"
                      variant="light"
                    >
                      <Badge color="danger" content="5" showOutline={false} size="md">
                        <Bell className="text-default-500 w-5 h-5" />
                      </Badge>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-[90vw] p-0 sm:max-w-[380px]">
                    <div className="p-4">
                      <h4 className="text-lg font-semibold">Notifications</h4>
                      <p className="text-sm text-default-500">You have 5 unread messages</p>
                    </div>
                  </PopoverContent>
                </Popover>
              </NavbarItem>

              {/* User Menu */}
              <NavbarItem className="px-2">
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <button className="mt-1 h-8 w-8 transition-transform">
                      <Badge color="success" content="" placement="bottom-right" shape="circle">
                        <Avatar size="sm" src="https://i.pravatar.cc/150" />
                      </Badge>
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">johndoe@example.com</p>
                    </DropdownItem>
                    <DropdownItem key="settings">My Settings</DropdownItem>
                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
                    <DropdownItem key="analytics">Analytics</DropdownItem>
                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                    <DropdownItem key="logout" color="danger">
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            </NavbarContent>

            {/* Mobile Menu */}
            <NavbarMenu>
              {menuItems.map((item) => (
                <NavbarMenuItem key={item.key}>
                  <NextLink
                    className={`w-full ${pathname === item.href ? 'text-primary' : 'text-foreground'}`}
                    href={item.href || '#'}
                  >
                    {item.title}
                  </NextLink>
                </NavbarMenuItem>
              ))}
            </NavbarMenu>
          </Navbar>

          <div className="flex min-h-[calc(100vh-4rem)]">
            <main className="flex-1 p-4">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
} 