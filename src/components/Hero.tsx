"use client";
import Link from 'next/link'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Users, Trophy } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-solo-black via-gray-900 to-solo-black">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-solo-red/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium bg-solo-red/10 border border-solo-red/20 rounded-full text-solo-red"
          >
            <Zap className="w-4 h-4 mr-2" />
            Join 10,000+ Solo Riders
          </motion.div>

          {/* Main heading with staggered animation */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-8xl font-stencil font-bold text-white mb-6 leading-tight"
          >
            RIDE{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-solo-red to-red-500 bg-clip-text text-transparent">
                SOLO
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-solo-red to-red-500 transform origin-left"
              />
            </span>
            <br />
            LIVE{" "}
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              FREE
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            The ultimate digital clubhouse for independent motorcycle riders. 
            Share your builds, connect with fellow solo riders, and gear up for the road ahead.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button size="lg" className="group">
              <Link href="/shop" className="flex items-center">
                Shop Gear
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link href="/spotlight" className="flex items-center">
                Submit Your Ride
              </Link>
            </Button>
          </motion.div>
          
          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
              <Users className="w-8 h-8 text-solo-red mb-2" />
              <div className="text-3xl font-stencil font-bold text-white mb-1">10K+</div>
              <div className="text-gray-400">Solo Riders</div>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
              <Trophy className="w-8 h-8 text-solo-red mb-2" />
              <div className="text-3xl font-stencil font-bold text-white mb-1">1000+</div>
              <div className="text-gray-400">Mile Challenges</div>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
              <Zap className="w-8 h-8 text-solo-red mb-2" />
              <div className="text-3xl font-stencil font-bold text-white mb-1">50+</div>
              <div className="text-gray-400">States Covered</div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute top-20 left-20 w-20 h-20 rounded-full bg-solo-red/20 blur-xl"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
        className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-red-500/10 blur-2xl"
      />
    </section>
  )
}
