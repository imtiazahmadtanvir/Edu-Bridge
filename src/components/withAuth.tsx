"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === "loading") return // Still loading

      if (!session) {
        router.push("/login")
        return
      }
    }, [session, status, router])

    if (status === "loading") {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      )
    }

    if (!session) {
      return null
    }

    return <Component {...props} />
  }
}
