"use client"

import { motion } from "framer-motion"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/data"

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.isNew).slice(0, 4)

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-[family-name:var(--font-body)]">
          Curated for You
        </p>
        <h2 className="text-2xl lg:text-3xl tracking-[0.2em] uppercase font-[family-name:var(--font-heading)] font-light text-foreground">
          New Arrivals
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
