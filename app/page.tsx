import Header from "@/components/header"
import HeroSlider from "@/components/hero-slider"
import ThreeWays from "@/components/three-ways"
import CategoryTabs from "@/components/category-tabs"
import CollectionShowcase from "@/components/collection-showcase"
import TrendingLooks from "@/components/trending-looks"
import FeaturedProducts from "@/components/featured-products"
import BestSellers from "@/components/best-sellers"
import InstagramGallery from "@/components/instagram-gallery"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="relative">
      <Header transparent />
      <HeroSlider />
      <ThreeWays />
      <CategoryTabs />
      <CollectionShowcase />
      <TrendingLooks />
      <FeaturedProducts />
      <BestSellers />
      <InstagramGallery />
      <Newsletter />
      <Footer />
    </main>
  )
}
