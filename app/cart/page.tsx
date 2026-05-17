"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { products } from "@/lib/data"

// Mock cart items for design purposes
const initialCartItems = [
  { ...products[0], quantity: 2, size: "M" },
  { ...products[3], quantity: 1, size: "S" },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: string, change: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const shipping = subtotal > 5000 ? 0 : 250
  const total = subtotal + shipping

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
              <li className="text-foreground uppercase">Shopping Cart</li>
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-4xl tracking-[0.15em] uppercase font-[family-name:var(--font-heading)] font-semibold mb-10">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
              <h2 className="text-xl tracking-wider uppercase font-[family-name:var(--font-heading)] mb-4">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground font-[family-name:var(--font-body)] mb-8">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
              <Link
                href="/collections/women"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-body)] hover:bg-primary/90 transition-colors"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="border-b border-border pb-4 mb-6 hidden sm:grid grid-cols-12 gap-4">
                  <div className="col-span-6 text-xs tracking-wider uppercase text-muted-foreground font-[family-name:var(--font-body)]">
                    Product
                  </div>
                  <div className="col-span-2 text-xs tracking-wider uppercase text-muted-foreground font-[family-name:var(--font-body)] text-center">
                    Quantity
                  </div>
                  <div className="col-span-2 text-xs tracking-wider uppercase text-muted-foreground font-[family-name:var(--font-body)] text-right">
                    Price
                  </div>
                  <div className="col-span-2 text-xs tracking-wider uppercase text-muted-foreground font-[family-name:var(--font-body)] text-right">
                    Total
                  </div>
                </div>

                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-border pb-6 grid grid-cols-12 gap-4 items-center"
                    >
                      {/* Product Info */}
                      <div className="col-span-12 sm:col-span-6 flex gap-4">
                        <div className="relative w-24 h-32 bg-accent shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <Link
                            href={`/product/${item.id}`}
                            className="text-sm tracking-wider font-[family-name:var(--font-body)] hover:text-muted-foreground transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-1 font-[family-name:var(--font-body)]">
                            Size: {item.size}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive mt-2 font-[family-name:var(--font-body)] sm:hidden"
                          >
                            <X className="w-3 h-3" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-4 sm:col-span-2 flex items-center justify-start sm:justify-center">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-accent transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center text-sm font-[family-name:var(--font-body)]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-accent transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-4 sm:col-span-2 text-right">
                        <span className="text-sm font-[family-name:var(--font-body)]">
                          Rs. {item.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Total */}
                      <div className="col-span-4 sm:col-span-2 text-right flex items-center justify-end gap-2">
                        <span className="text-sm font-medium font-[family-name:var(--font-body)]">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="hidden sm:block text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                  <Link
                    href="/collections/women"
                    className="text-xs tracking-wider uppercase underline underline-offset-4 font-[family-name:var(--font-body)] hover:no-underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-accent/30 p-6 sm:p-8">
                  <h2 className="text-lg tracking-wider uppercase font-[family-name:var(--font-heading)] mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 border-b border-border pb-6 mb-6">
                    <div className="flex justify-between text-sm font-[family-name:var(--font-body)]">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-[family-name:var(--font-body)]">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {shipping === 0 ? "Free" : `Rs. ${shipping}`}
                      </span>
                    </div>
                    {subtotal < 5000 && (
                      <p className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                        Add Rs. {(5000 - subtotal).toLocaleString()} more for free shipping
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between text-base font-medium font-[family-name:var(--font-body)] mb-8">
                    <span>Total</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>

                  <button className="w-full bg-primary text-primary-foreground py-4 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-body)] hover:bg-primary/90 transition-colors">
                    Proceed to Checkout
                  </button>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Secure checkout
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Multiple payment options
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
