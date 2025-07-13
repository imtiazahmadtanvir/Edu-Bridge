import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Award } from "lucide-react"
import Link from "next/link"
// Removed Image import as per request
// import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      {/* Animated background overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-30 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-blue-400 to-blue-600 opacity-30 animate-pulse-fast animation-delay-2000"></div>
      </div>
      <div className="absolute inset-0 bg-black/20 z-10"></div> {/* Dark overlay for text readability */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Find Your Perfect
                <span className="block text-yellow-400">College Match</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                Discover top colleges, explore admission opportunities, and book your future with our comprehensive
                college booking platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/colleges">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  Explore Colleges
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/admission">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Start Application
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <BookOpen className="h-8 w-8 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-blue-200">Colleges</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-blue-200">Students</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Award className="h-8 w-8 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-blue-200">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Removed image section */}
          <div className="hidden lg:block">
            {/* This space can be used for other content or left empty for a cleaner look */}
          </div>
        </div>
      </div>
    </section>
  )
}
