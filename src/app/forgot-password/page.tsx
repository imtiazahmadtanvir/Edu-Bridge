/* eslint-disable react/no-unescaped-entities */
import ForgotPasswordForm from "@/components/forget-pass/ForgotPasswordForm"
import Image from "next/image"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)]">
          {/* Left Section - Image */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
            <div className="relative w-full max-w-md">
              <Image
                src="/assets/images/login/login.svg?height=500&width=500"
                width={500}
                height={500}
                alt="Forgot Password Illustration"
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-md">
              {/* Mobile Image */}
              <div className="lg:hidden text-center mb-8">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="/assets/images/login/login.svg?height=128&width=128"
                    fill
                    alt="Forgot Password Illustration"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Form Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Don't worry! Enter your email and we'll send you a reset link
                </p>
              </div>

              {/* Forgot Password Form */}
              <ForgotPasswordForm />

              {/* Footer Links */}
              <div className="mt-8 text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <Link href="/login" className="font-semibold text-orange-600 hover:text-orange-500 transition-colors">
                    Sign in here
                  </Link>
                </p>
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-orange-600 hover:text-orange-500 transition-colors"
                  >
                    Create one here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
