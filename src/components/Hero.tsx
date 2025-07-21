import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-solo-black via-solo-black to-solo-red/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-stencil font-bold text-white mb-6">
            RIDE 
            <span className="text-gradient block">SOLO</span>
            LIVE FREE
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join the ultimate digital clubhouse for independent motorcycle riders. 
            Share your builds, connect with fellow solo riders, and gear up for the road ahead.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/shop" 
              className="bg-solo-red hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
            >
              Shop Gear
            </Link>
            <Link 
              href="/spotlight" 
              className="border-2 border-solo-red text-solo-red hover:bg-solo-red hover:text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
            >
              Submit Your Ride
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-stencil font-bold text-solo-red mb-2">10K+</div>
              <div className="text-gray-400">Solo Riders</div>
            </div>
            <div>
              <div className="text-3xl font-stencil font-bold text-solo-red mb-2">1000+</div>
              <div className="text-gray-400">Mile Challenge Completed</div>
            </div>
            <div>
              <div className="text-3xl font-stencil font-bold text-solo-red mb-2">50+</div>
              <div className="text-gray-400">States Covered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
