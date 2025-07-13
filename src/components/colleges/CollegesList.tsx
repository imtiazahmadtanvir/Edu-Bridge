"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Calendar, BookOpen, Trophy, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CollegesList({ colleges: initialColleges }) {
  const [colleges, setColleges] = useState(initialColleges)
  const [sortBy, setSortBy] = useState("rating")

  useEffect(() => {
    const sortedColleges = [...initialColleges].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "rating":
          return b.rating - a.rating
        case "tuition":
          return Number.parseInt(a.tuition.replace(/[$,]/g, "")) - Number.parseInt(b.tuition.replace(/[$,]/g, ""))
        case "students":
          return b.studentsCount - a.studentsCount
        default:
          return 0
      }
    })
    setColleges(sortedColleges)
  }, [sortBy, initialColleges])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">All Colleges ({colleges.length})</h2>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="rating">Sort by Rating</option>
          <option value="name">Sort by Name</option>
          <option value="tuition">Sort by Tuition</option>
          <option value="students">Sort by Students</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {colleges.map((college) => (
          <Card
            key={college._id}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative">
              <Image
                src={college.image || "/placeholder.svg?height=250&width=400"}
                alt={college.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">{college.category}</Badge>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium">{college.rating}</span>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{college.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{college.location}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{college.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-blue-600 mr-2" />
                  <span>{college.studentsCount?.toLocaleString() || "N/A"} students</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 text-green-600 mr-2" />
                  <span>{college.researchCount || 0}+ research papers</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-purple-600 mr-2" />
                  <span className="text-xs">{college.admissionDate}</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 text-yellow-600 mr-2" />
                  <span className="text-xs">{college.tuition}/year</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-gray-900 mb-2">Sports & Activities</div>
                <div className="flex flex-wrap gap-1">
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

              <Link href={`/colleges/${college._id}`}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
