
"use client";
// FeaturedProducts.tsx - Highlights top club merch from Printful
// This component fetches and displays featured products dynamically.
// Intended for use in the main scroll journey.

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ShoppingCart, Zap } from 'lucide-react';
import usePrintfulProducts from '../lib/hooks/usePrintfulProducts';

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
  const { products, loading, error } = usePrintfulProducts();

  return (
    <section className="bg-gradient-to-b from-solo-black to-gray-900 py-12 lg:py-20 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:80px_80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-20">
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
          </div>
        </motion.div>

        {error && <div className="text-red-500 text-center mb-8">Error loading products: {error.message}</div>}
        {loading && <div className="text-white text-center mb-8">Loading products...</div>}
        {(!products || !Array.isArray(products) || products.length === 0) && (
          <div className="text-gray-800 text-center mb-8 text-2xl font-bold">No products found.</div>
        )}

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {products?.map((item: any, idx: number) => (
              <motion.div
                key={idx}
                variants={item}
              >
                <div className="group relative bg-gradient-to-b from-white/10 to-white/0 rounded-3xl border-2 border-white/20 overflow-hidden backdrop-blur-lg hover:border-solo-red/70 shadow-xl transition-all duration-300 p-2">
                {/* Product image */}
                <div className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={item.thumbnail_url}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Product details */}
                <div className="p-8">
                  <h3 className="text-2xl font-stencil font-bold text-white mb-3 group-hover:text-solo-red transition-colors duration-200">
                    {item.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-3xl font-extrabold text-solo-red">
                      ${item.price}
                    </span>
                  </div>

                  {/* Add to cart button */}
                  <Button className="w-full group/btn text-lg py-3" size="lg">
                    <ShoppingCart className="mr-3 h-5 w-5 transition-transform group-hover/btn:scale-110" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
            ))}
          </div>
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
