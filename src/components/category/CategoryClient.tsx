'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Product, Category } from '@/types';
import Link from 'next/link';
import ProductListWithFilters from '@/components/product/ProductListWithFilters';
import { useProducts, useCategories } from '@/hooks/useData';

type CategoryClientProps = {
    initialProducts: Product[];
    category: Category;
    initialAllCategories: Category[];
};

export default function CategoryClient({ initialProducts, category, initialAllCategories }: CategoryClientProps) {
    const { t } = useLanguage();
    const allProducts = useProducts(initialProducts);
    const allCategories = useCategories(initialAllCategories);

    // Filter products based on Type (Purpose vs Category)
    const categoryProducts = allProducts.filter((p) => {
        // Basic validation
        if (!p.id || !p.nameKey) return false;

        if (category.type === 'purpose') {
            return p.uses && p.uses.includes(category.slug);
        } else {
            return p.category === category.slug;
        }
    });

    return (
        <main className="flex-1 bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
                    <Link href="/" className="hover:text-brand-600 transition-colors">{t('product.breadcrumbs.home')}</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">{t(`data.categories.${category.id}.name`)}</span>
                </nav>

                {/* Hero Section */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{t(`data.categories.${category.id}.name`)}</h1>
                    <p className="text-lg text-gray-600 max-w-2xl">{t(`data.categories.${category.id}.description`)}</p>
                </div>

                {/* Main Content with Filters */}
                <ProductListWithFilters
                    products={categoryProducts}
                    category={category}
                    allCategories={allCategories}
                />
            </div>
        </main>
    );
}
