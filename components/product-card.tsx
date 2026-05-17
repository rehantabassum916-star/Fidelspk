"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingBag } from "lucide-react"
import type { Product } from "@/lib/data"

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-secondary">
        <Image
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] tracking-[0.15em] uppercase px-3 py-1 font-[family-name:var(--font-body)]">
            {product.badge}
          </span>
        )}
        {product.isNew && !product.badge && (
          <span className="absolute top-3 left-3 bg-foreground text-background text-[10px] tracking-[0.15em] uppercase px-3 py-1 font-[family-name:var(--font-body)]">
            NEW
          </span>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          className="absolute bottom-4 left-4 right-4 flex items-center gap-2"
        >
          <button
            className="flex-1 bg-background/95 backdrop-blur-sm text-foreground text-[10px] tracking-[0.15em] uppercase py-3 flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-300 font-[family-name:var(--font-body)] font-medium"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </motion.div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsWishlisted(!isWishlisted)
          }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-background/80 backdrop-blur-sm hover:bg-background transition-colors duration-300"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isWishlisted ? "fill-destructive text-destructive" : "text-foreground"
            }`}
          />
        </button>
      </Link>

      {/* Info */}
      <div className="mt-4">
        <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1 font-[family-name:var(--font-body)]">
          {product.category}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm tracking-wider text-foreground hover:text-muted-foreground transition-colors line-clamp-1 font-[family-name:var(--font-body)] font-medium">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-[family-name:var(--font-body)] font-medium text-foreground">
            PKR {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs line-through text-muted-foreground font-[family-name:var(--font-body)]">
              PKR {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
