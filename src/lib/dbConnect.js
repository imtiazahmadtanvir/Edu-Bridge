import { MongoClient, ServerApiVersion } from "mongodb"

export const collectionNameobj = {
  servicesCollection: "test_service",
  userCollection: "test_user",
  bookingCollection: "test_booking",
  users: "users",
  colleges: "colleges",
  applications: "applications",
  reviews: "reviews",
  events: "events",
}

const uri = process.env.NEXT_PUBLIC_MONGODB_URI
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

export default async function dbConnect(collectionName) {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect()
    }
    return client.db(process.env.DB_NAME).collection(collectionName)
  } catch (error) {
    console.error("Database connection error:", error)
    throw error
  }
}
