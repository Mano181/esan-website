'use client';

import { useState, useMemo } from 'react';
import { Product, Category } from '@/types';
import ProductGrid from '@/components/product/ProductGrid';
import ProductCard from '@/components/product/ProductCard';
import { useLanguage } from '@/context/LanguageContext';

type ProductListWithFiltersProps = {
    products: Product[];
    category: Category;
    allCategories: Category[]; // To look up Usage names
};

type FilterState = {
    brands: string[];
    priceRange: [number, number]; // [min, max]
    uses: string[];
};

export default function ProductListWithFilters({ products, category, allCategories }: ProductListWithFiltersProps) {
    const { t } = useLanguage();
    // Extract unique brands and max price from initial products
    const availableBrands = useMemo(() => Array.from(new Set(products.map(p => p.brand))), [products]);
    const maxPrice = useMemo(() => Math.max(...products.map(p => p.price)), [products]);

    // Extract available uses (only relevant if we are on a Product Category page, not a Purpose page)
    const purposeCategories = allCategories.filter(c => c.type === 'purpose');
    const availableUses = purposeCategories.map(c => ({
        slug: c.slug,
        id: c.id,
        name: t(`data.categories.${c.id}.name`)
    }));

    const [filters, setFilters] = useState<FilterState>({
        brands: [],
        priceRange: [0, maxPrice],
        uses: [],
    });

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const filteredProducts = products.filter(product => {
        // Validation: skip malformed products
        if (!product.id || !product.nameKey || !product.price) {
            console.warn(`Skipping malformed product: ${product.id || 'unknown'}`);
            return false;
        }

        // Brand Filter
        if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
            return false;
        }

        // Price Filter
        if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
            return false;
        }

        // Use Filter
        if (filters.uses.length > 0) {
            const productUses = product.uses || [];
            const hasMatchingUse = filters.uses.some(use => productUses.includes(use));
            if (!hasMatchingUse) return false;
        }

        return true;
    });

    const toggleBrand = (brand: string) => {
        setFilters(prev => ({
            ...prev,
            brands: prev.brands.includes(brand)
                ? prev.brands.filter(b => b !== brand)
                : [...prev.brands, brand]
        }));
    };

    const toggleUse = (useSlug: string) => {
        setFilters(prev => ({
            ...prev,
            uses: prev.uses.includes(useSlug)
                ? prev.uses.filter(u => u !== useSlug)
                : [...prev.uses, useSlug]
        }));
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setFilters(prev => ({ ...prev, priceRange: [0, value] }));
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
                <button
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 w-full justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
                    </svg>
                    {t('filters.title')} {isMobileFilterOpen ? t('filters.close') : ''}
                </button>
            </div>

            {/* Sidebar Filters */}
            <aside className={`lg:w-1/4 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="bg-white p-6 rounded-xl border border-gray-100 sticky top-24">
                    <h3 className="font-bold text-gray-900 mb-6">{t('filters.title')}</h3>

                    {/* Brand Filter */}
                    <div className="mb-8">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">{t('filters.labels.brands')}</h4>
                        <div className="space-y-2">
                            {availableBrands.map(brand => (
                                <label key={brand} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                                    <input
                                        type="checkbox"
                                        checked={filters.brands.includes(brand)}
                                        onChange={() => toggleBrand(brand)}
                                        className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                                    />
                                    {brand}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Filter */}
                    <div className="mb-8">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">
                            {t('filters.labels.maxPrice')}{filters.priceRange[1]}
                        </h4>
                        <input
                            type="range"
                            min="0"
                            max={maxPrice}
                            value={filters.priceRange[1]}
                            onChange={handlePriceChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>₹0</span>
                            <span>₹{maxPrice}</span>
                        </div>
                    </div>

                    {/* Use Filter (Only if not already on a Purpose page) */}
                    {category.type !== 'purpose' && (
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">{t('filters.labels.usage')}</h4>
                            <div className="space-y-2">
                                {availableUses.map(use => (
                                    <label key={use.slug} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            checked={filters.uses.includes(use.slug)}
                                            onChange={() => toggleUse(use.slug)}
                                            className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                                        />
                                        {use.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
                <div className="mb-4 text-sm text-gray-500">
                    {t('filters.status.showing').replace('{count}', filteredProducts.length.toString())}
                </div>

                {filteredProducts.length > 0 ? (
                    <ProductGrid>
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </ProductGrid>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-500">{t('filters.status.noResults')}</p>
                        <button
                            onClick={() => setFilters({ brands: [], priceRange: [0, maxPrice], uses: [] })}
                            className="text-brand-600 font-medium mt-2 hover:underline"
                        >
                            {t('filters.clear')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
