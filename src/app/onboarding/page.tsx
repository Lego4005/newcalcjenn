'use client'

import { useState } from 'react'
import { Card, CardBody, Button, RadioGroup, Radio } from "@heroui/react"
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function OnboardingPage() {
  const [role, setRole] = useState('agent')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        setMessage('Error getting user information. Please try logging in again.')
        return
      }

      if (!user) {
        setMessage('No user found. Please try logging in again.')
        return
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email,
          role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })

      if (profileError) {
        setMessage(profileError.message)
        return
      }

      router.push('/dashboard')
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message)
      } else {
        setMessage('An unexpected error occurred')
      }
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
          Welcome! Let&apos;s get you set up.
        </p>

        <Card
          className="w-full max-w-md bg-black/80 border border-white/10"
          shadow="sm"
        >
          <CardBody className="py-8 px-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <p className="text-white text-lg font-medium">What&apos;s your role?</p>
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
                    I&apos;m a broker and will have agents under me
                  </Radio>
                  <Radio 
                    value="agent"
                    classNames={{
                      label: "text-white",
                    }}
                  >
                    I&apos;m an agent and will connect with my broker
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