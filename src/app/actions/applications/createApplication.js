"use server"

import dbConnect, { collectionNameobj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"

export async function createApplication(applicationData) {
  try {
    const applicationCollection = await dbConnect(collectionNameobj.applications)

    const application = {
      ...applicationData,
      collegeId: new ObjectId(applicationData.collegeId),
      userId: applicationData.userId,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await applicationCollection.insertOne(application)

    return {
      success: true,
      message: "Application submitted successfully!",
      applicationId: result.insertedId.toString(),
    }
  } catch (error) {
    console.error("Create application error:", error)
    return {
      success: false,
      message: "Failed to submit application. Please try again.",
    }
  }
}

export async function getUserApplications(userId) {
  try {
    const applicationCollection = await dbConnect(collectionNameobj.applications)
    const applications = await applicationCollection.find({ userId }).toArray()

    return applications.map((app) => ({
      ...app,
      _id: app._id.toString(),
      collegeId: app.collegeId.toString(),
    }))
  } catch (error) {
    console.error("Get user applications error:", error)
    return []
  }
}
