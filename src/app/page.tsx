// page.tsx - Main landing page for Solo Riders MC
// This file assembles the scroll journey using modular components.
// Each section is a full-screen, snap-to-view scene.

import Hero from '../components/Hero' // Cinematic video + logo + CTA
import FeaturedProducts from '../components/FeaturedProducts' // Merch highlights
import BlogTeasers from '../components/BlogTeasers' // Latest news/updates
import Navigation from '../components/Navigation' // Top navigation bar
import Footer from '../components/Footer' // Bottom footer




/**
 * Home - Main entry point for the scroll journey experience.
 * Renders all major sections in order, wrapped in a scrollable <main>.
 */
export default function Home() {
  return (
    <>
      {/* Top navigation bar - fixed positioning */}
      <Navigation />
      <main className="bg-solo-black">
        {/* Hero section: video, logo, CTA */}
        <div id="home">
          <Hero />
        </div>

      {/* Featured products: Printful merch highlights */}
      <div id="shop">
        <FeaturedProducts />
      </div>
      {/* Blog teasers: latest club news */}
      <div id="blog">
        <BlogTeasers />
      </div>
      {/* Footer: links, copyright, socials */}
      <div id="contact">
        <Footer />
      </div>
    </main>
    </>
  )
}
