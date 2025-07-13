"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Calendar, BookOpen, Trophy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getAllColleges } from "@/app/actions/colleges/getColleges"

export default function FeaturedColleges() {
  const [featuredColleges, setFeaturedColleges] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchColleges() {
      try {
        const colleges = await getAllColleges()
        // Get top 3 colleges by rating
        const topColleges = colleges.sort((a, b) => b.rating - a.rating).slice(0, 3)
        setFeaturedColleges(topColleges)
      } catch (error) {
        console.error("Error fetching colleges:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchColleges()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading featured colleges...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Colleges</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover top-rated institutions known for their academic excellence, research contributions, and vibrant
            campus life
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredColleges.map((college) => (
            <Card
              key={college._id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
            >
              <div className="relative">
                <Image
                  src={college.image || "/placeholder.svg?height=250&width=400"}
                  alt={college.name}
                  width={400}
                  height={250}
                  className="w-full h-64 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">{college.category}</Badge>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{college.rating}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{college.name}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{college.location}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Admission Date</div>
                      <div className="text-sm text-gray-600">{college.admissionDate}</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <BookOpen className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Research Focus</div>
                      <div className="text-sm text-gray-600 line-clamp-2">
                        {college.research?.description || college.description}
                      </div>
                      <div className="text-xs text-blue-600 font-medium mt-1">
                        {college.researchCount || 0}+ Research Papers
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Trophy className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Sports & Activities</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {college.sports?.teams?.slice(0, 3).map((sport, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {sport}
                          </Badge>
                        )) || <span className="text-xs text-gray-500">No sports data</span>}
                        {college.sports?.teams?.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{college.sports.teams.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="mb-3">
                    <div className="font-medium text-gray-900 mb-2">Upcoming Events</div>
                    <div className="space-y-1">
                      {college.events?.slice(0, 2).map((event, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                          {event.name}
                        </div>
                      )) || <div className="text-sm text-gray-500">No upcoming events</div>}
                    </div>
                  </div>
                </div>

                <Link href={`/colleges/${college._id}`}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/colleges">
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              View All Colleges
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
