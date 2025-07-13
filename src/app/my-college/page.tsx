/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, User, Mail, Phone, GraduationCap } from "lucide-react"
// import Image from "next/image"
import { withAuth } from "@/components/withAuth"
import { getUserApplications } from "@/app/actions/applications/createApplication"
import ReviewForm from "@/components/my-college/ReviewForm"

function MyCollegePage() {
  const { data: session } = useSession()
  const [applications, setApplications] = useState([])
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchApplications() {
      if (session?.user) {
        try {
          const userApplications = await getUserApplications(session.user.id || session.user.email)
          setApplications(userApplications)
          if (userApplications.length > 0) {
            setSelectedApplication(userApplications[0])
          }
        } catch (error) {
          console.error("Error fetching applications:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchApplications()
  }, [session])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your applications...</p>
        </div>
      </div>
    )
  }

  if (applications.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <GraduationCap className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No College Applications</h1>
            <p className="text-lg text-gray-600 mb-8">
              You haven't applied to any colleges yet. Start your journey by exploring our colleges.
            </p>
            <Button
              onClick={() => (window.location.href = "/admission")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Apply to Colleges
            </Button>
          </div>
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
            My <span className="text-blue-600">College</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage your college applications and share your experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Applications Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {applications.map((application) => (
                  <div
                    key={application._id}
                    onClick={() => setSelectedApplication(application)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedApplication?._id === application._id
                        ? "bg-blue-100 border-2 border-blue-500"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <h4 className="font-semibold text-sm">{application.collegeName}</h4>
                    <p className="text-xs text-gray-600">{application.subject}</p>
                    <Badge variant={application.status === "accepted" ? "default" : "secondary"} className="mt-2">
                      {application.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedApplication && (
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Application Details</TabsTrigger>
                  <TabsTrigger value="review">Write Review</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-6">
                  <div className="space-y-6">
                    {/* College Info */}
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          {/* <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                            <Image
                              src={selectedApplication.collegeDetails?.image || "/placeholder.svg?height=96&width=96"}
                              alt={selectedApplication.collegeName}
                              fill
                              className="object-cover"
                            />
                          </div> */}
                          <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedApplication.collegeName}</h2>
                            <p className="text-lg text-blue-600 font-medium mb-2">{selectedApplication.subject}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                Applied:{" "}
                                {new Date(
                                  selectedApplication.appliedAt || selectedApplication.createdAt,
                                ).toLocaleDateString()}
                              </div>
                              <Badge variant={selectedApplication.status === "accepted" ? "default" : "secondary"}>
                                {selectedApplication.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Application Details */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Application Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <User className="h-5 w-5 text-blue-600" />
                              <div>
                                <p className="text-sm text-gray-500">Candidate Name</p>
                                <p className="font-medium">{selectedApplication.candidateName}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Mail className="h-5 w-5 text-green-600" />
                              <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{selectedApplication.candidateEmail}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Phone className="h-5 w-5 text-purple-600" />
                              <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{selectedApplication.candidatePhone}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Calendar className="h-5 w-5 text-orange-600" />
                              <div>
                                <p className="text-sm text-gray-500">Date of Birth</p>
                                <p className="font-medium">{selectedApplication.dateOfBirth}</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <MapPin className="h-5 w-5 text-red-600 mt-1" />
                              <div>
                                <p className="text-sm text-gray-500">Address</p>
                                <p className="font-medium">{selectedApplication.address}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="review" className="mt-6">
                  <ReviewForm college={selectedApplication} />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(MyCollegePage)
