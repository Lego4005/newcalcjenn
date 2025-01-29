'use client'

import { useEffect, useState } from 'react'
import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Select, SelectItem, useDisclosure } from "@heroui/react"
import { createClient } from '@/utils/supabase/client'

interface User {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'broker' | 'agent'
  company: string
  broker_id: string | null
  created_at: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    checkAccess()
    loadUsers()
  }, [])

  const checkAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== 'admin') {
      window.location.href = '/dashboard'
    }

    setCurrentUser(session.user.id)
  }

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateUserRole = async (userId: string, newRole: 'admin' | 'broker' | 'agent') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)

      if (error) throw error
      
      // Refresh the users list
      loadUsers()
    } catch (error) {
      console.error('Error updating user role:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <Card>
        <CardBody>
          <Table aria-label="Users">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>COMPANY</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>JOINED</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody
              items={users}
              loadingContent={loading ? "Loading..." : undefined}
              emptyContent={!loading ? "No users found" : undefined}
            >
              {(user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.company}</TableCell>
                  <TableCell>
                    <Select
                      size="sm"
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value as 'admin' | 'broker' | 'agent')}
                      disabled={user.id === currentUser}
                    >
                      <SelectItem key="agent" value="agent">Agent</SelectItem>
                      <SelectItem key="broker" value="broker">Broker</SelectItem>
                      <SelectItem key="admin" value="admin">Admin</SelectItem>
                    </Select>
                  </TableCell>
                  <TableCell>{formatDate(user.created_at)}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="flat"
                      color="primary"
                      as="a"
                      href={`/dashboard/users/${user.id}`}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  )
} 