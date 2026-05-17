import Header from "@/components/header"
import HeroSlider from "@/components/hero-slider"
import ThreeWays from "@/components/three-ways"
import FabricBanner from "@/components/fabric-banner"
import CollectionShowcase from "@/components/collection-showcase"
import AccessoriesBanner from "@/components/accessories-banner"
import TrendingLooks from "@/components/trending-looks"
import NewArrivalBanner from "@/components/new-arrival-banner"
import FeaturedProducts from "@/components/featured-products"
import BestSellers from "@/components/best-sellers"
import SummerSaleBanner from "@/components/summer-sale-banner"
import InstagramGallery from "@/components/instagram-gallery"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSlider />
      <ThreeWays />
      <FabricBanner />
      <CollectionShowcase />
      <AccessoriesBanner />
      <TrendingLooks />
      <NewArrivalBanner />
      <FeaturedProducts />
      <BestSellers />
      <SummerSaleBanner />
      <InstagramGallery />
      <Newsletter />
      <Footer />
    </main>
  )
}
