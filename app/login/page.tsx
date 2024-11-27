import { Input } from "@/components/ui/input"; // Use ShadCN input
import { Button } from "@/components/ui/button"; // Use ShadCN button
import Link from "next/link";
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="flex-1 bg-blue-500 text-white flex flex-col justify-end p-8">
        <div className="space-y-4 text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold">
            Say goodbye to financial stress with the help of Paysphere.
          </h1>
          <p className="text-lg">
            Take control of your finances with Paysphere the quickest and
            simplest way.
          </p>
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
          <form>
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
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-700"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1 w-full"
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
            <Button className="w-full bg-blue-500 mt-6 rounded-full">
              Login
            </Button>
          </form>
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
