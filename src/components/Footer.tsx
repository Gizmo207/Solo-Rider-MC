// Footer.tsx - Bottom footer for Solo Riders MC
// This component provides copyright, social links, and club info.
// Intended for use at the end of the scroll journey.

import Link from 'next/link'

/**
 * Footer - Renders the bottom footer with copyright and social links.
 */
export default function Footer() {
  return (
    <footer className="bg-solo-black border-t border-solo-steel/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-solo-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SR</span>
              </div>
              <span className="text-white font-stencil text-xl font-semibold">
                SOLO RIDERS MC
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              The ultimate digital clubhouse for independent motorcycle enthusiasts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-solo-red transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-solo-red transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.342-1.297-.894-.808-1.297-1.959-1.297-3.342V8.566c0-1.297.49-2.448 1.297-3.342C6.001 4.33 7.152 3.927 8.449 3.927h3.783c1.297 0 2.448.49 3.342 1.297.894.808 1.297 1.959 1.297 3.342v3.783c0 1.297-.49 2.448-1.297 3.342-.894.808-2.045 1.297-3.342 1.297H8.449z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-solo-red transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-stencil font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-gray-400 hover:text-solo-red transition-colors">Shop</Link></li>
              <li><Link href="/spotlight" className="text-gray-400 hover:text-solo-red transition-colors">Solo Spotlight</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-solo-red transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-solo-red transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-solo-red transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-stencil font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link href="/challenge" className="text-gray-400 hover:text-solo-red transition-colors">1000 Mile Challenge</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-solo-red transition-colors">Solo Convergence</Link></li>
              <li><Link href="/newsletter" className="text-gray-400 hover:text-solo-red transition-colors">Nomad Wire Newsletter</Link></li>
              <li><Link href="/discord" className="text-gray-400 hover:text-solo-red transition-colors">Discord</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-stencil font-semibold mb-4">Stay Connected</h3>
            <p className="text-gray-400 mb-4">Get the latest routes, builds, and community updates.</p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full bg-solo-steel/20 border border-solo-steel/40 rounded px-3 py-2 text-white placeholder-gray-500 focus:border-solo-red focus:outline-none"
              />
              <button 
                type="submit"
                className="w-full bg-solo-red hover:bg-red-700 text-white font-semibold py-2 rounded transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-solo-steel/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Solo Riders MC. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-solo-red text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-solo-red text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
