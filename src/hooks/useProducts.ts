import { useState, useEffect } from 'react';
import { Product } from '@/types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/data/products.json');
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/data/products.json');
      const data = await response.json();
      // Extract unique categories from products
      const uniqueCategories = Array.from(new Set(data.map((p: Product) => p.category)));
      setCategories(uniqueCategories as string[]);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories([]);
    }
  };

  const fetchProductById = async (id: number): Promise<Product | null> => {
    try {
      const response = await fetch('/data/products.json');
      const data = await response.json();
      return data.find((p: Product) => p.id === id) || null;
    } catch (err) {
      console.error('Error fetching product:', err);
      return null;
    }
  };

  const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
      const response = await fetch('/data/products.json');
      const data = await response.json();
      return data.filter((p: Product) => p.category === category);
    } catch (err) {
      console.error('Error fetching products by category:', err);
      return [];
    }
  };

  const searchProducts = async (query: string): Promise<Product[]> => {
    try {
      const response = await fetch('/data/products.json');
      const data = await response.json();
      return data.filter((p: Product) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      );
    } catch (err) {
      console.error('Error searching products:', err);
      return [];
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    fetchProductsByCategory,
    searchProducts,
    refetch: () => fetchProducts(),
  };
}