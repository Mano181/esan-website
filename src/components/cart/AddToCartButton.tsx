"use client";

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

import { Product } from '@/types';

export default function AddToCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            disabled={added}
            className={`w-full font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-95 ${added
                ? 'bg-green-100 text-green-700'
                : 'bg-brand-600 hover:bg-brand-700 text-white'
                }`}
        >
            {added ? (
                <span>Added to Cart ✓</span>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Add to Cart</span>
                </>
            )}
        </button>
    );
}
