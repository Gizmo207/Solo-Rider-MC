export default function FeaturedProducts() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-stencil font-bold text-white mb-8 text-center">
        ⭐ Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Example featured product cards - replace with dynamic data as needed */}
        <div className="bg-gradient-to-b from-white/5 to-white/0 rounded-2xl border border-white/10 p-6 text-center">
          <img src="/images/products/solo-tee.jpg" alt="Solo Tee" className="w-32 h-32 mx-auto mb-4 object-cover rounded" />
          <h3 className="text-xl font-bold text-white mb-2">Solo Tee</h3>
          <p className="text-gray-400 mb-4">Classic Solo Riders MC tee. Available in multiple colors and sizes.</p>
          <span className="text-2xl font-bold text-solo-red">$28</span>
        </div>
        <div className="bg-gradient-to-b from-white/5 to-white/0 rounded-2xl border border-white/10 p-6 text-center">
          <img src="/images/products/solo-hat.jpg" alt="Solo Hat" className="w-32 h-32 mx-auto mb-4 object-cover rounded" />
          <h3 className="text-xl font-bold text-white mb-2">Solo Hat</h3>
          <p className="text-gray-400 mb-4">Embroidered hat for the true solo rider. Adjustable fit.</p>
          <span className="text-2xl font-bold text-solo-red">$22</span>
        </div>
        <div className="bg-gradient-to-b from-white/5 to-white/0 rounded-2xl border border-white/10 p-6 text-center">
          <img src="/images/products/solo-mug.jpg" alt="Solo Mug" className="w-32 h-32 mx-auto mb-4 object-cover rounded" />
          <h3 className="text-xl font-bold text-white mb-2">Solo Mug</h3>
          <p className="text-gray-400 mb-4">Start your ride with a Solo Riders MC mug. Dishwasher safe.</p>
          <span className="text-2xl font-bold text-solo-red">$16</span>
        </div>
      </div>
    </section>
  );
}
