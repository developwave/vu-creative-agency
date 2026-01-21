import Header from "@/components/header"
import Footer from "@/components/footer"
import ServicesPageHero from "@/components/services-page-hero"
import ServicesGrid from "@/components/services-grid"
import ServicesProcess from "@/components/services-process"
import ServicesPricing from "@/components/services-pricing"
import ServicesFaq from "@/components/services-faq"
import ServicesCta from "@/components/services-cta"

export const metadata = {
  title: "Services | VU Creative Agency",
  description: "Explore our creative services - graphic design, web design, branding, UI/UX and more.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ServicesPageHero />
      <ServicesGrid />
      <ServicesProcess />
      <ServicesPricing />
      <ServicesFaq />
      <ServicesCta />
      <Footer />
    </main>
  )
}
