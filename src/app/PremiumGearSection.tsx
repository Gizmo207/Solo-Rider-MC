"use client";
import InteractiveGearCard from '../components/InteractiveGearCard';
import usePrintfulProducts from '../lib/hooks/usePrintfulProducts';

export default function PremiumGearSection() {
  const { products, loading, error } = usePrintfulProducts();
  // Debug: log raw Printful products
  console.log('Loaded Printful products:', products);

  return (
    <section className="bg-yellow-300 border-4 border-red-600 text-black py-16 z-50 relative">
      <div className="absolute top-2 left-2 bg-red-600 text-white px-4 py-2 rounded shadow-lg text-lg font-bold z-50">PremiumGearSection (DEBUG VISIBLE)</div>
      <h2 className="text-center text-5xl font-stencil mb-12">Premium Gear Collection</h2>
      {error && <div className="text-red-500 text-center mb-8">Error loading products: {error.message}</div>}
      {loading && <div className="text-white text-center mb-8">Loading products...</div>}
      {(!products || !Array.isArray(products) || products.length === 0) && (
        <div className="text-gray-800 text-center mb-8 text-2xl font-bold">No products found (section forced visible)</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {products?.map((item: any, idx: number) => (
          <InteractiveGearCard
            key={idx}
            title={item.title}
            image={item.thumbnail_url}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
}
