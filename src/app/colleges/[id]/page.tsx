import { notFound } from "next/navigation"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import { getCollegeById } from "@/app/actions/colleges/getColleges"
import CollegeDetails from "@/components/colleges/college-details"

export default async function CollegeDetailPage({ params }) {
  const college = await getCollegeById(params.id)

  if (!college) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        }
      >
        <CollegeDetails college={college} />
      </Suspense>
    </div>
  )
}
