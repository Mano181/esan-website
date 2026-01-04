import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Product, Category } from '@/types';
import products from '@/data/products.json';
import categories from '@/data/categories.json';
import AddToCartButton from '@/components/cart/AddToCartButton';
import { getWhatsappUrl } from '@/config/site';

// Typed data
const allProducts = products as unknown as Product[];
const allCategories = categories as unknown as Category[];

export function generateStaticParams() {
    return allProducts.map((product) => ({
        slug: product.slug,
    }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
    const product = allProducts.find((p) => p.slug === params.slug);

    if (!product) {
        notFound();
    }

    // Find category for breadcrumb
    const category = allCategories.find((c) => c.slug === product.category) || allCategories.find(c => c.id === product.category);

    // Map purpose slugs to names
    const productUsageNames = product.purposes?.map(purposeSlug => {
        const cat = allCategories.find(c => c.slug === purposeSlug);
        return cat ? cat.name : purposeSlug;
    }) || [];

    // WhatsApp Message
    // Determine usage context (use first purpose if available, else 'my project')
    const usageContext = productUsageNames.length > 0 ? productUsageNames[0] : 'my project';

    // WhatsApp Message
    const whatsappUrl = getWhatsappUrl(`Hi ESAN team, I’m interested in ${product.name} for ${usageContext}. Is it available?`);

    return (
        <main className="flex-1 bg-white pb-20">
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-brand-600">Home</Link>
                    <span>/</span>
                    <Link href={`/category/${product.category}`} className="hover:text-brand-600">
                        {category ? category.name : 'Product'}
                    </Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium truncate">{product.name}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Section */}
                    <div className="bg-gray-50 rounded-2xl aspect-square flex items-center justify-center relative overflow-hidden">
                        <span className="text-gray-300 text-6xl font-bold opacity-20 uppercase tracking-widest">
                            {product.brand}
                        </span>
                    </div>

                    {/* Details Section */}
                    <div>
                        <div className="mb-2">
                            <span className="text-sm font-bold text-brand-600 uppercase tracking-wide bg-brand-50 px-3 py-1 rounded-full">
                                {product.brand}
                            </span>
                            {product.stockStatus === 'out_of_stock' && (
                                <span className="ml-2 text-sm font-bold text-red-600 uppercase tracking-wide bg-red-50 px-3 py-1 rounded-full">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

                        {product.shortDescription && (
                            <p className="text-lg text-gray-600 mb-6 border-l-4 border-brand-200 pl-4 italic">
                                {product.shortDescription}
                            </p>
                        )}

                        <div className="text-3xl font-bold text-gray-900 mb-8">₹{product.price}</div>

                        {/* Usage Tags */}
                        {productUsageNames.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Suitable For:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {productUsageNames.map((name, idx) => (
                                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col gap-4">
                            <AddToCartButton product={product} />

                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z" />
                                </svg>
                                Ask ESAN expert on WhatsApp
                            </a>
                        </div>

                        {/* Specifications (if any) */}
                        {product.specifications && Object.keys(product.specifications).length > 0 && (
                            <div className="mt-12 pt-8 border-t border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Specifications</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <div key={key} className="flex justify-between border-b border-gray-50 pb-2">
                                            <span className="text-gray-500">{key}</span>
                                            <span className="font-medium text-gray-900">{value as string}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-8 text-center">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-center text-brand-600 font-medium hover:text-brand-700 transition-colors"
                            >
                                Or ask a doubt on WhatsApp
                            </a>

                            <p className="text-center text-xs text-gray-500 mt-2">
                                Usually replies within 1 hour. Pay via UPI or Cash on Delivery.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
