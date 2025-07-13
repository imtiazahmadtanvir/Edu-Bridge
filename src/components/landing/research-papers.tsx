import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Download, Eye, Calendar, User } from "lucide-react"

export default function ResearchPapers() {
  const researchPapers = [
    {
      id: 1,
      title: "Artificial Intelligence in Healthcare: A Comprehensive Review",
      authors: ["Dr. Sarah Johnson", "Prof. Michael Chen"],
      college: "Harvard Medical School",
      publishedDate: "March 2024",
      category: "Healthcare",
      abstract:
        "This paper explores the revolutionary impact of AI technologies in modern healthcare systems, examining current applications and future possibilities.",
      downloads: 2340,
      views: 15600,
      link: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Quantum Computing: Breaking the Barriers of Classical Computation",
      authors: ["Dr. Emily Rodriguez", "Prof. David Kim"],
      college: "MIT",
      publishedDate: "February 2024",
      category: "Technology",
      abstract:
        "An in-depth analysis of quantum computing principles and their potential to solve complex computational problems that are intractable for classical computers.",
      downloads: 1890,
      views: 12400,
      link: "#",
      featured: true,
    },
    {
      id: 3,
      title: "Climate Change Mitigation Through Renewable Energy Systems",
      authors: ["Prof. Lisa Wang", "Dr. James Thompson"],
      college: "Stanford University",
      publishedDate: "January 2024",
      category: "Environment",
      abstract:
        "This research presents innovative approaches to combat climate change through the implementation of advanced renewable energy technologies.",
      downloads: 3120,
      views: 18900,
      link: "#",
      featured: false,
    },
    {
      id: 4,
      title: "Machine Learning Applications in Financial Markets",
      authors: ["Dr. Robert Brown", "Prof. Anna Martinez"],
      college: "Yale University",
      publishedDate: "April 2024",
      category: "Finance",
      abstract:
        "Exploring how machine learning algorithms are transforming financial markets through predictive analytics and automated trading systems.",
      downloads: 1560,
      views: 9800,
      link: "#",
      featured: false,
    },
    {
      id: 5,
      title: "Sustainable Urban Development: Smart City Solutions",
      authors: ["Prof. Kevin Lee", "Dr. Maria Garcia"],
      college: "Princeton University",
      publishedDate: "March 2024",
      category: "Urban Planning",
      abstract:
        "A comprehensive study on implementing smart city technologies to create sustainable and efficient urban environments for the future.",
      downloads: 2780,
      views: 14200,
      link: "#",
      featured: true,
    },
    {
      id: 6,
      title: "Biotechnology Innovations in Drug Discovery",
      authors: ["Dr. Jennifer Wilson", "Prof. Thomas Anderson"],
      college: "Columbia University",
      publishedDate: "February 2024",
      category: "Biotechnology",
      abstract:
        "This paper examines cutting-edge biotechnology methods that are accelerating the drug discovery process and improving therapeutic outcomes.",
      downloads: 2100,
      views: 11700,
      link: "#",
      featured: false,
    },
  ]

  const categories = ["All", "Healthcare", "Technology", "Environment", "Finance", "Urban Planning", "Biotechnology"]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Research Papers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover groundbreaking research from leading universities and contribute to the advancement of knowledge
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Research Papers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {researchPapers.map((paper) => (
            <Card
              key={paper.id}
              className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${paper.featured ? "ring-2 ring-blue-200" : ""}`}
            >
              <CardContent className="p-6">
                {paper.featured && (
                  <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600">Featured Research</Badge>
                )}

                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary" className="capitalize">
                    {paper.category}
                  </Badge>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {paper.publishedDate}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{paper.title}</h3>

                <div className="flex items-center mb-3">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <div className="text-sm text-gray-600">{paper.authors.join(", ")}</div>
                </div>

                <div className="text-sm text-blue-600 font-medium mb-4">{paper.college}</div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3">{paper.abstract}</p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {paper.views.toLocaleString()} views
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {paper.downloads.toLocaleString()} downloads
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    Read Abstract
                  </Button>
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Paper
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="px-8 bg-transparent">
            View All Research Papers
          </Button>
        </div>
      </div>
    </section>
  )
}
