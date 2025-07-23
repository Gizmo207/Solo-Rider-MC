import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function SpotlightPage() {
  return (
    <main className="min-h-screen bg-solo-black">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-stencil font-bold text-white mb-8">
          🏍️ SOLO SPOTLIGHT - Coming Soon
        </h1>
        <p className="text-xl text-gray-400">
          Share your custom builds and solo riding stories with the community.
        </p>
      </div>
      <Footer />
    </main>
  )
}
