'use client';

import { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useProducts } from '@/hooks/useData';
import Link from 'next/link';

export default function BrandsClient({ initialProducts }: { initialProducts: Product[] }) {
    const { t } = useLanguage();
    const products = useProducts(initialProducts);

    // Extract unique brands
    const brands = Array.from(new Set(
        products
            .filter(p => p && p.brand)
            .map(p => p.brand)
    ));

    return (
        <main className="flex-1 bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('brands.title')}</h1>
                        <p className="text-lg text-gray-600">
                            {t('brands.description')}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                        {brands.map((brand, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-center hover:shadow-md transition-all group"
                            >
                                <span className="text-xl font-bold text-gray-800 group-hover:text-brand-600 transition-colors">{brand}</span>
                            </div>
                        ))}
                        <div className="bg-gray-100/50 p-8 rounded-2xl border border-dashed border-gray-300 flex items-center justify-center text-center">
                            <span className="text-sm font-medium text-gray-500 italic">{t('brands.moreComing')}</span>
                        </div>
                    </div>

                    {/* Sourcing Section */}
                    <div className="bg-brand-50 rounded-3xl p-8 md:p-12 border border-brand-100 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('common.sourceBrand')}</h2>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                            {t('common.sourceBrandText')}
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
                        >
                            {t('common.askOnWhatsapp')}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
