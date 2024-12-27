'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, User } from "@nextui-org/react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Profile {
  full_name?: string
  role?: string
}

export default function DashboardNavigation({ profile }: { profile: Profile | null }) {
  const router = useRouter()
  const isAdmin = profile?.role === 'admin'

  const handleSignOut = async () => {
    const supabase = createClientComponentClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Net Seller Calculator</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/dashboard">
            Calculator
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/dashboard/properties">
            My Properties
          </Link>
        </NavbarItem>
        {isAdmin && (
          <NavbarItem>
            <Link color="foreground" href="/dashboard/users">
              Users
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <User
            name={profile?.full_name || 'User'}
            description={profile?.role || 'Member'}
            avatarProps={{
              src: `https://api.dicebear.com/7.x/initials/svg?seed=${profile?.full_name || 'U'}`,
            }}
          />
        </NavbarItem>
        <NavbarItem>
          <Button 
            color="danger" 
            variant="flat" 
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
} 