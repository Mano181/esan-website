import { useState, useEffect } from 'react';
import { Product, Category } from '@/types';

// Fallback data for production or initial load
// Since we can't easily import from outside src in a way that Nexjet bundles by default without extra config
// We will use the API even in production if we don't want to bundle, 
// BUT the requirement says "Use static build output for performance and stability" in production.
// To achieve this, we can pass initial data from a Server Component.

export function useProducts(initialData: Product[] = []) {
    const [products, setProducts] = useState<Product[]>(initialData);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch from our new Supabase-backed API
                // cache: 'no-store' ensures we always get fresh data
                const res = await fetch('/api/products', { cache: 'no-store' });
                if (!res.ok) throw new Error('Failed to fetch products');

                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return products;
}

export function useCategories(initialData: Category[] = []) {
    const [categories, setCategories] = useState<Category[]>(initialData);

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            const fetchCategories = async () => {
                try {
                    const res = await fetch('/api/data/categories');
                    const data = await res.json();
                    setCategories(data);
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            };

            fetchCategories();
        }
    }, []);

    return categories;
}
