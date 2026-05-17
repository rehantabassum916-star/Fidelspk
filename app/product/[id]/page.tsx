import { notFound } from "next/navigation"
import { products } from "@/lib/data"
import Header from "@/components/header"
import ProductDetail from "@/components/product-detail"
import Footer from "@/components/footer"

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) return { title: "Product Not Found - FIDELS" }

  return {
    title: `${product.name} - FIDELS`,
    description: `Shop ${product.name} from FIDELS. Premium Pakistani fashion at PKR ${product.price.toLocaleString()}.`,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <main>
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </main>
  )
}
