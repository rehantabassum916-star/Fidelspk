"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react"

const menuItems = [
  {
    name: "Women",
    href: "/collections/women",
    submenu: [
      { name: "Unstitched", href: "/collections/unstitched" },
      { name: "Ready to Wear", href: "/collections/ready-to-wear" },
      { name: "Luxury Pret", href: "/collections/luxury-pret" },
      { name: "Formals", href: "/collections/formals" },
    ],
  },
  {
    name: "Luxury",
    href: "/collections/luxury-pret",
    submenu: [
      { name: "Formal Wear", href: "/collections/formals" },
      { name: "Party Wear", href: "/collections/party-wear" },
      { name: "Festive Collection", href: "/collections/festive" },
    ],
  },
  {
    name: "Men",
    href: "/collections/men",
    submenu: [
      { name: "Shalwar Kameez", href: "/collections/men-shalwar" },
      { name: "Kurta", href: "/collections/men-kurta" },
      { name: "Waistcoat", href: "/collections/men-waistcoat" },
    ],
  },
  { name: "Accessories", href: "/collections/accessories" },
]

interface HeaderProps {
  transparent?: boolean
}

export default function Header({ transparent = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const showTransparent = transparent && !isScrolled && !searchOpen

  return (
    <>
      {/* Announcement Bar */}
      <div className={`${showTransparent ? "bg-primary/80 backdrop-blur-sm" : "bg-primary"} text-primary-foreground text-center py-2 text-[9px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-[family-name:var(--font-body)] transition-colors duration-300`}>
        <div className="flex items-center justify-center gap-2 sm:gap-4 px-2">
          <span className="hidden sm:inline">Unlock Free Shipping on Nationwide Paid Orders</span>
          <span className="sm:hidden">Free Shipping Nationwide</span>
          <Link href="/collections/new-arrivals" className="underline underline-offset-2 hover:no-underline whitespace-nowrap">
            Shop Now
          </Link>
        </div>
      </div>

      <header
        className={`${transparent ? "fixed" : "sticky"} top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showTransparent
            ? "bg-transparent"
            : "bg-background shadow-sm"
        }`}
        style={{ marginTop: transparent ? "0" : "0" }}
      >
        {/* Main Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4">
          {/* Left: Navigation */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden ${showTransparent ? "text-white" : "text-foreground"} transition-colors`}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden lg:flex items-center gap-6">
              {menuItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setActiveSubmenu(item.name)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={item.href}
                    className={`text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 font-[family-name:var(--font-body)] font-medium ${
                      showTransparent
                        ? "text-white hover:text-white/70"
                        : "text-foreground hover:text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && activeSubmenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-0 pt-4 min-w-[200px]"
                    >
                      <div className="bg-card border border-border shadow-xl p-5">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block py-2.5 text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-body)]"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
              <Link
                href="/collections/sale"
                className={`text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 font-[family-name:var(--font-body)] font-medium ${
                  showTransparent
                    ? "text-red-400 hover:text-red-300"
                    : "text-destructive hover:text-destructive/80"
                }`}
              >
                {"Summer'26 Sale"}
              </Link>
            </nav>
          </div>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl tracking-[0.25em] uppercase font-[family-name:var(--font-heading)] font-semibold transition-colors duration-300 ${
              showTransparent ? "text-white" : "text-foreground"
            }`}>
              FIDELS
            </h1>
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center gap-4 sm:gap-5">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`${showTransparent ? "text-white hover:text-white/70" : "text-foreground hover:text-muted-foreground"} transition-colors`}
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </button>
            <Link
              href="/cart"
              className={`relative ${showTransparent ? "text-white hover:text-white/70" : "text-foreground hover:text-muted-foreground"} transition-colors`}
              aria-label="Cart"
            >
              <ShoppingBag className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-[family-name:var(--font-body)]">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border overflow-hidden bg-background"
            >
              <div className="px-4 sm:px-6 lg:px-10 py-4">
                <div className="flex items-center gap-4 max-w-2xl mx-auto">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="flex-1 bg-transparent text-sm tracking-wider outline-none placeholder:text-muted-foreground font-[family-name:var(--font-body)]"
                    autoFocus
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/40 z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-[85%] max-w-sm bg-background z-50 overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl tracking-[0.3em] uppercase font-[family-name:var(--font-heading)] font-semibold text-foreground">
                    FIDELS
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-foreground p-1"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-1">
                  {menuItems.map((item) => (
                    <div key={item.name}>
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          className="py-3 text-sm tracking-[0.15em] uppercase font-[family-name:var(--font-body)] font-medium text-foreground"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        {item.submenu && (
                          <button
                            onClick={() =>
                              setActiveSubmenu(
                                activeSubmenu === item.name ? null : item.name
                              )
                            }
                            className="p-2 text-foreground"
                            aria-label={`Toggle ${item.name} submenu`}
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                activeSubmenu === item.name ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {item.submenu && activeSubmenu === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {item.submenu.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="block py-2.5 text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-body)]"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                  <Link
                    href="/collections/sale"
                    className="py-3 text-sm tracking-[0.15em] uppercase font-[family-name:var(--font-body)] font-medium text-destructive"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {"Summer'26 Sale"}
                  </Link>
                </nav>

                <div className="mt-8 pt-8 border-t border-border">
                  <Link 
                    href="/wishlist" 
                    className="flex items-center gap-3 py-3 text-sm text-foreground font-[family-name:var(--font-body)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="w-4 h-4" />
                    <span className="tracking-wider uppercase text-xs">Wishlist</span>
                  </Link>
                  <Link 
                    href="/admin" 
                    className="flex items-center gap-3 py-3 text-sm text-foreground font-[family-name:var(--font-body)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Menu className="w-4 h-4" />
                    <span className="tracking-wider uppercase text-xs">Admin Panel</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
