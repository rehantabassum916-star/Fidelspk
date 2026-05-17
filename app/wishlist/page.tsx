"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, X, ShoppingBag } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { products } from "@/lib/data"

// Mock wishlist items for design purposes
const initialWishlistItems = [products[1], products[4], products[5], products[7]]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

  const removeItem = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-xs tracking-wider font-[family-name:var(--font-body)]">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li className="text-foreground uppercase">Wishlist</li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-10">
            <Heart className="w-6 h-6" />
            <h1 className="text-3xl sm:text-4xl tracking-[0.15em] uppercase font-[family-name:var(--font-heading)] font-semibold">
              My Wishlist
            </h1>
            <span className="text-muted-foreground font-[family-name:var(--font-body)]">
              ({wishlistItems.length} items)
            </span>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
              <h2 className="text-xl tracking-wider uppercase font-[family-name:var(--font-heading)] mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground font-[family-name:var(--font-body)] mb-8">
                Save your favorite items to your wishlist and shop them later.
              </p>
              <Link
                href="/collections/women"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-body)] hover:bg-primary/90 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="group relative">
                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                    aria-label="Remove from wishlist"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Product Image */}
                  <Link href={`/product/${item.id}`} className="block">
                    <div className="relative aspect-[3/4] bg-accent overflow-hidden mb-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {item.badge && (
                        <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-2 py-1 text-[10px] tracking-wider uppercase font-[family-name:var(--font-body)]">
                          {item.badge}
                        </span>
                      )}
                      {item.isNew && !item.badge && (
                        <span className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 text-[10px] tracking-wider uppercase font-[family-name:var(--font-body)]">
                          New
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="text-sm tracking-wider font-[family-name:var(--font-body)] line-clamp-2 hover:text-muted-foreground transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                      {item.category}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium font-[family-name:var(--font-body)]">
                        Rs. {item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through font-[family-name:var(--font-body)]">
                          Rs. {item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button className="w-full mt-3 flex items-center justify-center gap-2 border border-foreground py-2.5 text-[10px] tracking-[0.15em] uppercase font-[family-name:var(--font-body)] hover:bg-foreground hover:text-background transition-colors">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
