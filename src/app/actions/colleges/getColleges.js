"use server"

import dbConnect, { collectionNameobj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"

export async function getAllColleges() {
  try {
    const collegeCollection = await dbConnect(collectionNameobj.colleges)
    const colleges = await collegeCollection.find({}).toArray()

    return colleges.map((college) => ({
      ...college,
      _id: college._id.toString(),
    }))
  } catch (error) {
    console.error("Get colleges error:", error)
    return []
  }
}

export async function getCollegeById(id) {
  try {
    const collegeCollection = await dbConnect(collectionNameobj.colleges)
    const college = await collegeCollection.findOne({ _id: new ObjectId(id) })

    if (!college) return null

    return {
      ...college,
      _id: college._id.toString(),
    }
  } catch (error) {
    console.error("Get college by ID error:", error)
    return null
  }
}

export async function searchColleges(searchTerm) {
  try {
    const collegeCollection = await dbConnect(collectionNameobj.colleges)
    const colleges = await collegeCollection
      .find({
        name: { $regex: searchTerm, $options: "i" },
      })
      .toArray()

    return colleges.map((college) => ({
      ...college,
      _id: college._id.toString(),
    }))
  } catch (error) {
    console.error("Search colleges error:", error)
    return []
  }
}
