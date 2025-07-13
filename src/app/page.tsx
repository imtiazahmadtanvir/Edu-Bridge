
import FloatingChatbot from "@/components/chatbot/floating-chatbot";
import FeaturedColleges from "@/components/landing/featured-colleges";
import Hero from "@/components/landing/hero";
import ResearchPapers from "@/components/landing/research-papers";
import Reviews from "@/components/landing/reviews";

export default function Home() {
  return (
    <div >
      
      <main>
        <Hero />
        <FeaturedColleges />
        <ResearchPapers />
        <Reviews />
      </main>
      <FloatingChatbot/>
   
    </div>
  );
}
