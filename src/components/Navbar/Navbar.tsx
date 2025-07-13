"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, GraduationCap, User, LogOut } from "lucide-react"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Colleges", href: "/colleges" },
    { name: "Admission", href: "/admission" },
    { name: "My College", href: "/my-college" },
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">EduBridge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-3">
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="max-w-32 truncate">{session.user?.name}</span>
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => signOut()} className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t">
                {session ? (
                  <div className="space-y-2">
                    <Link href="/profile">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                        <User className="h-4 w-4 mr-2" />
                        {session.user?.name}
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => signOut()}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login">
                      <Button variant="ghost" className="w-full" onClick={() => setIsOpen(false)}>
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setIsOpen(false)}>
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
