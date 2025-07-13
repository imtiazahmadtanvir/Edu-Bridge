"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, ThumbsUp, MessageCircle } from "lucide-react"
import { getAllReviews } from "@/app/actions/reviews/createReview"

export default function Reviews() {
  const [selectedCollege, setSelectedCollege] = useState("all")
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReviews() {
      try {
        const reviewsData = await getAllReviews()

        // Mock reviews for demonstration
        const mockReviews = [
          {
            id: 1,
            name: "Sarah Johnson",
            avatar: "/placeholder.svg?height=50&width=50",
            college: "Harvard University",
            program: "Computer Science",
            rating: 5,
            date: "2 weeks ago",
            review:
              "Harvard exceeded all my expectations! The faculty is world-class, the research opportunities are incredible, and the campus community is so supportive.",
            likes: 24,
            replies: 5,
            verified: true,
          },
          {
            id: 2,
            name: "Michael Chen",
            avatar: "/placeholder.svg?height=50&width=50",
            college: "MIT",
            program: "Mechanical Engineering",
            rating: 5,
            date: "1 month ago",
            review:
              "MIT's hands-on approach to learning is phenomenal. The labs are state-of-the-art, and professors encourage innovation.",
            likes: 31,
            replies: 8,
            verified: true,
          },
        ]

        // Combine database reviews with mock reviews
        const allReviews = [
          ...mockReviews,
          ...reviewsData.map((review) => ({
            id: review._id,
            name: review.userName,
            avatar: "/placeholder.svg?height=50&width=50",
            college: review.collegeName,
            program: "Student",
            rating: review.rating,
            date: new Date(review.createdAt).toLocaleDateString(),
            review: review.review,
            likes: 0,
            replies: 0,
            verified: true,
          })),
        ]

        setReviews(allReviews)
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const colleges = [
    "all",
    "Harvard University",
    "MIT",
    "Stanford University",
    "Yale University",
    "Princeton University",
    "Columbia University",
  ]

  const filteredReviews =
    selectedCollege === "all" ? reviews : reviews.filter((review) => review.college === selectedCollege)

  const averageRating =
    filteredReviews.length > 0
      ? filteredReviews.reduce((sum, review) => sum + review.rating, 0) / filteredReviews.length
      : 0

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Reviews & Feedback</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from real students about their college experiences and make informed decisions about your future
          </p>
        </div>

        {/* College Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {colleges.map((college) => (
            <button
              key={college}
              onClick={() => setSelectedCollege(college)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCollege === college
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {college === "all" ? "All Colleges" : college}
            </button>
          ))}
        </div>

        {/* Rating Summary */}
        {filteredReviews.length > 0 && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-4 bg-gray-50 rounded-lg px-6 py-4">
              <div className="flex items-center">{renderStars(Math.round(averageRating))}</div>
              <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
              <div className="text-gray-600">Based on {filteredReviews.length} reviews</div>
            </div>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    {/* Replaced AvatarImage with AvatarFallback */}
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          Verified Student
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {review.program} • {review.college}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">{renderStars(review.rating)}</div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>

                <div className="relative mb-4">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-200" />
                  <p className="text-gray-700 leading-relaxed pl-6">{review.review}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">{review.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{review.replies} replies</span>
                    </button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReviews.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No reviews found for the selected college.</p>
          </div>
        )}

        <div className="text-center">
          <Button
            size="lg"
            className="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            onClick={() => (window.location.href = "/my-college")}
          >
            Write a Review
          </Button>
        </div>
      </div>
    </section>
  )
}
