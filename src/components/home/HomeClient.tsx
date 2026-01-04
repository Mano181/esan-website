'use client';

import Link from 'next/link';
import Hero from '@/components/home/Hero';
import PurposeGrid from '@/components/home/PurposeGrid';
import CategoryList from '@/components/home/CategoryList';
import SectionHeader from '@/components/ui/SectionHeader';
import { Product, Category } from '@/types';
import { getWhatsappUrl } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';
import { useProducts, useCategories } from '@/hooks/useData';

export default function HomeClient({
    initialProducts,
    initialCategories
}: {
    initialProducts: Product[],
    initialCategories: Category[]
}) {
    const { t } = useLanguage();
    const products = useProducts(initialProducts);
    const categories = useCategories(initialCategories);

    // Extract brands for the mini-brand grid
    const brands = Array.from(new Set(
        products
            .filter(p => p && p.brand)
            .map(p => p.brand)
    )).slice(0, 8);

    return (
        <main className="flex-1 bg-gray-50 pb-20">
            <Hero />

            {/* Shop by Use Section */}
            <section className="py-12" id="purpose">
                <div className="container mx-auto px-4">
                    <PurposeGrid initialCategories={categories} />
                </div>
            </section>

            {/* Shop by Product Section */}
            <section className="py-12 bg-white" id="categories">
                <div className="container mx-auto px-4">
                    <CategoryList initialCategories={categories} />
                </div>
            </section>

            {/* Popular Brands Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        title={t('home.sections.brands.title')}
                        linkText={t('home.sections.brands.link')}
                        linkHref="/brands"
                    />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {brands.map((brand, idx) => (
                            <Link
                                key={idx}
                                href="/brands"
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-center hover:shadow-md transition-all"
                            >
                                <span className="font-bold text-gray-700">{brand}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* WhatsApp Help CTA */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="bg-brand-900 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-brand-900 z-0"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.sections.whatsappHelp.title')}</h2>
                            <p className="text-brand-100 text-lg mb-8 max-w-xl mx-auto">
                                {t('home.sections.whatsappHelp.description')}
                            </p>
                            <a
                                href={getWhatsappUrl(t('whatsapp.messages.hero'))}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-lg"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z" />
                                </svg>
                                {t('home.sections.whatsappHelp.cta')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
