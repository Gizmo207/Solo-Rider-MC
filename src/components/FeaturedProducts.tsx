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
    <section className="bg-gradient-to-b from-solo-black to-gray-900 py-16 lg:py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium bg-solo-red/10 border border-solo-red/20 rounded-full text-solo-red">
            <Zap className="w-4 h-4 mr-2" />
            Premium Gear Collection
          </div>
          <h2 className="text-3xl lg:text-5xl font-stencil font-bold text-white mb-6">
            GEAR UP FOR THE{" "}
            <span className="bg-gradient-to-r from-solo-red to-red-500 bg-clip-text text-transparent">
              ROAD
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Premium merchandise designed by riders, for riders. Every purchase supports the solo community.
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={item}
              className="group relative bg-gradient-to-b from-white/5 to-white/0 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm hover:border-solo-red/50 transition-all duration-300"
            >
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  product.badge === 'Bestseller' ? 'bg-yellow-500 text-black' :
                  product.badge === 'New' ? 'bg-green-500 text-white' :
                  'bg-solo-red text-white'
                }`}>
                  {product.badge}
                </span>
              </div>

              {/* Product image */}
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                <div className="text-gray-600 text-6xl">📷</div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product details */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <h3 className="text-xl font-stencil font-semibold text-white mb-2 group-hover:text-solo-red transition-colors duration-200">
                  {product.name}
                </h3>
                
                <p className="text-gray-400 mb-4 text-sm">{product.description}</p>
                
                {/* Price */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-solo-red">
                      ${product.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <div className="text-green-400 text-sm font-medium">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </div>
                </div>

                {/* Add to cart button */}
                <Button className="w-full group/btn" size="lg">
                  <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="outline" size="lg" className="group">
            <Link href="/shop" className="flex items-center">
              View All Products
              <Zap className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
