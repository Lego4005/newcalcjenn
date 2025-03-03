'use client'

import { useState, useEffect } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
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
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { PropertySidebar } from "@/components/sidebar"
import { Property } from "@/components/property/types"
import { PropertyExpandedView } from "@/components/property/PropertyExpandedView"

interface SidebarItem {
  key: string
  title: string
  icon: React.ReactNode
  href?: string
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSidebarExpanded, setSidebarExpanded] = useState(true)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isExpandedViewOpen, setIsExpandedViewOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  // Set Dashboard as active by default when on root path
  useEffect(() => {
    if (pathname === '/') {
      // This is just to ensure Dashboard is highlighted on the root path
      // No actual state change needed as we're using pathname for active state
    }
  }, [pathname])

  // Sample properties - in a real app, these would come from a data source
  const sampleProperties: Property[] = [
    {
      id: '1',
      address: '123 Main St, Austin, TX',
      price: '$450,000',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      status: 'active',
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1850,
      yearBuilt: 2015,
      lastTouched: '2025-02-28',
      taxAssessment: 425000,
      zestimate: 455000,
      annualTaxAmount: 8500
    },
    {
      id: '2',
      address: '456 Oak Ave, Austin, TX',
      price: '$550,000',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
      status: 'pending',
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2200,
      yearBuilt: 2010,
      lastTouched: '2025-03-01',
      taxAssessment: 530000,
      zestimate: 560000,
      annualTaxAmount: 10600
    },
    {
      id: '3',
      address: '789 Pine Rd, Austin, TX',
      price: '$650,000',
      image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126',
      status: 'closed',
      bedrooms: 5,
      bathrooms: 3.5,
      squareFeet: 2800,
      yearBuilt: 2018,
      lastTouched: '2025-02-25',
      taxAssessment: 625000,
      zestimate: 660000,
      annualTaxAmount: 12500
    },
  ]

  const menuItems: SidebarItem[] = [
    { key: 'dashboard', title: 'Dashboard', href: '/', icon: <Home className="w-5 h-5" /> },
    { key: 'properties', title: 'Property Search', href: '/properties', icon: <Search className="w-5 h-5" /> },
    { key: 'documents', title: 'Documents', href: '/documents', icon: <FileText className="w-5 h-5" /> },
    { key: 'analytics', title: 'Analytics', href: '/analytics', icon: <BarChart className="w-5 h-5" /> },
    { key: 'settings', title: 'Settings', href: '/settings', icon: <Settings className="w-5 h-5" /> },
  ]

  // Helper function to determine if a menu item is active
  const isMenuItemActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/' || pathname === '/dashboard';
    }
    return pathname === href;
  }

  // Handle property selection
  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property)
    setIsExpandedViewOpen(true)
  }

  // Handle loading property to calculator
  const handleLoadToCalculator = (property: Property) => {
    console.log('Loading property into calculator:', property)
    setIsExpandedViewOpen(false)
    // In a real implementation, this would update the calculator state
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Desktop Sidebar */}
        <PropertySidebar
          properties={sampleProperties}
          selectedProperty={selectedProperty}
          onSelectProperty={handlePropertySelect}
          isExpanded={isSidebarExpanded}
          onToggleExpanded={() => setSidebarExpanded(!isSidebarExpanded)}
        />

        {/* Mobile Sidebar */}
        <aside className={`fixed inset-y-0 left-0 w-72 bg-background border-r transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out lg:hidden z-50`}>
          <div className="flex h-14 items-center justify-between px-4">
            <img 
              src="https://rocatitle.com/wp-content/uploads/2022/03/PNG-04_small_v2a.png"
              alt="Roca Title"
              className="h-10 w-auto" // Increased from h-8 to h-10
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

          <div className="p-4 overflow-y-auto">
            <PropertySidebar
              properties={sampleProperties}
              selectedProperty={selectedProperty}
              onSelectProperty={(property) => {
                handlePropertySelect(property)
                setIsMenuOpen(false)
              }}
              isExpanded={true}
              onToggleExpanded={() => {}}
            />
          </div>

          <Divider />

          <div className="p-4">
            {menuItems.map((item) => (
              <NextLink
                key={item.key}
                href={item.href || '#'}
                className={`flex items-center gap-3 px-3 h-12 rounded-lg ${
                  isMenuItemActive(item.href || '') 
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

        <div className={`flex-1 ${isSidebarExpanded ? 'lg:ml-80' : 'lg:ml-[70px]'}`}>
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
                className="h-10 w-auto" // Increased from h-8 to h-10
              />
            </NavbarBrand>

            <NavbarContent
              className="hidden h-12 w-full gap-8 rounded-full bg-content2 px-6 dark:bg-content1 sm:flex"
              justify="center"
            >
              {menuItems.map((item) => (
                <NavbarItem key={item.key} isActive={isMenuItemActive(item.href || '')}>
                  <NextLink
                    className={`flex gap-2 text-inherit ${isMenuItemActive(item.href || '') ? 'text-primary' : ''}`}
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
                    className={`w-full ${isMenuItemActive(item.href || '') ? 'text-primary' : 'text-foreground'}`}
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

      {/* Property Expanded View */}
      <PropertyExpandedView
        property={selectedProperty}
        isOpen={isExpandedViewOpen}
        onClose={() => setIsExpandedViewOpen(false)}
        onLoadToCalculator={handleLoadToCalculator}
      />
    </div>
  )
}