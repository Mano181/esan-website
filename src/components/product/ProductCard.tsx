import Link from 'next/link';
import { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
    const isOutOfStock = product.stockStatus === 'out_of_stock';

    return (
        <Link
            href={`/product/${product.slug}`}
            className={`group block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow ${isOutOfStock ? 'opacity-75' : ''}`}
        >
            <div className="aspect-square bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    {/* Placeholder for image */}
                    <span className="text-4xl opacity-30">IMG</span>
                </div>
                {isOutOfStock && (
                    <div className="absolute top-2 right-2 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                        Out of Stock
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="text-xs text-brand-600 font-semibold mb-1 uppercase tracking-wide">{product.brand}</div>
                <h3 className="font-medium text-gray-900 group-hover:text-brand-700 transition-colors line-clamp-2 min-h-[3rem]">{product.name}</h3>

                {product.shortDescription && (
                    <p className="text-xs text-gray-600 mt-1 line-clamp-1">{product.shortDescription}</p>
                )}

                <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                    <span className="text-xs text-brand-600 bg-brand-50 px-2 py-1 rounded-full">View Details</span>
                </div>
            </div>
        </Link>
    );
}
