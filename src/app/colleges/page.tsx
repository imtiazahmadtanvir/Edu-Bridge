import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import { getAllColleges } from "@/app/actions/colleges/getColleges"
import CollegeFilters from "@/components/colleges/CollegeFilters"
import CollegesList from "@/components/colleges/CollegesList"

export default async function CollegesPage() {
  const colleges = await getAllColleges()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Our <span className="text-blue-600">Colleges</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover top-rated institutions and find the perfect match for your academic journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <CollegeFilters />
          </div>

          {/* Colleges List */}
          <div className="lg:col-span-3">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              }
            >
              <CollegesList colleges={colleges} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
