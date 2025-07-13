/* eslint-disable @typescript-eslint/no-require-imports */
"use server"

import dbConnect, { collectionNameobj } from "@/lib/dbConnect"
import crypto from "crypto"

export async function requestPasswordReset(email) {
  try {
    if (!email) {
      return { success: false, message: "Email is required" }
    }

    const userCollection = await dbConnect(collectionNameobj.userCollection)
    const user = await userCollection.findOne({ email })

    if (!user) {
      // Don't reveal if user exists or not for security
      return {
        success: true,
        message: "If an account with this email exists, you will receive a password reset link.",
      }
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // Update user with reset token
    await userCollection.updateOne(
      { email },
      {
        $set: {
          resetToken,
          resetTokenExpiry,
          updatedAt: new Date(),
        },
      },
    )

    // In a real app, you would send an email here
    // For demo purposes, we'll just log the token
    console.log(`Password reset token for ${email}: ${resetToken}`)
    console.log(`Reset link: ${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`)

    return {
      success: true,
      message: "If an account with this email exists, you will receive a password reset link.",
      resetToken, // Remove this in production
    }
  } catch (error) {
    console.error("Password reset request error:", error)
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    }
  }
}

export async function resetPassword(token, newPassword) {
  try {
    if (!token || !newPassword) {
      return { success: false, message: "Token and new password are required" }
    }

    if (newPassword.length < 6) {
      return { success: false, message: "Password must be at least 6 characters long" }
    }

    const userCollection = await dbConnect(collectionNameobj.userCollection)

    // Find user with valid reset token
    const user = await userCollection.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    })

    if (!user) {
      return { success: false, message: "Invalid or expired reset token" }
    }

    // Hash new password
    const bcrypt = require("bcrypt")
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update user password and remove reset token
    await userCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
        $unset: {
          resetToken: "",
          resetTokenExpiry: "",
        },
      },
    )

    return {
      success: true,
      message: "Password has been reset successfully. You can now login with your new password.",
    }
  } catch (error) {
    console.error("Password reset error:", error)
    return {
      success: false,
      message: "An error occurred while resetting password. Please try again.",
    }
  }
}
