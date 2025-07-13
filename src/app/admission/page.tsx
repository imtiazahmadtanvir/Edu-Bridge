"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Users, Calendar } from "lucide-react"
import Image from "next/image"
import { withAuth } from "@/components/withAuth"
import { getAllColleges } from "../actions/colleges/getColleges"
import AdmissionForm from "@/components/admission/AdmissionForm"

function AdmissionPage() {
  const [selectedCollege, setSelectedCollege] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [colleges, setColleges] = useState([])
  const [filteredColleges, setFilteredColleges] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchColleges() {
      try {
        const collegesData = await getAllColleges()
        setColleges(collegesData)
        setFilteredColleges(collegesData)
      } catch (error) {
        console.error("Error fetching colleges:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchColleges()
  }, [])

  useEffect(() => {
    const filtered = colleges.filter((college) => college.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredColleges(filtered)
  }, [searchTerm, colleges])

  if (selectedCollege) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <Button variant="outline" onClick={() => setSelectedCollege(null)} className="mb-6 bg-transparent">
            ← Back to Colleges
          </Button>
          <AdmissionForm college={selectedCollege} />
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading colleges...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            College <span className="text-blue-600">Admission</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your preferred college and start your admission process
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for colleges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg"
            />
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredColleges.map((college) => (
            <Card
              key={college._id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedCollege(college)}
            >
              <div className="relative">
                <Image
                  src={college.image || "/placeholder.svg?height=200&width=300"}
                  alt={college.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">{college.category}</Badge>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{college.rating}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{college.name}</h3>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{college.location}</span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{college.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-blue-600 mr-2" />
                    <span>{college.studentsCount?.toLocaleString() || "N/A"} students</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-purple-600 mr-2" />
                    <span className="text-xs">{college.admissionDate}</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredColleges.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No colleges found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default withAuth(AdmissionPage)
