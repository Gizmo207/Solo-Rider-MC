'use client'

import { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { getProducts, Product } from '@/lib/firestore-schema'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star, Zap, Filter, Search } from "lucide-react"

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

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts()
        setProducts(fetchedProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product => 
    filter === 'all' || product.category === filter
  )

  const categories = ['all', 'patches', 'tees', 'bundles', 'accessories']

  const handleBuyNow = async (product: Product) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      })

      const { url, error } = await response.json()

      if (error) {
        alert(`❌ Checkout error: ${error}`)
        return
      }

      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('❌ Something went wrong. Please try again.')
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-solo-black">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-solo-red mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading gear...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-solo-black to-gray-900">
      <Navigation />
      
      {/* Header Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium bg-solo-red/10 border border-solo-red/20 rounded-full text-solo-red">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Official SoloRidersMC Gear
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-stencil font-bold text-white mb-6">
              GEAR UP FOR THE{" "}
              <span className="bg-gradient-to-r from-solo-red to-red-500 bg-clip-text text-transparent">
                ROAD
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Premium merchandise designed by riders, for riders. Every purchase supports the solo community.
            </p>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(category)}
                  className="capitalize"
                >
                  {category === 'all' ? 'All Gear' : category}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🏍️</div>
              <h3 className="text-2xl font-stencil text-white mb-4">No products found</h3>
              <p className="text-gray-400">Check back soon - we're always adding new gear!</p>
            </motion.div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={item}
                  className="group relative bg-gradient-to-b from-white/5 to-white/0 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm hover:border-solo-red/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-solo-red/20 text-solo-red border border-solo-red/30 capitalize">
                      {product.category}
                    </span>
                  </div>

                  {/* Product Image */}
                  <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-600 text-6xl">📷</div>
                    )}
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Quick action button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        size="sm"
                        onClick={() => handleBuyNow(product)}
                        className="transform scale-90 group-hover:scale-100 transition-transform"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Quick Buy
                      </Button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-stencil font-semibold text-white mb-2 group-hover:text-solo-red transition-colors duration-200">
                      {product.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 text-sm line-clamp-2">{product.description}</p>
                    
                    {/* Sizes */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">Available sizes:</p>
                        <div className="flex flex-wrap gap-1">
                          {product.sizes.map((size) => (
                            <span key={size} className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Price */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-solo-red">
                          ${product.price}
                        </span>
                      </div>
                      {product.inventory && (
                        <div className="text-green-400 text-xs">
                          {product.inventory} in stock
                        </div>
                      )}
                    </div>

                    {/* Add to cart button */}
                    <Button 
                      className="w-full group/btn" 
                      size="lg"
                      onClick={() => handleBuyNow(product)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                      Buy Now - ${product.price}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
