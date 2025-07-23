import Hero from '../../components/Hero'
import FeaturedProducts from '../../components/FeaturedProducts'
import BlogTeasers from '../../components/BlogTeasers'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-solo-black">
      <Navigation />
      <Hero />
      <FeaturedProducts />
      <BlogTeasers />
      <Footer />
    </main>
  )
}
