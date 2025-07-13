"use server"

import dbConnect, { collectionNameobj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"

export async function createReview(reviewData) {
  try {
    const reviewCollection = await dbConnect(collectionNameobj.reviews)

    const review = {
      ...reviewData,
      collegeId: new ObjectId(reviewData.collegeId),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await reviewCollection.insertOne(review)

    return {
      success: true,
      message: "Review submitted successfully!",
      reviewId: result.insertedId.toString(),
    }
  } catch (error) {
    console.error("Create review error:", error)
    return {
      success: false,
      message: "Failed to submit review. Please try again.",
    }
  }
}

export async function getAllReviews() {
  try {
    const reviewCollection = await dbConnect(collectionNameobj.reviews)
    const reviews = await reviewCollection.find({}).sort({ createdAt: -1 }).toArray()

    return reviews.map((review) => ({
      ...review,
      _id: review._id.toString(),
      collegeId: review.collegeId.toString(),
    }))
  } catch (error) {
    console.error("Get reviews error:", error)
    return []
  }
}

export async function getReviewsByCollege(collegeId) {
  try {
    const reviewCollection = await dbConnect(collectionNameobj.reviews)
    const reviews = await reviewCollection
      .find({
        collegeId: new ObjectId(collegeId),
      })
      .sort({ createdAt: -1 })
      .toArray()

    return reviews.map((review) => ({
      ...review,
      _id: review._id.toString(),
      collegeId: review.collegeId.toString(),
    }))
  } catch (error) {
    console.error("Get reviews by college error:", error)
    return []
  }
}
