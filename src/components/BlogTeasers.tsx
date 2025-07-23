// BlogTeasers.tsx - Displays recent club news and blog posts
// This component shows a preview of the latest updates for Solo Riders MC.
// Intended for use in the main scroll journey.

import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Solo Riding Routes in the American West',
    excerpt: 'Discover the most breathtaking solo motorcycle routes from California to Colorado, handpicked by our community of independent riders.',
    author: 'Peter Bernaiche',
    date: 'July 15, 2025',
    readTime: '8 min read',
    image: '/api/placeholder/400/250',
    category: 'Routes'
  },
  {
    id: 2,
    title: 'Building Your First Custom FXR: A Solo Journey',
    excerpt: 'From garage builds to road warriors - follow Mike\'s journey transforming a stock Harley into the ultimate solo touring machine.',
    author: 'Mike Rodriguez',
    date: 'July 12, 2025',
    readTime: '12 min read',
    image: '/api/placeholder/400/250',
    category: 'Builds'
  },
  {
    id: 3,
    title: 'The Solo 1000-Mile Challenge: Week 1 Results',
    excerpt: 'See who\'s leading the pack in our first-ever community challenge. Plus tips for tracking your miles and staying motivated.',
    author: 'Solo Team',
    date: 'July 10, 2025', 
    readTime: '5 min read',
    image: '/api/placeholder/400/250',
    category: 'Community'
  }
]

/**
 * BlogTeasers - Shows a list of recent blog posts or news items.
 * Can be wired to a CMS or markdown files for live updates.
 */
export default function BlogTeasers() {
  // TODO: Connect to CMS or markdown for live blog feed
  return (
    <section className="bg-gray-900 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-stencil font-bold text-white mb-4">
            LATEST FROM THE ROAD
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Stories, guides, and insights from the solo riding community. Get inspired for your next adventure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-solo-black rounded-lg overflow-hidden border border-solo-steel/20 hover:border-solo-red/50 transition-colors duration-200 group">
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <div className="text-gray-600 text-4xl">📷</div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-solo-red/20 text-solo-red text-xs font-semibold px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-stencil font-semibold text-white mb-3 group-hover:text-solo-red transition-colors duration-200">
                  {post.title}
                </h3>
                
                <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white text-sm font-medium">{post.author}</div>
                    <div className="text-gray-500 text-xs">{post.date}</div>
                  </div>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="text-solo-red hover:text-red-400 font-medium text-sm flex items-center"
                  >
                    Read More
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center bg-transparent border-2 border-solo-red text-solo-red hover:bg-solo-red hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
          >
            View All Posts
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
