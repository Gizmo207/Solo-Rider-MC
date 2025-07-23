'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from "framer-motion"
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
// Update the import path if Button is in a different location, for example:
// Or, if the file is named Button.tsx or index.tsx inside a Button folder:
// If your Button component is in a different location, update the path accordingly.
// Example: If Button is in components/ui/Button.tsx, use the following import:
// Update the import path below to match the actual location of your Button component.
// Example: If Button is in '../../components/Button', use:
import Button from "../../components/components/Button"
// If you do not have a Button component, create one at '../../components/Button.tsx'.
// If you do not have a Button component, create one at the specified path.
// If your Button component is in a different location, update the path accordingly.
// If you do not have a Button.tsx file, create one in the components folder.
// Or, if you need to create the Button component, add a Button.tsx file in the components folder.
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react"
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-solo-black">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-solo-red mx-auto mb-4"></div>
            <p className="text-white text-xl">Processing your order...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-solo-black to-gray-900">
      <Navigation />
      
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl lg:text-6xl font-stencil font-bold text-white mb-6"
          >
            ORDER{" "}
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              CONFIRMED
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Thanks for supporting the Solo Riders community! Your gear is being prepared for shipment.
          </motion.p>

          {sessionId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-12 max-w-md mx-auto"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Order Details</h3>
              <p className="text-gray-400 text-sm">Session ID: {sessionId}</p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <Mail className="w-8 h-8 text-solo-red mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Confirmation Email</h3>
              <p className="text-gray-400 text-sm">Check your inbox for order details and tracking info</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <Package className="w-8 h-8 text-solo-red mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Print on Demand</h3>
              <p className="text-gray-400 text-sm">Your order is being printed and will ship within 3-5 business days</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <CheckCircle className="w-8 h-8 text-solo-red mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Quality Guaranteed</h3>
              <p className="text-gray-400 text-sm">Premium materials and satisfaction guaranteed or your money back</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="group">
              <Link href="/shop" className="flex items-center">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg">
              <Link href="/spotlight" className="flex items-center">
                Share Your Ride
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
