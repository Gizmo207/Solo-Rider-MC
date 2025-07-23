'use client'

import { useEffect, useState } from 'react'
import React from 'react';
import { motion } from "framer-motion"
import { getProducts, Product } from '../../lib/firestore-schema'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Button from "../../../components/Button"
import { ShoppingCart, Star, Zap, Filter, Search } from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

function ShopPage() {
  type ModalState = {
    open: boolean;
    product?: Product;
    color?: string;
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  // Track selected color per product
  const [selectedColors, setSelectedColors] = useState<{ [productId: string]: string }>({});
  // Modal state for image expansion
  const [modal, setModal] = useState<ModalState>({ open: false });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        // Set default color for each product
        const colorDefaults: { [productId: string]: string } = {};
        fetchedProducts.forEach((p) => {
          if (p.imagesByColor) {
            colorDefaults[p.id!] = Object.keys(p.imagesByColor)[0];
          }
        });
        setSelectedColors(colorDefaults);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    filter === 'all' || product.category === filter
  );

  const categories = ['all', 'patches', 'tees', 'bundles', 'accessories'];

  // Buy Now handler with size and color
  const handleBuyNow = async (product: Product, size: string, color: string) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          size,
          color,
        }),
      });
      const { url, error } = await response.json() as { url?: string; error?: string };
      if (error) {
        if (typeof window !== 'undefined') {
          window.alert(`❌ Checkout error: ${error}`);
        } else {
          console.error(`❌ Checkout error: ${error}`);
        }
        return;
      }
      if (url) {
        if (typeof window !== 'undefined') {
          window.location.href = url;
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      if (typeof window !== 'undefined') {
        window.alert('❌ Something went wrong. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-solo-black">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-solo-red mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading gear...</p>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-solo-black">
      <Navigation />
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const colorOptions = product.imagesByColor ? Object.keys(product.imagesByColor) : ['Black','Athletic Heather','Navy','Red','True Royal','White'];
            const selectedColor = selectedColors[product.id!] || colorOptions[0];
            const imageUrl = product.imagesByColor?.[selectedColor] || product.imageUrl;
            return (
              <>
                <motion.div
                  key={product.id}
                  variants={item}
                  className="group relative bg-gradient-to-b from-white/5 to-white/0 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm hover:border-solo-red/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  onClick={() => setModal({ open: true, product, color: selectedColor })}
                >
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-solo-red/20 text-solo-red border border-solo-red/30 capitalize">
                      {product.category}
                    </span>
                  </div>
                  {/* Product Image */}
                  <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        onClick={e => { e.stopPropagation(); setModal({ open: true, product, color: selectedColor }); }}
                      />
                    ) : (
                      <div className="text-gray-600 text-6xl">📷</div>
                    )}
                  </div>
                  {/* Product Details & Buy UI */}
                  <div className="p-6" onClick={e => e.stopPropagation()}>
                    <h3 className="text-xl font-stencil font-semibold text-white mb-2 group-hover:text-solo-red transition-colors duration-200">
                      {product.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm line-clamp-2">{product.description}</p>
                    {/* Size & Color selectors */}
                    <div className="flex flex-col gap-2 mb-4">
                      {/* Size selector */}
                      <label htmlFor={`size-select-${product.id}`} className="sr-only">
                        Select size for {product.title}
                      </label>
                      <select
                        className="w-full border p-2 rounded bg-gray-900 text-white"
                        defaultValue={product.sizes && product.sizes[0]}
                        id={`size-select-${product.id}`}
                        aria-label={`Select size for ${product.title}`}
                      >
                        {product.sizes && product.sizes.map((size) => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                      {/* Color selector */}
                      <label htmlFor={`color-select-${product.id}`} className="sr-only">
                        Select color for {product.title}
                      </label>
                      <select
                        className="w-full border p-2 rounded bg-gray-900 text-white"
                        value={selectedColor}
                        id={`color-select-${product.id}`}
                        aria-label={`Select color for {product.title}`}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedColors(c => ({ ...c, [product.id!]: e.target.value }))}
                      >
                        {colorOptions.map((color) => (
                          <option key={color} value={color}>{color}</option>
                        ))}
                      </select>
                    </div>
                    {/* Price */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-solo-red">
                          ${product.price}
                        </span>
                      </div>
                      {product.inventory && (
                        <div className="text-green-400 text-xs">
                          {product.inventory} in stock
                        </div>
                      )}
                    </div>
                    <Button
                      className="w-full group/btn"
                      size="lg"
                      onClick={() => {
                        const size = (document.getElementById(`size-select-${product.id}`) as HTMLSelectElement)?.value || '';
                        const color = selectedColors[product.id!] || colorOptions[0];
                        handleBuyNow(product, size, color);
                      }}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                      Buy Now - ${product.price}
                    </Button>
                  </div>
                </motion.div>
              </>
            );
          })}
        </div>
        {/* Modal for expanded product view */}
        {modal.open && modal.product && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setModal({ open: false })}>
            <div className="bg-gray-900 rounded-2xl p-8 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
              <button className="absolute top-2 right-2 text-white text-2xl" onClick={() => setModal({ open: false })}>&times;</button>
              <img
                src={modal.product.imagesByColor?.[modal.color!] || modal.product.imageUrl}
                alt={modal.product.title}
                className="w-full h-auto rounded mb-4"
              />
              <h2 className="text-2xl font-stencil font-bold text-white mb-2">{modal.product.title}</h2>
              <p className="text-gray-300 mb-4">{modal.product.description}</p>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-xl font-bold text-solo-red">${modal.product.price}</span>
                {modal.product.inventory && (
                  <span className="text-green-400 text-xs">{modal.product.inventory} in stock</span>
                )}
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  if (!modal.product) return;
                  const size = modal.product.sizes[0];
                  const color = modal.color!;
                  handleBuyNow(modal.product, size, color);
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Buy Now - ${modal.product.price}
              </Button>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}

export default ShopPage;

// ...existing code...
// ...existing code...
