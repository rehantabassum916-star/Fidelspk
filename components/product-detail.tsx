"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Minus, Plus, Share2, ChevronRight, ChevronLeft, Truck, RotateCcw, Shield } from "lucide-react"
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

  const images = [product.image, product.hoverImage || product.image, product.image]
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4)

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <nav className="px-4 sm:px-6 lg:px-10 py-3 sm:py-4 flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground font-[family-name:var(--font-body)] tracking-wider overflow-x-auto">
        <Link href="/" className="hover:text-foreground transition-colors whitespace-nowrap">Home</Link>
        <ChevronRight className="w-3 h-3 flex-shrink-0" />
        <Link href={`/collections/${product.category.toLowerCase().replace(/ /g, "-")}`} className="hover:text-foreground transition-colors whitespace-nowrap">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3 flex-shrink-0" />
        <span className="text-foreground truncate max-w-[150px] sm:max-w-none">{product.name}</span>
      </nav>

      {/* Product Section */}
      <div className="px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Gallery */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-secondary group">
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
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              {product.badge && (
                <span className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-primary text-primary-foreground text-[9px] sm:text-[10px] tracking-[0.15em] uppercase px-2 sm:px-3 py-1 font-[family-name:var(--font-body)] z-10">
                  {product.badge}
                </span>
              )}

              {/* Mobile Image Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Image Dots */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentImage === idx ? "bg-foreground w-4" : "bg-foreground/40"
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails - Desktop */}
            <div className="hidden sm:flex gap-2 sm:gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`relative w-16 h-20 sm:w-20 sm:h-24 lg:w-24 lg:h-28 overflow-hidden border-2 transition-colors ${
                    currentImage === idx ? "border-foreground" : "border-transparent hover:border-border"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="100px" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-[family-name:var(--font-body)]">
              {product.category}
            </p>
            <h1 className="mt-2 sm:mt-3 text-xl sm:text-2xl lg:text-3xl tracking-[0.08em] uppercase font-[family-name:var(--font-heading)] font-light text-foreground leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-3 sm:mt-4">
              <span className="text-lg sm:text-xl font-[family-name:var(--font-body)] font-medium text-foreground">
                PKR {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through text-muted-foreground font-[family-name:var(--font-body)]">
                  PKR {product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 font-[family-name:var(--font-body)]">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <p className="mt-4 sm:mt-5 text-sm text-muted-foreground leading-relaxed font-[family-name:var(--font-body)]">
              A beautifully crafted piece featuring intricate embroidery and premium quality fabric.
              Perfect for both casual and formal occasions.
            </p>

            {/* Color Selector */}
            <div className="mt-6 sm:mt-8">
              <p className="text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-2.5 sm:mb-3 font-[family-name:var(--font-body)] font-medium text-foreground">
                Color: <span className="text-muted-foreground font-normal">{selectedColor}</span>
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? "border-foreground scale-110"
                        : "border-border hover:border-muted-foreground"
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-6 sm:mt-8">
              <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                <p className="text-[10px] sm:text-xs tracking-[0.15em] uppercase font-[family-name:var(--font-body)] font-medium text-foreground">
                  Size: <span className="text-muted-foreground font-normal">{selectedSize}</span>
                </p>
                <button className="text-[10px] sm:text-xs tracking-wider uppercase text-muted-foreground underline hover:text-foreground transition-colors font-[family-name:var(--font-body)]">
                  Size Guide
                </button>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 sm:w-12 sm:h-11 flex items-center justify-center text-xs tracking-wider border transition-all font-[family-name:var(--font-body)] ${
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
            <div className="mt-6 sm:mt-8">
              <p className="text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-2.5 sm:mb-3 font-[family-name:var(--font-body)] font-medium text-foreground">
                Quantity
              </p>
              <div className="flex items-center border border-border w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 sm:w-12 text-center text-sm font-[family-name:var(--font-body)] text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 sm:mt-8 flex items-center gap-2 sm:gap-3">
              <button className="flex-1 bg-primary text-primary-foreground py-3 sm:py-3.5 text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors duration-300 font-[family-name:var(--font-body)] font-medium">
                Add to Cart
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center border border-border hover:border-foreground transition-colors"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    isWishlisted ? "fill-destructive text-destructive" : "text-foreground"
                  }`}
                />
              </button>
              <button
                className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center border border-border hover:border-foreground transition-colors"
                aria-label="Share product"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-border">
              <div className="flex flex-col items-center text-center gap-1.5 sm:gap-2">
                <Truck className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-muted-foreground font-[family-name:var(--font-body)]">
                  Free Shipping
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 sm:gap-2">
                <RotateCcw className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-muted-foreground font-[family-name:var(--font-body)]">
                  Easy Returns
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 sm:gap-2">
                <Shield className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-muted-foreground font-[family-name:var(--font-body)]">
                  Secure Pay
                </span>
              </div>
            </div>

            {/* Product Info Tabs */}
            <div className="mt-6 sm:mt-8 border-t border-border">
              <div className="flex items-center gap-4 sm:gap-6 border-b border-border overflow-x-auto">
                {["description", "details", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 sm:py-4 text-[10px] sm:text-xs tracking-[0.15em] uppercase font-[family-name:var(--font-body)] font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab
                        ? "text-foreground border-b-2 border-foreground -mb-[1px]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="py-4 sm:py-6">
                {activeTab === "description" && (
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-[family-name:var(--font-body)]">
                    This exquisite piece from the FIDELS collection features handcrafted embroidery
                    on premium quality fabric. The three-piece suit includes a beautifully embroidered
                    shirt, matching trousers, and a luxurious chiffon dupatta.
                  </p>
                )}
                {activeTab === "details" && (
                  <ul className="flex flex-col gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground font-[family-name:var(--font-body)]">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                      Fabric: Premium Lawn / Chiffon
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                      Pieces: 3 Piece Suit
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                      Shirt: Embroidered Front & Back
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                      Care: Dry Clean Recommended
                    </li>
                  </ul>
                )}
                {activeTab === "reviews" && (
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-[family-name:var(--font-body)]">
                      No reviews yet. Be the first to review this product.
                    </p>
                    <button className="mt-3 sm:mt-4 text-[10px] sm:text-xs tracking-[0.15em] uppercase text-foreground underline hover:no-underline transition-all font-[family-name:var(--font-body)]">
                      Write a Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <h2 className="text-center text-xl sm:text-2xl lg:text-3xl tracking-[0.15em] uppercase font-[family-name:var(--font-heading)] font-light text-foreground mb-8 sm:mb-10 lg:mb-12">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
