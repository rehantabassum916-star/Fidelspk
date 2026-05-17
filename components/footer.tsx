"use client"

import Link from "next/link"
import { Truck, MapPin, Headphones } from "lucide-react"

const footerLinks = {
  "Company Info": [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms & Conditions", href: "#" },
  ],
  "Help & Support": [
    { name: "FAQs", href: "#" },
    { name: "Order Tracking", href: "#" },
    { name: "Return Policy", href: "#" },
    { name: "Size Guide", href: "#" },
  ],
  "Customer Services": [
    { name: "Contact Us", href: "#" },
    { name: "About Us", href: "#" },
    { name: "E-Gift", href: "#" },
    { name: "Return & Exchange Policy", href: "#" },
  ],
}

export default function Footer() {
  return (
    <footer>
      {/* Service Bar */}
      <div className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="flex items-center justify-center gap-3 py-6 px-4">
            <Truck className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            <span className="text-xs tracking-[0.15em] uppercase font-[family-name:var(--font-body)] text-foreground">
              Order Tracking
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 py-6 px-4">
            <MapPin className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            <span className="text-xs tracking-[0.15em] uppercase font-[family-name:var(--font-body)] text-foreground">
              Store Locator
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 py-6 px-4">
            <Headphones className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            <span className="text-xs tracking-[0.15em] uppercase font-[family-name:var(--font-body)] text-foreground">
              Support 24/7
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-primary text-primary-foreground">
        <div className="px-6 lg:px-12 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <h3 className="text-xl tracking-[0.3em] uppercase font-[family-name:var(--font-heading)] font-semibold mb-6">
                FIDELS
              </h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed font-[family-name:var(--font-body)]">
                L-1-6, Peshawar Road, Lahore, Pakistan
              </p>
              <p className="mt-3 text-sm text-primary-foreground/70 font-[family-name:var(--font-body)]">
                +92 42 111 347 345
              </p>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-xs tracking-[0.2em] uppercase mb-6 font-[family-name:var(--font-body)] font-medium">
                  {title}
                </h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors font-[family-name:var(--font-body)]"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter in Footer */}
          <div className="mt-12 pt-8 border-t border-primary-foreground/10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <h4 className="text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-body)] font-medium">
                  Newsletter
                </h4>
                <p className="mt-1 text-sm text-primary-foreground/60 font-[family-name:var(--font-body)]">
                  Be the first to be notified of seasonal updates
                </p>
              </div>
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 lg:w-64 bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-2.5 text-sm tracking-wider outline-none focus:border-primary-foreground/40 transition-colors font-[family-name:var(--font-body)] text-primary-foreground placeholder:text-primary-foreground/40"
                />
                <button className="bg-primary-foreground text-primary px-6 py-2.5 text-xs tracking-[0.15em] uppercase hover:bg-primary-foreground/90 transition-colors font-[family-name:var(--font-body)] font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 px-6 lg:px-12 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-primary-foreground/50 font-[family-name:var(--font-body)]">
              2026 FIDELS. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </Link>
              <Link href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </Link>
              <Link href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
