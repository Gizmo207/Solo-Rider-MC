'use client'

import Link from 'next/link'
import { useState } from 'react'

// Navigation.tsx - Top navigation bar for Solo Riders MC
// This component provides links to main sections and external resources.
// Intended for use at the top of the scroll journey.

/**
 * Navigation - Renders the main navigation bar with club branding and links.
 */
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-solo-black/95 backdrop-blur-sm border-b border-solo-steel/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-solo-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SR</span>
              </div>
              <span className="text-white font-stencil text-xl font-semibold">
                SOLO RIDERS MC
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/shop" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Shop
              </Link>
              <Link href="/spotlight" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Solo Spotlight
              </Link>
              <Link href="/blog" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Blog
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-solo-black border-t border-solo-steel/20">
            <Link href="/" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
              Home
            </Link>
            <Link href="/shop" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
              Shop
            </Link>
            <Link href="/spotlight" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
              Solo Spotlight
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
              Blog
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
