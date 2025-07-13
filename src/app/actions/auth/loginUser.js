"use server"

import dbConnect, { collectionNameobj } from "@/lib/dbConnect"
import bcrypt from "bcrypt"

export const loginUSer = async (payload) => {
  try {
    const { email, password } = payload

    const userCollection = await dbConnect(collectionNameobj.userCollection)
    const user = await userCollection.findOne({ email })

    if (!user) return null

    const isPasswordOk = await bcrypt.compare(password, user.password)
    if (!isPasswordOk) return null

    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role || "user",
      image: user.image || null,
      createdAt: user.createdAt,
    }
  } catch (error) {
    console.error("Login error:", error)
    return null
  }
}
