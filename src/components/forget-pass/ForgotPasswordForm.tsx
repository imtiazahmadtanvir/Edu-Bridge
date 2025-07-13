/* eslint-disable react/no-unescaped-entities */
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Loader2, CheckCircle, ArrowLeft } from "lucide-react"
import toast from "react-hot-toast"
import Link from "next/link"
import { requestPasswordReset } from "@/app/actions/auth/forgotPassword"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [resetToken, setResetToken] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      toast.error("Please enter your email address")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    try {
      toast.loading("Sending reset link...", { id: "forgot-password" })

      const result = await requestPasswordReset(email.trim())

      if (result.success) {
        toast.success(result.message, { id: "forgot-password" })
        setIsSubmitted(true)
        if (result.resetToken) {
          setResetToken(result.resetToken) // For demo purposes only
        }
      } else {
        toast.error(result.message, { id: "forgot-password" })
      }
    } catch (error) {
      console.error("Forgot password error:", error)
      toast.error("An error occurred. Please try again.", { id: "forgot-password" })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            We've sent a password reset link to <strong>{email}</strong>. Please check your email and click the link to
            reset your password.
          </p>

          {/* Demo Reset Token Display - Remove in production */}
          {resetToken && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800 mb-2">
                <strong>Demo Mode:</strong> Use this link to reset your password:
              </p>
              <Link
                href={`/reset-password?token=${resetToken}`}
                className="text-sm text-blue-600 hover:text-blue-700 underline break-all"
              >
                Reset Password Link
              </Link>
            </div>
          )}

          <div className="space-y-4">
            <p className="text-sm text-gray-500">Didn't receive the email? Check your spam folder or try again.</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false)
                  setEmail("")
                  setResetToken("")
                }}
                className="flex-1 bg-transparent"
              >
                Try Different Email
              </Button>

              <Link href="/login" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                placeholder="Enter your email address"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">We'll send a password reset link to this email address</p>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Sending Reset Link...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Send Reset Link
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
