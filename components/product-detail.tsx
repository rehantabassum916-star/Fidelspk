"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Minus, Plus, Share2, ChevronRight } from "lucide-react"
import type { Product } from "@/lib/data"
import { products } from "@/lib/data"
import ProductCard from "@/components/product-card"

const sizes = ["XS", "S", "M", "L", "XL"]
const colors = [
  { name: "Emerald", value: "#2d5a3f" },
  { name: "Ivory", value: "#f5f1e8" },
  { name: "Rose", value: "#c4788f" },
  { name: "Navy", value: "#1a2744" },
]

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState(colors[0].name)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const images = [product.image, product.hoverImage || product.image]
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="px-6 lg:px-12 py-4 flex items-center gap-2 text-xs text-muted-foreground font-[family-name:var(--font-body)] tracking-wider">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="#" className="hover:text-foreground transition-colors">{product.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Product Section */}
      <div className="px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`relative w-16 h-20 lg:w-20 lg:h-24 overflow-hidden border transition-colors ${
                    currentImage === idx ? "border-foreground" : "border-border"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative aspect-[3/4] overflow-hidden bg-secondary group cursor-zoom-in">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentImage]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              {product.badge && (
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] tracking-[0.15em] uppercase px-3 py-1 font-[family-name:var(--font-body)] z-10">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:pt-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-[family-name:var(--font-body)]">
              {product.category}
            </p>
            <h1 className="mt-3 text-2xl lg:text-3xl tracking-[0.1em] uppercase font-[family-name:var(--font-heading)] font-light text-foreground">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-4">
              <span className="text-lg font-[family-name:var(--font-body)] font-medium text-foreground">
                PKR {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through text-muted-foreground font-[family-name:var(--font-body)]">
                  PKR {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="mt-6 text-sm text-muted-foreground leading-relaxed font-[family-name:var(--font-body)]">
              A beautifully crafted piece featuring intricate embroidery and premium quality fabric.
              Perfect for both casual and formal occasions, this ensemble embodies the timeless elegance
              of Pakistani traditional dressing.
            </p>

            {/* Color Selector */}
            <div className="mt-8">
              <p className="text-xs tracking-[0.15em] uppercase mb-3 font-[family-name:var(--font-body)] font-medium text-foreground">
                Color: {selectedColor}
              </p>
              <div className="flex items-center gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? "border-foreground scale-110"
                        : "border-border"
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs tracking-[0.15em] uppercase font-[family-name:var(--font-body)] font-medium text-foreground">
                  Size: {selectedSize}
                </p>
                <button className="text-[10px] tracking-wider uppercase text-muted-foreground underline hover:text-foreground transition-colors font-[family-name:var(--font-body)]">
                  Size Guide
                </button>
              </div>
              <div className="flex items-center gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 flex items-center justify-center text-xs tracking-wider border transition-all font-[family-name:var(--font-body)] ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:border-foreground"
                    }`}
                    aria-label={`Select size ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <p className="text-xs tracking-[0.15em] uppercase mb-3 font-[family-name:var(--font-body)] font-medium text-foreground">
                Quantity
              </p>
              <div className="flex items-center border border-border w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-12 text-center text-sm font-[family-name:var(--font-body)] text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center gap-3">
              <button className="flex-1 bg-primary text-primary-foreground py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors duration-300 font-[family-name:var(--font-body)] font-medium">
                Add to Cart
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-12 h-12 flex items-center justify-center border border-border hover:border-foreground transition-colors"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted ? "fill-destructive text-destructive" : "text-foreground"
                  }`}
                />
              </button>
              <button
                className="w-12 h-12 flex items-center justify-center border border-border hover:border-foreground transition-colors"
                aria-label="Share product"
              >
                <Share2 className="w-4 h-4 text-foreground" />
              </button>
            </div>

            {/* Product Info Tabs */}
            <div className="mt-12 border-t border-border">
              <div className="flex items-center gap-8 border-b border-border">
                {["description", "details", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 text-xs tracking-[0.15em] uppercase font-[family-name:var(--font-body)] font-medium transition-colors ${
                      activeTab === tab
                        ? "text-foreground border-b-2 border-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="py-6">
                {activeTab === "description" && (
                  <p className="text-sm text-muted-foreground leading-relaxed font-[family-name:var(--font-body)]">
                    This exquisite piece from the FIDELS collection features handcrafted embroidery
                    on premium quality fabric. The three-piece suit includes a beautifully embroidered
                    shirt, matching trousers, and a luxurious chiffon dupatta. Each piece has been
                    carefully designed to blend traditional Pakistani aesthetics with contemporary
                    fashion sensibilities, making it perfect for any occasion.
                  </p>
                )}
                {activeTab === "details" && (
                  <ul className="flex flex-col gap-3 text-sm text-muted-foreground font-[family-name:var(--font-body)]">
                    <li>Fabric: Premium Lawn / Chiffon</li>
                    <li>Pieces: 3 Piece Suit</li>
                    <li>Shirt: Embroidered Front & Back</li>
                    <li>Dupatta: Printed Chiffon</li>
                    <li>Trouser: Dyed Cambric</li>
                    <li>Care: Dry Clean Recommended</li>
                  </ul>
                )}
                {activeTab === "reviews" && (
                  <div>
                    <p className="text-sm text-muted-foreground font-[family-name:var(--font-body)]">
                      No reviews yet. Be the first to review this product.
                    </p>
                    <button className="mt-4 text-xs tracking-[0.15em] uppercase text-foreground underline hover:text-muted-foreground transition-colors font-[family-name:var(--font-body)]">
                      Write a Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20 lg:mt-28">
          <h2 className="text-center text-2xl lg:text-3xl tracking-[0.2em] uppercase font-[family-name:var(--font-heading)] font-light text-foreground mb-12">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
