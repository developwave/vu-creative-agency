import Header from "@/components/header"
import Footer from "@/components/footer"
import GalleryHero from "@/components/gallery-hero"
import GalleryGrid from "@/components/gallery-grid"
import GalleryStats from "@/components/gallery-stats"
import GalleryCta from "@/components/gallery-cta"

export const metadata = {
  title: "Gallery | VU Creative Agency",
  description: "Explore our portfolio of web designs, brand identities, graphics, and creative projects.",
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-background dark">
      <Header />
      <GalleryHero />
      <GalleryGrid />
      <GalleryStats />
      <GalleryCta />
      <Footer />
    </main>
  )
}
