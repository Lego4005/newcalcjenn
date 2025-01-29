'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardBody, Input, Button } from "@heroui/react"
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (!role) {
      setMessage('Please select a role')
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            role: role // This will be available in user_metadata
          }
        }
      })

      if (error) {
        setMessage(error.message)
        return
      }

      if (data?.user) {
        setMessage('Registration successful! Please check your email for verification.')
        router.push('/login?message=check-email')
      }
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
          <Image
            src="https://rocatitle.com/wp-content/uploads/2022/03/PNG-01_main_600px_wide_2.png"
            alt="Roca Title"
            width={600}
            height={180}
            priority
            className="object-contain w-full h-full"
          />
        </div>

        <p className="text-2xl font-semibold text-white mb-8">
          Create Your Account
        </p>

        <Card
          className="w-full max-w-md bg-black/80 border border-white/10"
          shadow="sm"
        >
          <CardBody className="py-8 px-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                classNames={{
                  label: "text-white font-medium",
                  input: "text-black !bg-white",
                  inputWrapper: "!bg-white",
                  innerWrapper: "!bg-white",
                  base: "group",
                  mainWrapper: "!bg-white",
                  clearButton: "text-black/70"
                }}
                size="lg"
              />

              <Input
                label="Password"
                placeholder="Create a password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                classNames={{
                  label: "text-white font-medium",
                  input: "text-black !bg-white",
                  inputWrapper: "!bg-white",
                  innerWrapper: "!bg-white",
                  base: "group",
                  mainWrapper: "!bg-white",
                  clearButton: "text-black/70"
                }}
                size="lg"
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                classNames={{
                  label: "text-white font-medium",
                  input: "text-black !bg-white",
                  inputWrapper: "!bg-white",
                  innerWrapper: "!bg-white",
                  base: "group",
                  mainWrapper: "!bg-white",
                  clearButton: "text-black/70"
                }}
                size="lg"
              />

              <div className="space-y-3">
                <label htmlFor="role-group" className="text-white font-medium block">Select your role</label>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    className={`w-full py-3 ${
                      role === 'agent'
                        ? 'bg-red-600 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    aria-labelledby="role-group"
                    onPress={() => setRole('agent')}
                    variant={role === 'agent' ? 'solid' : 'ghost'}
                  >
                    Real Estate Agent
                  </Button>
                  <Button
                    type="button"
                    className={`w-full py-3 ${
                      role === 'broker'
                        ? 'bg-red-600 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    aria-labelledby="role-group"
                    onPress={() => setRole('broker')}
                    variant={role === 'broker' ? 'solid' : 'ghost'}
                  >
                    Broker
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-lg py-6"
                isLoading={isLoading}
              >
                Create Account
              </Button>

              {message && (
                <p className={`text-center text-lg font-medium ${message.includes('successful') ? 'text-green-400' : 'text-red-400'}`}>
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