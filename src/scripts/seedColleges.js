import dbConnect, { collectionNameobj } from "../lib/dbConnect.js"

const colleges = [
  {
    name: "Harvard University",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 4.9,
    location: "Cambridge, MA",
    admissionDate: "December 1, 2024",
    tuition: "$54,000",
    studentsCount: 23000,
    category: "Ivy League",
    description:
      "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Established in 1636 and named for its first benefactor, clergyman John Harvard, Harvard is the oldest institution of higher education in the United States.",
    admissionProcess: {
      requirements: ["High School Diploma", "SAT/ACT Scores", "Letters of Recommendation", "Personal Essay"],
      deadlines: {
        earlyAction: "November 1, 2024",
        regularDecision: "January 1, 2025",
      },
      acceptanceRate: "3.4%",
    },
    events: [
      {
        name: "Harvard Science Fair 2024",
        date: "March 15, 2024",
        description: "Annual science fair showcasing student research projects",
      },
      {
        name: "Cultural Festival",
        date: "April 20, 2024",
        description: "Celebration of diverse cultures on campus",
      },
    ],
    research: {
      areas: ["Artificial Intelligence", "Medicine", "Climate Science", "Economics"],
      publications: 1250,
      labs: 45,
      description:
        "Harvard leads groundbreaking research across multiple disciplines with state-of-the-art facilities.",
    },
    sports: {
      teams: ["Basketball", "Swimming", "Tennis", "Rowing", "Football", "Soccer"],
      facilities: ["Olympic Pool", "Tennis Courts", "Rowing Center", "Fitness Center"],
      achievements: "Multiple NCAA championships and Olympic athletes",
    },
    researchCount: 1250,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Stanford University",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 4.8,
    location: "Stanford, CA",
    admissionDate: "January 15, 2025",
    tuition: "$56,000",
    studentsCount: 17000,
    category: "Private",
    description:
      "Stanford University is a private research university in Stanford, California. Known for its academic strength, wealth, and proximity to Silicon Valley.",
    admissionProcess: {
      requirements: ["High School Diploma", "SAT/ACT Scores", "Letters of Recommendation", "Personal Essay"],
      deadlines: {
        earlyAction: "November 1, 2024",
        regularDecision: "January 2, 2025",
      },
      acceptanceRate: "4.3%",
    },
    events: [
      {
        name: "Tech Summit",
        date: "March 20, 2024",
        description: "Annual technology and innovation summit",
      },
      {
        name: "Entrepreneurship Week",
        date: "April 15, 2024",
        description: "Week-long celebration of entrepreneurship and startups",
      },
    ],
    research: {
      areas: ["Computer Science", "Engineering", "Medicine", "Business"],
      publications: 980,
      labs: 38,
      description: "Stanford is renowned for its entrepreneurial spirit and cutting-edge research.",
    },
    sports: {
      teams: ["Football", "Baseball", "Soccer", "Track & Field", "Swimming", "Tennis"],
      facilities: ["Stanford Stadium", "Aquatic Center", "Golf Course", "Tennis Complex"],
      achievements: "Multiple Olympic medals and NCAA championships",
    },
    researchCount: 980,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "MIT",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 4.9,
    location: "Cambridge, MA",
    admissionDate: "November 30, 2024",
    tuition: "$55,000",
    studentsCount: 11500,
    category: "Private",
    description:
      "MIT is a private land-grant research university in Cambridge, Massachusetts. Known for its rigorous academics and cutting-edge research in science and technology.",
    admissionProcess: {
      requirements: [
        "High School Diploma",
        "SAT/ACT Scores",
        "Letters of Recommendation",
        "Personal Essay",
        "Math/Science Subject Tests",
      ],
      deadlines: {
        earlyAction: "November 1, 2024",
        regularDecision: "January 1, 2025",
      },
      acceptanceRate: "6.7%",
    },
    events: [
      {
        name: "Robotics Competition",
        date: "March 10, 2024",
        description: "Annual robotics competition showcasing student innovations",
      },
      {
        name: "Hackathon MIT",
        date: "April 5, 2024",
        description: "48-hour hackathon for students and professionals",
      },
    ],
    research: {
      areas: ["Artificial Intelligence", "Robotics", "Quantum Computing", "Biotechnology"],
      publications: 1100,
      labs: 42,
      description: "MIT is at the forefront of technological innovation and scientific discovery.",
    },
    sports: {
      teams: ["Sailing", "Crew", "Basketball", "Volleyball", "Soccer", "Track"],
      facilities: ["Sailing Pavilion", "Fitness Center", "Pool", "Tennis Courts"],
      achievements: "Strong tradition in sailing and crew sports",
    },
    researchCount: 1100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Yale University",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 4.8,
    location: "New Haven, CT",
    admissionDate: "January 2, 2025",
    tuition: "$59,000",
    studentsCount: 13500,
    category: "Ivy League",
    description:
      "Yale University is a private Ivy League research university in New Haven, Connecticut. Known for its outstanding undergraduate program and strong alumni network.",
    admissionProcess: {
      requirements: ["High School Diploma", "SAT/ACT Scores", "Letters of Recommendation", "Personal Essay"],
      deadlines: {
        earlyAction: "November 1, 2024",
        regularDecision: "January 2, 2025",
      },
      acceptanceRate: "4.6%",
    },
    events: [
      {
        name: "Yale Model UN",
        date: "March 25, 2024",
        description: "International Model United Nations conference",
      },
      {
        name: "Drama Festival",
        date: "April 10, 2024",
        description: "Annual celebration of theatrical arts",
      },
    ],
    research: {
      areas: ["Liberal Arts", "Medicine", "Law", "Drama"],
      publications: 890,
      labs: 35,
      description: "Yale combines rigorous academics with a strong liberal arts tradition.",
    },
    sports: {
      teams: ["Crew", "Football", "Hockey", "Lacrosse", "Basketball", "Soccer"],
      facilities: ["Yale Bowl", "Payne Whitney Gymnasium", "Crew House"],
      achievements: "Historic rivalry with Harvard and strong Ivy League presence",
    },
    researchCount: 890,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Princeton University",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 4.9,
    location: "Princeton, NJ",
    admissionDate: "January 1, 2025",
    tuition: "$57,000",
    studentsCount: 8500,
    category: "Ivy League",
    description:
      "Princeton University is a private Ivy League research university in Princeton, New Jersey. Known for its undergraduate focus and beautiful campus.",
    admissionProcess: {
      requirements: ["High School Diploma", "SAT/ACT Scores", "Letters of Recommendation", "Personal Essay"],
      deadlines: {
        earlyAction: "November 1, 2024",
        regularDecision: "January 1, 2025",
      },
      acceptanceRate: "5.8%",
    },
    events: [
      {
        name: "Princeton Model Congress",
        date: "March 30, 2024",
        description: "Student government simulation conference",
      },
      {
        name: "Art Festival",
        date: "April 25, 2024",
        description: "Celebration of visual and performing arts",
      },
    ],
    research: {
      areas: ["Physics", "Economics", "Public Policy", "Engineering"],
      publications: 750,
      labs: 30,
      description: "Princeton emphasizes undergraduate education while maintaining world-class research.",
    },
    sports: {
      teams: ["Basketball", "Swimming", "Tennis", "Golf", "Lacrosse", "Soccer"],
      facilities: ["Jadwin Gymnasium", "DeNunzio Pool", "Golf Course"],
      achievements: "Strong academic-athletic balance with Ivy League success",
    },
    researchCount: 750,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Columbia University",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 4.7,
    location: "New York, NY",
    admissionDate: "January 1, 2025",
    tuition: "$61,000",
    studentsCount: 31000,
    category: "Ivy League",
    description:
      "Columbia University is a private Ivy League research university in New York City. Known for its journalism school and urban campus.",
    admissionProcess: {
      requirements: ["High School Diploma", "SAT/ACT Scores", "Letters of Recommendation", "Personal Essay"],
      deadlines: {
        earlyAction: "November 1, 2024",
        regularDecision: "January 1, 2025",
      },
      acceptanceRate: "5.1%",
    },
    events: [
      {
        name: "Columbia Journalism Conference",
        date: "March 18, 2024",
        description: "Annual journalism and media conference",
      },
      {
        name: "Business Summit",
        date: "April 12, 2024",
        description: "Business and entrepreneurship summit",
      },
    ],
    research: {
      areas: ["Journalism", "Business", "Medicine", "International Affairs"],
      publications: 920,
      labs: 40,
      description: "Columbia leverages its NYC location for world-class research and opportunities.",
    },
    sports: {
      teams: ["Football", "Basketball", "Baseball", "Soccer", "Tennis", "Swimming"],
      facilities: ["Baker Athletics Complex", "Dodge Fitness Center"],
      achievements: "Ivy League athletics with NYC advantages",
    },
    researchCount: 920,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

async function seedColleges() {
  try {
    const collegeCollection = await dbConnect(collectionNameobj.colleges)

    // Clear existing data
    await collegeCollection.deleteMany({})

    // Insert new data
    const result = await collegeCollection.insertMany(colleges)

    console.log(`Successfully seeded ${result.insertedCount} colleges`)
    process.exit(0)
  } catch (error) {
    console.error("Error seeding colleges:", error)
    process.exit(1)
  }
}

seedColleges()
