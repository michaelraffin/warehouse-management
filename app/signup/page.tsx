"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function SignUpForm() {
  return (
    <div className="relative  flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Card className="">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Create an FJ Cola account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to sign up
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="" />
            </div>
            {/* <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="" />
            </div> */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            {/* <span className=" text-blue-600 hover:underline text-sm">
              Forget password ?
            </span> */}
          </CardContent>
          <CardFooter className="flex rounded-lg flex-col">
            <Button onClick={()=>alert('ws')} className="w-full rounded-full"   >Sign Up</Button>
          </CardFooter>
          {/* <div className="relative mb-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div> */}
          {/* <div className="grid grid-cols-2 gap-6 m-2">
            <Button variant="outline">
              
              Github
            </Button>
            <Button variant="outline">
              
              Twitter
            </Button>
          </div> */}
          {/* <p className="mt-2 text-xs text-center text-gray-700 mb-2">
            {" "}
            Already have an account?{" "}
            <span className=" text-blue-600 hover:underline">Sign In</span>
          </p> */}
        </Card>
      </div>
    </div>
  )
}