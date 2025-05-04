'use client'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Button
} from "@heroui/react";
import { Github, Mail } from 'lucide-react'; // Using Lucide icons

export default function LoginPageViewer() {
  return (
    <div className="flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center"> 
          {/* Optional Logo/Icon */}
          {/* <Mail className="mx-auto h-8 w-8 text-primary mb-2" /> */}
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>Welcome back! Please sign in to continue.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-y-4">
          {/* Social Buttons Example */}
          <div className="grid grid-cols-2 gap-x-4">
            <Button variant="flat" type="button" startContent={<Github className="w-4 h-4" />}>
              GitHub
            </Button>
            {/* Add Google Button - Requires specific setup/styling */}
            <Button variant="flat" type="button" startContent={<Mail className="w-4 h-4" />}>
              Google
            </Button>
          </div>
          
          {/* Divider */}
          <div className="flex items-center gap-x-3 text-sm text-foreground-500 before:h-px before:flex-1 before:bg-divider after:h-px after:flex-1 after:bg-divider">
            or
          </div>
          
          {/* Email/Password Form */}
          <form className="space-y-4">
             <div className="space-y-1.5">
              <Label>Email address</Label>
              <Input type="email" placeholder="you@example.com" required />
            </div>
            
            <div className="space-y-1.5">
               <div className="flex items-center justify-between">
                 <Label>Password</Label>
                 <Button as={Link} href="#" variant="light" color="primary" size="sm" className="p-0 h-auto text-xs underline">
                    Forgot password?
                 </Button>
               </div>
              <Input type="password" placeholder="Enter password" required />
            </div>
             {/* Remember Me Checkbox - Example */}
            {/* <Checkbox size="sm">Remember me</Checkbox> */}
             <Button color="primary" type="submit" className="w-full">Sign in</Button>
          </form>
        </CardContent>
        
        <CardFooter className="justify-center">
           <Button as={Link} href="#" variant="light" size="sm" className="text-xs">
            Don&apos;t have an account? Sign up
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 