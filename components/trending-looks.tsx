"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const trending = [
  { name: "Perfect Pair", image: "/images/product-1.jpg", href: "#" },
  { name: "Embroidery Hub", image: "/images/product-4.jpg", href: "#" },
  { name: "Pattern Stories", image: "/images/product-6.jpg", href: "#" },
  { name: "Classic Cuts", image: "/images/product-8.jpg", href: "#" },
]

export default function TrendingLooks() {
  return (
    <section className="py-16 lg:py-24 px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl lg:text-3xl tracking-[0.2em] uppercase font-[family-name:var(--font-heading)] font-light text-foreground">
          Summer Trending Looks
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {trending.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <Link href={item.href} className="group block">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/15 transition-colors duration-500" />
              </div>
              <h3 className="mt-4 text-center text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-body)] font-medium text-foreground">
                {item.name}
              </h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
