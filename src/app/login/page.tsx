'use client'

import { useState, useEffect } from 'react'
import { Card, CardBody, Input, Button } from '@nextui-org/react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.replace('/dashboard')
      }
    }
    checkSession()
  }, [router, supabase.auth])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        setMessage('Invalid email or password. Please try again.')
        return
      }

      if (data?.user) {
        setMessage('Login successful! Redirecting...')
        router.push('/dashboard')
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.')
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

        <p className="text-2xl font-semibold text-white mb-8">
          Realtor Tools That Work For You
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
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-lg py-6"
                isLoading={isLoading}
              >
                Sign In
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