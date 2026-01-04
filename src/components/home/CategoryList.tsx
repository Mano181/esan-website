'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCategories } from '@/hooks/useData';
import { Category } from '@/types';

export default function CategoryList({ initialCategories }: { initialCategories?: Category[] }) {
    const { t } = useLanguage();
    const categories = useCategories(initialCategories);
    const productCategories = categories.filter(c => c.type === 'category');

    return (
        <section id="categories" className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('home.sections.product.title')}</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {productCategories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-brand-300 hover:shadow-md transition-all flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mb-3 text-brand-600">
                                {/* Icon placeholder */}
                                <span className="text-xl font-bold">{t(`data.categories.${category.id}.name`)[0]}</span>
                            </div>
                            <h3 className="font-medium text-gray-900">{t(`data.categories.${category.id}.name`)}</h3>
                            <span className="text-xs text-brand-600 mt-2 font-medium">{t('common.viewProducts')} &rarr;</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
