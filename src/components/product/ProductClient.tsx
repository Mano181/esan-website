'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Product, Category } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { getWhatsappUrl } from '@/config/site';
import AddToCartButton from '@/components/cart/AddToCartButton';
import { useProducts, useCategories } from '@/hooks/useData';

type ProductClientProps = {
    initialProduct: Product;
    initialAllCategories: Category[];
};

export default function ProductClient({ initialProduct, initialAllCategories }: ProductClientProps) {
    const { t } = useLanguage();
    // We don't necessarily need useProducts here since we only show one product, 
    // BUT we want hot reload for this specific product's metadata if possible.
    // However, if we fetch all products, it's a bit heavy.
    // Let's use useProducts and find the specific one.
    const allProducts = useProducts([initialProduct]);
    const product = allProducts.find(p => p.id === initialProduct.id) || initialProduct;

    const allCategories = useCategories(initialAllCategories);

    const category = allCategories.find((c) => c.slug === product.category) || allCategories.find(c => c.id === product.category);
    const categoryName = category ? t(`data.categories.${category.id}.name`) : t('product.breadcrumbs.default');

    // Map purpose slugs to names
    const productUsageNames = product.uses?.map(purposeSlug => {
        const cat = allCategories.find(c => c.slug === purposeSlug);
        return cat ? t(`data.categories.${cat.id}.name`) : purposeSlug;
    }) || [];

    const usageContext = productUsageNames.join(', ');

    // WhatsApp Message
    const whatsappUrl = getWhatsappUrl(
        t('whatsapp.messages.product')
            .replace('{name}', t(product.nameKey))
            .replace('{usage}', usageContext)
    );

    return (
        <main className="flex-1 bg-white">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
                    <Link href="/" className="hover:text-brand-600 transition-colors">
                        {t('product.breadcrumbs.home')}
                    </Link>
                    <span>/</span>
                    <Link
                        href={category ? `/category/${category.slug}` : "/"}
                        className="hover:text-brand-600 transition-colors"
                    >
                        {categoryName}
                    </Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium truncate">{t(product.nameKey)}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left: Image */}
                    <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 flex items-center justify-center">
                        {/* 
                            In a real app, use next/image with the real product image.
                            Using a placeholder for now.
                        */}
                        <div className="text-brand-100 opacity-20 transform -rotate-12 select-none">
                            <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9l-7-7zM6 20V4h6v5h5v11H6z" />
                            </svg>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                            <div className="w-full h-full relative">
                                <Image
                                    src={product.image}
                                    alt={t(product.nameKey)}
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                        {product.stockStatus === 'out_of_stock' && (
                            <div className="absolute top-6 right-6 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider backdrop-blur-sm bg-opacity-90">
                                {t('product.status.outOfStock')}
                            </div>
                        )}
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <span className="inline-block bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                                {product.brand}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t(product.nameKey)}</h1>

                            {product.shortDescriptionKey && (
                                <p className="text-lg text-gray-600 mb-6 border-l-4 border-brand-200 pl-4 italic">
                                    {t(product.shortDescriptionKey)}
                                </p>
                            )}

                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
                                {product.stockStatus === 'in_stock' && (
                                    <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        Available in Stock
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="space-y-4 mb-10">
                            <AddToCartButton product={product} />

                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-green-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z" />
                                </svg>
                                {t('product.cta.whatsapp')}
                            </a>

                            <p className="text-xs text-center text-gray-500">
                                {t('product.labels.whatsappNote')}
                            </p>
                        </div>

                        <div className="border-t border-gray-100 pt-8 space-y-8">
                            {/* Uses */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">{t('product.labels.suitableFor')}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.uses?.map((pSlug) => {
                                        const cat = allCategories.find(c => c.slug === pSlug);
                                        return (
                                            <span
                                                key={pSlug}
                                                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-brand-50 hover:text-brand-700 transition-colors cursor-default border border-transparent hover:border-brand-100"
                                            >
                                                {cat ? t(`data.categories.${cat.id}.name`) : pSlug}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Specifications */}
                            {product.specifications && Object.keys(product.specifications).length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">{t('product.labels.specifications')}</h3>
                                    <div className="bg-gray-50 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border border-gray-100">
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <div key={key}>
                                                <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{key}</dt>
                                                <dd className="text-gray-900 font-medium">{value}</dd>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Help Box */}
                            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                                <div className="flex gap-4">
                                    <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center text-orange-600 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Still not sure?</h4>
                                        <p className="text-sm text-gray-600 mb-3">Our experts can help you choose the right product for your specific needs.</p>
                                        <a href={whatsappUrl} className="text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 group">
                                            {t('product.cta.whatsappDoubt')} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
