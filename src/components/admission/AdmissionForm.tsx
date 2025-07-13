"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, User, Mail, Phone, MapPin, Upload, GraduationCap } from "lucide-react"
import Image from "next/image"
import toast from "react-hot-toast"
import { createApplication } from "@/app/actions/applications/createApplication"

export default function AdmissionForm({ college }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    candidateName: session?.user?.name || "",
    subject: "",
    candidateEmail: session?.user?.email || "",
    candidatePhone: "",
    address: "",
    dateOfBirth: "",
    image: null,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate required fields
      const requiredFields = ["candidateName", "subject", "candidateEmail", "candidatePhone", "address", "dateOfBirth"]
      const missingFields = requiredFields.filter((field) => !formData[field])

      if (missingFields.length > 0) {
        toast.error("Please fill in all required fields")
        setIsLoading(false)
        return
      }

      // Create application object
      const applicationData = {
        ...formData,
        collegeId: college._id,
        collegeName: college.name,
        userId: session?.user?.id || session?.user?.email,
        appliedAt: new Date().toISOString(),
      }

      const result = await createApplication(applicationData)

      if (result.success) {
        toast.success(result.message)
        setTimeout(() => {
          router.push("/my-college")
        }, 1500)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Application submission error:", error)
      toast.error("Failed to submit application. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* College Info Header */}
      <Card className="mb-8 overflow-hidden">
        <div className="relative h-48">
          <Image
            src={college.image || "/placeholder.svg?height=192&width=800"}
            alt={college.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{college.name}</h1>
            <p className="text-lg opacity-90">Application Form</p>
          </div>
        </div>
      </Card>

      {/* Application Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <GraduationCap className="h-6 w-6 mr-3 text-blue-600" />
            Admission Application
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Candidate Name */}
              <div className="space-y-2">
                <Label htmlFor="candidateName" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Candidate Name *
                </Label>
                <Input
                  id="candidateName"
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="flex items-center">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Subject/Major *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Enter your preferred subject"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="candidateEmail" className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Address *
                </Label>
                <Input
                  id="candidateEmail"
                  name="candidateEmail"
                  type="email"
                  value={formData.candidateEmail}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="candidatePhone" className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Phone Number *
                </Label>
                <Input
                  id="candidatePhone"
                  name="candidatePhone"
                  type="tel"
                  value={formData.candidatePhone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date of Birth *
                </Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image" className="flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Profile Image
                </Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Address *
              </Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your complete address"
                rows={3}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-3"
              >
                {isLoading ? "Submitting..." : "Submit Application"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
                className="px-8 bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
