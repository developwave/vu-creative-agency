import Header from "@/components/header"
import Footer from "@/components/footer"
import AboutPageHero from "@/components/about-page-hero"
import AboutStory from "@/components/about-story"
import AboutTimeline from "@/components/about-timeline"
import AboutTeam from "@/components/about-team"
import AboutValues from "@/components/about-values"
import AboutCta from "@/components/about-cta"

export const metadata = {
  title: "About Us | VU Creative Agency",
  description: "Learn about VU Creative Agency - our story, team, values, and creative journey.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AboutPageHero />
      <AboutStory />
      <AboutTimeline />
      <AboutValues />
      <AboutTeam />
      <AboutCta />
      <Footer />
    </main>
  )
}
