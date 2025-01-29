'use client'

import { useEffect, useState } from 'react'
import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Link } from "@heroui/react"
import { createClient } from '@/utils/supabase/client'

interface Property {
  id: string
  address: string
  list_price: number
  commission_rate: number
  document_url: string
  created_at: string
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('agent_id', session.user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setProperties(data || [])
    } catch (error) {
      console.error('Error loading properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const downloadPDF = async (documentUrl: string, address: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('property-documents')
        .download(documentUrl)

      if (error) throw error

      const url = URL.createObjectURL(data)
      const link = document.createElement('a')
      link.href = url
      link.download = `${address.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading PDF:', error)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Properties</h1>
        <Button
          as={Link}
          href="/dashboard"
          color="primary"
        >
          New Calculation
        </Button>
      </div>

      <Card>
        <CardBody>
          <Table aria-label="Properties">
            <TableHeader>
              <TableColumn>ADDRESS</TableColumn>
              <TableColumn>LIST PRICE</TableColumn>
              <TableColumn>COMMISSION RATE</TableColumn>
              <TableColumn>DATE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody
              items={properties}
              loadingContent={loading ? "Loading..." : undefined}
              emptyContent={!loading ? "No properties found" : undefined}
            >
              {(property) => (
                <TableRow key={property.id}>
                  <TableCell>{property.address}</TableCell>
                  <TableCell>{formatCurrency(property.list_price)}</TableCell>
                  <TableCell>{property.commission_rate}%</TableCell>
                  <TableCell>{formatDate(property.created_at)}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="flat"
                      color="primary"
                      onClick={() => downloadPDF(property.document_url, property.address)}
                    >
                      Download PDF
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