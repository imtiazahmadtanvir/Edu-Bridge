# EduBridge - College Booking Platform

EduBridge is a comprehensive platform designed to connect students with their dream colleges. It allows users to explore various universities, manage their applications, and share their experiences through reviews.

## Features

-   **College Exploration**: Browse a wide range of colleges with detailed information on their programs, admission processes, research areas, and sports.
-   **Application Management**: Easily apply to colleges and track the status of your applications.
-   **Student Reviews**: Read and write reviews about colleges to help other students make informed decisions.
-   **User Authentication**: Secure login and registration with email/password and social login options (Google, GitHub).
-   **Responsive Design**: A user-friendly interface that adapts to various screen sizes.
-   **Animated Hero Section**: A dynamic and engaging hero section on the landing page.

## Technologies Used

-   **Next.js**: React framework for building server-side rendered and static web applications.
-   **React**: A JavaScript library for building user interfaces.
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **shadcn/ui**: Reusable UI components built with Radix UI and Tailwind CSS.
-   **MongoDB**: A NoSQL database for storing application data.
-   **NextAuth.js**: Authentication library for Next.js applications.
-   **Lucide React**: A collection of beautiful and customizable open-source icons.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

-   Node.js (v18.x or higher)
-   npm or yarn
-   MongoDB Atlas account (or local MongoDB instance)
-   Google and GitHub OAuth credentials (optional, for social login)

### Installation

1.  **Clone the repository:**
    \`\`\`bash
    git clone <your-repository-url>

    \`\`\`

2.  **Install dependencies:**
    \`\`\`bash
    npm install
    # or
    yarn install
    \`\`\`

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add the following environment variables:

    \`\`\`env
    NEXT_PUBLIC_MONGODB_URI=your_mongodb_connection_string
    DB_NAME=your_database_name
    NEXTAUTH_URL=http://localhost:3000
    NEXT_PUBLIC_API_URL=http://localhost:3000
    NEXTAUTH_SECRET=a_long_random_string_for_nextauth_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GITHUB_ID=your_github_client_id
    GITHUB_SECRET=your_github_client_secret
    \`\`\`
    -   Replace `your_mongodb_connection_string` with your MongoDB Atlas connection URI.
    -   Replace `your_database_name` with the name of your database.
    -   Generate a strong random string for `NEXTAUTH_SECRET`.
    -   Obtain `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_ID`, and `GITHUB_SECRET` from their respective developer consoles if you plan to use social login.

4.  **Seed the database (optional but recommended):**
    This project includes a script to seed initial college data into your MongoDB database.
    \`\`\`bash
    node scripts/seedColleges.js
    \`\`\`

### Running the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

-   **Home Page (`/`)**: Explore the main landing page with a hero section, college search, research papers, and student reviews.
-   **Colleges (`/colleges`)**: Browse all available colleges, apply filters, and view detailed information for each college.
-   **Admission (`/admission`)**: Select a college and fill out the admission application form.
-   **My College (`/my-college`)**: View your submitted applications and write reviews for colleges you've applied to.
-   **Login (`/login`)**: Sign in to your account.
-   **Register (`/register`)**: Create a new account.
-   **Forgot Password (`/forgot-password`)**: Request a password reset link.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you find any bugs or have suggestions for improvements.

## License

This project is open-source and available under the MIT License.
