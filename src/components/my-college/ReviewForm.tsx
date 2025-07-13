"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, MessageSquare } from "lucide-react"
import toast from "react-hot-toast"
import { createReview } from "@/app/actions/reviews/createReview"

export default function ReviewForm({ college }) {
  const { data: session } = useSession()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (rating === 0) {
      toast.error("Please select a rating")
      return
    }

    if (!review.trim()) {
      toast.error("Please write a review")
      return
    }

    setIsLoading(true)

    try {
      const reviewData = {
        collegeId: college.collegeId,
        collegeName: college.collegeName,
        userId: session?.user?.id || session?.user?.email,
        userName: session?.user?.name,
        userEmail: session?.user?.email,
        rating,
        review: review.trim(),
      }

      const result = await createReview(reviewData)

      if (result.success) {
        toast.success(result.message)
        setRating(0)
        setReview("")
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Review submission error:", error)
      toast.error("Failed to submit review. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Write a Review for {college.collegeName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Rating *</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-colors"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-3 text-sm text-gray-600">{rating > 0 && `${rating} out of 5 stars`}</span>
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <label htmlFor="review" className="block text-sm font-medium text-gray-700">
              Your Review *
            </label>
            <Textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with this college..."
              rows={6}
              className="resize-none"
              required
            />
            <p className="text-xs text-gray-500">{review.length}/500 characters</p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || rating === 0 || !review.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
