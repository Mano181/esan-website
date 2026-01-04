import Link from 'next/link';
import { Product } from '@/types';
import products from '@/data/products.json';
import { getWhatsappUrl } from '@/config/site';

export default function BrandsPage() {
    // Extract unique brands
    const brands = Array.from(new Set((products as unknown as Product[]).map(p => p.brand)));

    return (
        <main className="flex-1 bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Trusted Brands</h1>
                <p className="text-gray-600 mb-8 max-w-2xl">We partner with the leading manufacturers to bring you safe, durable, and high-quality electrical products.</p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {brands.map((brand, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-center hover:border-brand-300 transition-colors">
                            <span className="text-xl font-bold text-gray-700">{brand}</span>
                        </div>
                    ))}
                    {/* Placeholders for visual balance if needed */}
                    <div className="bg-gray-100 p-8 rounded-xl border border-transparent flex items-center justify-center text-center opacity-50">
                        <span className="text-sm">More coming soon...</span>
                    </div>
                </div>

                <div className="mt-12 bg-white p-8 rounded-xl border border-gray-100 text-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Looking for a specific brand?</h2>
                    <p className="text-gray-600 mb-4">We can source almost any brand available in the market.</p>
                    <a href={getWhatsappUrl()} className="text-brand-600 font-bold hover:underline">Ask us on WhatsApp &rarr;</a>
                </div>
            </div>
        </main>
    );
}
