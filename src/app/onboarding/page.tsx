'use client'

import { useState } from 'react'
import { Card, CardBody, Button, RadioGroup, Radio } from '@nextui-org/react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const [role, setRole] = useState('agent')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    
    const supabase = createClient(
      'https://mouwoamlzmnysvmmvnii.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vdXdvYW1sem1ueXN2bW12bmlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxNzIzMzgsImV4cCI6MjA1MDc0ODMzOH0.B1OQ10PLcujFhBesX4wNZ-TaxhX0dKml84lB8I3lMOQ'
    )
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            role,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })

        if (error) {
          setMessage(error.message)
        } else {
          router.push('/dashboard')
        }
      }
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-950 via-red-900 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.4),transparent_70%)]" />

      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <div className="relative w-[600px] h-[180px] mb-12">
          <img
            src="https://rocatitle.com/wp-content/uploads/2022/03/PNG-01_main_600px_wide_2.png"
            alt="Roca Title"
            width={600}
            height={180}
            className="object-contain"
          />
        </div>

        <p className="text-xl text-white mb-8">
          Welcome! Let's get you set up.
        </p>

        <Card
          className="w-full max-w-md bg-black/80 border border-white/10"
          shadow="sm"
        >
          <CardBody className="py-8 px-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <p className="text-white text-lg font-medium">What's your role?</p>
                <RadioGroup
                  value={role}
                  onValueChange={setRole}
                  classNames={{
                    wrapper: "gap-4"
                  }}
                >
                  <Radio 
                    value="broker"
                    classNames={{
                      label: "text-white",
                    }}
                  >
                    I'm a broker and will have agents under me
                  </Radio>
                  <Radio 
                    value="agent"
                    classNames={{
                      label: "text-white",
                    }}
                  >
                    I'm an agent and will connect with my broker
                  </Radio>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                isLoading={isLoading}
              >
                Continue
              </Button>

              {message && (
                <p className="text-red-500 text-center">
                  {message}
                </p>
              )}
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
} 