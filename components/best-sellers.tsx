"use client"

import { motion } from "framer-motion"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/data"

export default function BestSellers() {
  const bestsellers = products.filter((p) => p.isBestseller || p.badge === "SALE").slice(0, 4)

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-12 bg-secondary/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-[family-name:var(--font-body)]">
          Most Loved
        </p>
        <h2 className="text-2xl lg:text-3xl tracking-[0.2em] uppercase font-[family-name:var(--font-heading)] font-light text-foreground">
          Best Sellers
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {bestsellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
