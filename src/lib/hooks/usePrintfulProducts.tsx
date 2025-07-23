import { useState, useEffect } from 'react';

export interface Product {
  title: string;
  thumbnail_url: string;
  price: string;
}

export default function usePrintfulProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        const data = await res.json();

        // Check if response is ok and data is an array
        if (!res.ok || !Array.isArray(data)) {
          throw new Error('Unexpected response from API');
        }

        // Data is already the product array - no need for .result or .map()
        setProducts(data);
        setError(null);
        
        console.log('Loaded Printful products:', data);
      } catch (err: any) {
        console.error('Error loading products:', err);
        setError(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}
