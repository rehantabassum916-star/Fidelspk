import { products, categories } from "@/lib/data"
import ProductCard from "@/components/product-card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return [
    { slug: "new-arrivals" },
    { slug: "women" },
    { slug: "men" },
    { slug: "luxury-pret" },
    { slug: "accessories" },
    { slug: "sale" },
    { slug: "unstitched" },
    { slug: "ready-to-wear" }
  ]
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  
  // Format slug for title
  const title = slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")

  // Filter products based on slug
  let filteredProducts = products

  if (slug === "sale") {
    filteredProducts = products.filter(p => p.badge === "SALE" || p.originalPrice)
  } else if (slug === "new-arrivals") {
    filteredProducts = products.filter(p => p.isNew)
  } else if (slug === "women") {
    // For "women", show all non-men categories
    filteredProducts = products.filter(p => p.category !== "Men" && p.category !== "Accessories")
  } else if (slug === "men" || slug === "luxury-pret" || slug === "accessories" || slug === "unstitched" || slug === "ready-to-wear") {
    // Simple match by category string ignoring case
    filteredProducts = products.filter(p => p.category.toLowerCase().replace(/ /g, "-") === slug)
  }

  return (
    <main>
      <Header />
      <div className="pt-24 pb-16 px-6 lg:px-12 min-h-[60vh] bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-5xl tracking-[0.2em] uppercase font-[family-name:var(--font-heading)] font-semibold mb-4">
              {title}
            </h1>
            <p className="text-muted-foreground text-sm tracking-wider font-[family-name:var(--font-body)]">
              Explore our exclusive {title.toLowerCase()} collection.
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <p className="tracking-wider uppercase font-[family-name:var(--font-body)]">
                No products found in this collection.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
