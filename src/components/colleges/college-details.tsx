"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, Calendar, Users, DollarSign, BookOpen, Trophy, Building, ChevronLeft } from "lucide-react"
import Link from "next/link"

interface College {
  _id: string
  name: string
  image: string // Use this for the main image
  images: string[] // This array will no longer be used for display
  rating: number
  location: string
  admissionDate: string
  tuition: string
  studentsCount: number
  description: string
  admissionProcess: {
    requirements: string[]
    deadlines: {
      earlyAction: string
      regularDecision: string
    }
    acceptanceRate: string
  }
  events: Array<{
    name: string
    date: string
    description: string
  }>
  research: {
    areas: string[]
    publications: number
    labs: number
    description: string
  }
  sports: {
    teams: string[]
    facilities: string[]
    achievements: string
  }
}

export default function CollegeDetails({ college }: { college: College }) {
  // Removed useState for currentImageIndex as we're only showing one image

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/colleges" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Colleges
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Image Display */}
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={college.image || "/placeholder.svg?height=600&width=500"} // Use college.image
              alt={college.name}
              fill
              className="object-cover"
            />
          </div>

          {/* College Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{college.name}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{college.location}</span>
                </div>
              </div>
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
                <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                <span className="font-semibold">{college.rating}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">{college.description}</p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-semibold">Students</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{college.studentsCount.toLocaleString()}</p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-semibold">Tuition</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{college.tuition}</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="font-semibold">Admission</span>
                </div>
                <p className="text-sm font-medium text-purple-600">{college.admissionDate}</p>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <BookOpen className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="font-semibold">Research</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">{college.research.publications}+</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link href={`/admission?college=${college._id}`} className="flex-1">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Apply Now
                </Button>
              </Link>
              <Button variant="outline" className="flex-1 bg-transparent">
                Save College
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="admission" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="admission">Admission</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="sports">Sports</TabsTrigger>
        </TabsList>

        <TabsContent value="admission" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Admission Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {college.admissionProcess.requirements.map((req, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Early Action</h4>
                  <p className="text-blue-600 font-medium">{college.admissionProcess.deadlines.earlyAction}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Regular Decision</h4>
                  <p className="text-blue-600 font-medium">{college.admissionProcess.deadlines.regularDecision}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Acceptance Rate</h4>
                  <p className="text-green-600 font-medium">{college.admissionProcess.acceptanceRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {college.events.map((event, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                    <h3 className="font-semibold text-lg">{event.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{event.date}</p>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="research" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Research Excellence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700">{college.research.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{college.research.publications}</div>
                  <div className="text-gray-600">Publications</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{college.research.labs}</div>
                  <div className="text-gray-600">Research Labs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{college.research.areas.length}</div>
                  <div className="text-gray-600">Research Areas</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Research Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {college.research.areas.map((area, index) => (
                    <Badge key={index} variant="secondary">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sports" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Sports & Athletics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700">{college.sports.achievements}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Sports Teams</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {college.sports.teams.map((team, index) => (
                      <div key={index} className="flex items-center">
                        <Trophy className="h-4 w-4 text-yellow-600 mr-2" />
                        <span>{team}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Facilities</h3>
                  <div className="space-y-2">
                    {college.sports.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center">
                        <Building className="h-4 w-4 text-blue-600 mr-2" />
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
