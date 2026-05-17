import { products } from "@/lib/data"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CollectionContent from "@/components/collection-content"

export function generateStaticParams() {
  return [
    { slug: "new-arrivals" },
    { slug: "women" },
    { slug: "men" },
    { slug: "luxury-pret" },
    { slug: "accessories" },
    { slug: "sale" },
    { slug: "unstitched" },
    { slug: "ready-to-wear" },
    { slug: "formals" },
    { slug: "party-wear" },
    { slug: "festive" },
  ]
}

function getFilteredProducts(slug: string) {
  if (slug === "sale") {
    return products.filter(p => p.badge === "SALE" || p.originalPrice)
  } else if (slug === "new-arrivals") {
    return products.filter(p => p.isNew)
  } else if (slug === "women") {
    return products.filter(p => p.category !== "Men" && p.category !== "Accessories")
  } else if (["men", "luxury-pret", "accessories", "unstitched", "ready-to-wear"].includes(slug)) {
    return products.filter(p => p.category.toLowerCase().replace(/ /g, "-") === slug)
  }
  return products
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // Format slug for title
  const title = slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  
  // Get filtered products based on slug
  const filteredProducts = getFilteredProducts(slug)

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CollectionContent title={title} initialProducts={filteredProducts} />
      <Footer />
    </main>
  )
}
