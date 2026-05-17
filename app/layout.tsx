import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FIDELS - Premium Pakistani Fashion',
  description: 'Discover luxury Pakistani fashion at FIDELS. Shop premium Shalwar Kameez, unstitched fabric, ready-to-wear, and luxury pret collections for men and women.',
  keywords: ['Pakistani fashion', 'Shalwar Kameez', 'luxury clothing', 'FIDELS', 'lawn collection', 'unstitched fabric'],
}

export const viewport = {
  themeColor: '#1a1a1a',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} bg-background`}>
      <body className="font-[family-name:var(--font-body)] antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
