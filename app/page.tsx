"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"; // Use ShadCN input
import { Button } from "@/components/ui/button"; // Use ShadCN button
import Link from "next/link";
import { Toaster, toast } from "sonner";
import {
  signUpUser,
  updateUser,
  siginWithUsername,
} from "@/Utils/supabaseService";
export default function LandingPage() {
  const router = useRouter();
  // noah@gmail.com
  // 5eNUDl7
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loadingStatus, setStatus] = React.useState<boolean>(false);
  const [rememberPassword, setRememberPassword] =
    React.useState<boolean>(false);
  React.useEffect(() => {
    const storedUsername = localStorage.getItem("rememberedUsername");
    const storedPassword = localStorage.getItem("rememberedPassword");
    if (storedUsername && storedPassword) {
      console.log(storedUsername, storedPassword);
      setUsername(storedUsername);
      setPassword(storedPassword);
      setRememberPassword(true);
      setTimeout(() => {
        tapLogin(storedUsername, storedPassword);
      }, 1000);
    }
  }, []);
  const tapLogin = (us1: string, ps2: string) => {
    const service = async () => {
      try {
        let payload = {
          email: us1,
          password: ps2,
        };
        if (rememberPassword) {
          localStorage.setItem("rememberedUsername", us1);
          localStorage.setItem("rememberedPassword", ps2);
        } else {
          localStorage.removeItem("rememberedUsername");
          localStorage.removeItem("rememberedPassword");
        }

        let result = await siginWithUsername(payload);
        console.log("result.userLevel.userType", result);
        return Number(result.user_level.userType);
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    if (us1 == "" || ps2 === "") {
      toast.error("Empty credentials");
    } else {
      setStatus(true);
      toast.promise(service(), {
        loading: "Logging in...",
        success: (result) => {
          console.log("result", result);
          if ((result != null && result === 3) || result === 0) {
            router.push("/dashboard");
            return "Login successful!";
          } else if (result === 1 || result === 2) {
            setStatus(false);
            return "Unauthorize Access!";
          } else {
            setStatus(false);
            throw new Error("Invalid credentials");
          }
        },
        error: "Invalid credentials",
      });
    }
  };
  const isOpacity = () => {
    if (loadingStatus) {
      return "space-y-4 opacity-30";
    } else {
      return "space-y-4 opacity-100";
    }
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div
        className="flex-1 bg-blue-500 text-gray-950 flex flex-col justify-end p-8"
        style={{
          backgroundImage:
            "url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkwNC1udW5ueS0wMTItZy14XzEuanBn.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="space-y-4 text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#3A3A3A]">
            Streamline Your Storage, Optimize Your Operations
          </h1>
          <p className="text-sm">Efficient Storage, Seamless Operations.</p>
        </div>
        {/*<div className="flex justify-center">
          <div className="w-40 h-28 bg-blue-300 rounded-md shadow-md transform rotate-12" />
          <div className="w-40 h-28 bg-blue-200 rounded-md shadow-md -ml-12 transform -rotate-6" />
        </div>*/}
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Log In</h2>
          {/* <form action="/dashboard" > */}
          <div className={isOpacity()}>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700">
                Email Address
              </label>
              <Input
                id="email"
                disabled={loadingStatus}
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
                disabled={loadingStatus}
                placeholder="Enter your password"
                className="mt-1 w-full"
                onChange={(e: any) => setPassword(e.nativeEvent.target.value)}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  disabled={loadingStatus}
                  type="checkbox"
                  id="remember"
                  onChange={(e) => setRememberPassword(e.target.checked)}
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
            disabled={loadingStatus}
            onClick={() => tapLogin(username, password)}
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
      <Toaster />
    </div>
  );
}
