export default function BlogTeasers() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-stencil font-bold text-white mb-8 text-center">
        📝 Latest from the Blog
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Example blog teaser cards - replace with dynamic data as needed */}
        <div className="bg-gradient-to-b from-white/5 to-white/0 rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-bold text-white mb-2">How to Plan a Solo Motorcycle Adventure</h3>
          <p className="text-gray-400 mb-4">Tips and tricks for planning your next solo ride, from route selection to gear essentials.</p>
          <a href="/blog" className="text-solo-red font-semibold hover:underline">Read More →</a>
        </div>
        <div className="bg-gradient-to-b from-white/5 to-white/0 rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-bold text-white mb-2">Solo Riders MC: Community Spotlight</h3>
          <p className="text-gray-400 mb-4">Meet some of our most inspiring solo riders and hear their stories from the road.</p>
          <a href="/blog" className="text-solo-red font-semibold hover:underline">Read More →</a>
        </div>
      </div>
    </section>
  );
}
