"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import toast from "react-hot-toast"
import Link from "next/link"
import { resetPassword } from "@/app/actions/auth/forgotPassword"

export default function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      toast.error("Invalid reset link")
      router.push("/forgot-password")
    }
  }, [token, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const { password, confirmPassword } = formData

    if (!password) {
      toast.error("Password is required")
      return false
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return false
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !token) {
      return
    }

    setIsLoading(true)

    try {
      toast.loading("Resetting password...", { id: "reset-password" })

      const result = await resetPassword(token, formData.password)

      if (result.success) {
        toast.success(result.message, { id: "reset-password" })
        setIsSuccess(true)

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      } else {
        toast.error(result.message, { id: "reset-password" })
      }
    } catch (error) {
      console.error("Reset password error:", error)
      toast.error("An error occurred. Please try again.", { id: "reset-password" })
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Reset Link</h2>

          <p className="text-gray-600 mb-6">
            This password reset link is invalid or has expired. Please request a new one.
          </p>

          <Link href="/forgot-password">
            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
              Request New Reset Link
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  if (isSuccess) {
    return (
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Password Reset Successful!</h2>

          <p className="text-gray-600 mb-6">
            Your password has been successfully reset. You will be redirected to the login page in a few seconds.
          </p>

          <Link href="/login">
            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
              Go to Login
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              New Password
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                placeholder="Enter new password (min 6 characters)"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm New Password
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isLoading}
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="space-y-2">
              <div className="text-xs text-gray-600">Password strength:</div>
              <div className="flex space-x-1">
                <div
                  className={`h-1 w-1/4 rounded ${formData.password.length >= 6 ? "bg-green-500" : "bg-gray-200"}`}
                />
                <div
                  className={`h-1 w-1/4 rounded ${formData.password.length >= 8 ? "bg-green-500" : "bg-gray-200"}`}
                />
                <div
                  className={`h-1 w-1/4 rounded ${/[A-Z]/.test(formData.password) ? "bg-green-500" : "bg-gray-200"}`}
                />
                <div
                  className={`h-1 w-1/4 rounded ${/[0-9]/.test(formData.password) ? "bg-green-500" : "bg-gray-200"}`}
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Resetting Password...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Reset Password
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
