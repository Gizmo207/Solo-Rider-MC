
"use client";
// FeaturedProducts.tsx - Highlights top club merch from Printful
// This component fetches and displays featured products dynamically.
// Intended for use in the main scroll journey.

import React from 'react'
import Link from 'next/link'
import { motion } from "framer-motion"
import Button from "./components/Button"
import { ShoppingCart, Star, Zap } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: 'Lone Wolf Patch',
    price: 15.99,
    originalPrice: 19.99,
    image: '/api/placeholder/300/300',
    description: 'Embroidered lone wolf patch - Show your solo spirit',
    rating: 4.9,
    reviews: 234,
    badge: 'Bestseller'
  },
  {
    id: 2, 
    name: 'Solo Riders MC Tee',
    price: 29.99,
    originalPrice: 39.99,
    image: '/api/placeholder/300/300',
    description: 'Premium black tee with vintage-style logo',
    rating: 4.8,
    reviews: 156,
    badge: 'New'
  },
  {
    id: 3,
    name: 'Road Warrior Bundle',
    price: 34.99,
    originalPrice: 49.98,
    image: '/api/placeholder/300/300', 
    description: 'Patch + Tee combo - Save $15 on the bundle',
    rating: 5.0,
    reviews: 89,
    badge: 'Bundle'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

/**
 * FeaturedProducts - Displays a grid of top-selling or new club merchandise.
 * Can be wired to Printful API for live product feed.
 */
export default function FeaturedProducts() {
  // TODO: Connect to Printful API for live merch
  return (
    <section className="bg-gradient-to-b from-solo-black to-gray-900 py-24 lg:py-36 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:80px_80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          {...{ className: "text-center mb-20" }}
        >
          <div className="inline-flex items-center px-6 py-3 mb-8 text-lg font-bold bg-solo-red/20 border-2 border-solo-red/40 rounded-full text-solo-red shadow-lg">
            <Zap className="w-6 h-6 mr-3" />
            Premium Gear Collection
          </div>
          <h2 className="text-5xl lg:text-7xl font-stencil font-extrabold text-white mb-8 tracking-tight drop-shadow-lg">
            GEAR UP FOR THE{' '}
            <span className="bg-gradient-to-r from-solo-red to-red-500 bg-clip-text text-transparent animate-pulse">
              ROAD
            </span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light mb-2">
            Premium merchandise designed by riders, for riders.<br className="hidden lg:block" />
            Every purchase supports the solo community.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          {...{ className: "grid grid-cols-1 md:grid-cols-3 gap-12 mb-20" }}
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={item}
              {...{ className: "group relative bg-gradient-to-b from-white/10 to-white/0 rounded-3xl border-2 border-white/20 overflow-hidden backdrop-blur-lg hover:border-solo-red/70 shadow-xl transition-all duration-300 p-2" }}
            >
              {/* Badge */}
              <div className="absolute top-6 left-6 z-10">
                <span className={`px-4 py-2 text-base font-bold rounded-full shadow ${
                  product.badge === 'Bestseller' ? 'bg-yellow-400 text-black' :
                  product.badge === 'New' ? 'bg-green-500 text-white' :
                  'bg-solo-red text-white'
                }`}>
                  {product.badge}
                </span>
              </div>

              {/* Product image */}
              <div className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative overflow-hidden">
                <div className="text-gray-700 text-7xl">📷</div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product details */}
              <div className="p-8">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-400 text-lg ml-3">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <h3 className="text-2xl font-stencil font-bold text-white mb-3 group-hover:text-solo-red transition-colors duration-200">
                  {product.name}
                </h3>

                <p className="text-gray-300 mb-6 text-lg leading-relaxed">{product.description}</p>

                {/* Price */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-extrabold text-solo-red">
                      ${product.price}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <div className="text-green-400 text-lg font-bold">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </div>
                </div>

                {/* Add to cart button */}
                <Button className="w-full group/btn text-lg py-3" size="lg">
                  <ShoppingCart className="mr-3 h-5 w-5 transition-transform group-hover/btn:scale-110" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          {...{ className: "text-center" }}
        >
          <Button variant="outline" size="lg" className="group text-xl px-8 py-4">
            <Link href="/shop" className="flex items-center">
              View All Products
              <Zap className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
