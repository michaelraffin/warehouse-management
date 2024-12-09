"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"; // Use ShadCN input
import { Button } from "@/components/ui/button"; // Use ShadCN button
import Link from "next/link";
import {
  signUpUser,
  updateUser,
  siginWithUsername,
} from "@/Utils/supabaseService";
export default function LandingPage() {
  const [username, setUsername] = React.useState<string>("");
  const router = useRouter();
  const [password, setPassword] = React.useState<string>("");

  const tapLogin = () => {
    const service = async () => {
      try {
        let payload = {
          email: "agent@gmail.com",
          password: "Password1234",
        };
        return await siginWithUsername(payload);
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    service().then((result: any) => {
      if (result != null) {
        router.push("/dashboard");
      } else {
        alert("Invalid Password");
      }
    });
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div
        className="flex-1 bg-blue-500 text-gray-950 flex flex-col justify-end p-8"
        style={{
          backgroundImage:
            "url('https://cdn.dribbble.com/users/1207383/screenshots/5077105/media/304d2029bee462dd87db1080e0a87d37.png?resize=1600x1200&vertical=center')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="space-y-4 text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold">
            Streamline Your Storage, Optimize Your Operations
          </h1>
          <p className="text-lg">Efficient Storage, Seamless Operations</p>
        </div>
        <div className="flex justify-center">
          <div className="w-40 h-28 bg-blue-300 rounded-md shadow-md transform rotate-12" />
          <div className="w-40 h-28 bg-blue-200 rounded-md shadow-md -ml-12 transform -rotate-6" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Log In</h2>
          {/* <form action="/dashboard" > */}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full"
                onChange={(e: any) => setUsername(e.nativeEvent.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="mt-1 w-full"
                onChange={(e: any) => setPassword(e.nativeEvent.target.value)}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-gray-700 select-none"
                >
                  Remember information
                </label>
              </div>
              <Link href="/forgot-password" className="text-blue-600">
                Forgot password?
              </Link>
            </div>
          </div>
          <Button
            onClick={() => tapLogin()}
            className="w-full bg-blue-500 mt-6 rounded-full"
          >
            Login
          </Button>
          {/* </form> */}
          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
