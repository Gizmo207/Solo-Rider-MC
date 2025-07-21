import Link from 'next/link'

const featuredProducts = [
  {
    id: 1,
    name: 'Lone Wolf Patch',
    price: 15.99,
    image: '/api/placeholder/300/300',
    description: 'Embroidered lone wolf patch - Show your solo spirit'
  },
  {
    id: 2, 
    name: 'Solo Riders MC Tee',
    price: 29.99,
    image: '/api/placeholder/300/300',
    description: 'Premium black tee with vintage-style logo'
  },
  {
    id: 3,
    name: 'Road Warrior Bundle',
    price: 34.99,
    image: '/api/placeholder/300/300', 
    description: 'Patch + Tee combo - Save $10 on the bundle'
  }
]

export default function FeaturedProducts() {
  return (
    <section className="bg-solo-black py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-stencil font-bold text-white mb-4">
            GEAR UP FOR THE ROAD
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Premium merchandise designed by riders, for riders. Every purchase supports the solo community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-solo-steel/10 rounded-lg overflow-hidden border border-solo-steel/20 hover:border-solo-red/50 transition-colors duration-200">
              <div className="aspect-square bg-gray-800 flex items-center justify-center">
                <div className="text-gray-600 text-4xl">📷</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-stencil font-semibold text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-400 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-solo-red">
                    ${product.price}
                  </span>
                  <button className="bg-solo-red hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            href="/shop" 
            className="inline-flex items-center bg-transparent border-2 border-solo-red text-solo-red hover:bg-solo-red hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
          >
            View All Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
