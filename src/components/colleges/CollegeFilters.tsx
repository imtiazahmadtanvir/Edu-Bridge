"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

export default function CollegeFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [tuitionRange, setTuitionRange] = useState([0, 100000])
  const [selectedStates, setSelectedStates] = useState<string[]>([])

  const categories = ["Ivy League", "Private", "Public", "Liberal Arts", "Technical"]
  const states = ["Massachusetts", "California", "New York", "Connecticut", "New Jersey"]

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleStateChange = (state: string) => {
    setSelectedStates((prev) => (prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setTuitionRange([0, 100000])
    setSelectedStates([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button variant="outline" size="sm" onClick={clearFilters} className="w-full bg-transparent">
            Clear All Filters
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="font-semibold mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label
                    htmlFor={category}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Tuition Range */}
          <div>
            <h3 className="font-semibold mb-3">Annual Tuition</h3>
            <div className="px-2">
              <Slider
                value={tuitionRange}
                onValueChange={setTuitionRange}
                max={100000}
                min={0}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>${tuitionRange[0].toLocaleString()}</span>
                <span>${tuitionRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <h3 className="font-semibold mb-3">State</h3>
            <div className="space-y-2">
              {states.map((state) => (
                <div key={state} className="flex items-center space-x-2">
                  <Checkbox
                    id={state}
                    checked={selectedStates.includes(state)}
                    onCheckedChange={() => handleStateChange(state)}
                  />
                  <label
                    htmlFor={state}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {state}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h3 className="font-semibold mb-3">Minimum Rating</h3>
            <div className="space-y-2">
              {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <label htmlFor={`rating-${rating}`} className="text-sm font-medium leading-none">
                    {rating}+ Stars
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {(selectedCategories.length > 0 || selectedStates.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category} ×
                </Badge>
              ))}
              {selectedStates.map((state) => (
                <Badge
                  key={state}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleStateChange(state)}
                >
                  {state} ×
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
