import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Product, Category } from '@/types';
import categories from '@/data/categories.json';
import products from '@/data/products.json';
import ProductCard from '@/components/product/ProductCard';
import ProductListWithFilters from '@/components/product/ProductListWithFilters';
import PurposeView from '@/components/purpose/PurposeView';

// Typed data
const allCategories = categories as unknown as Category[];
const allProducts = products as unknown as Product[];

export function generateStaticParams() {
    return allCategories.map((category) => ({
        slug: category.slug,
    }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
    const category = allCategories.find((c) => c.slug === params.slug);

    if (!category) {
        notFound();
    }

    // Filter products based on Type (Purpose vs Category)
    const categoryProducts = allProducts.filter((p) => {
        if (category.type === 'purpose') {
            return p.purposes && p.purposes.includes(category.slug);
        } else {
            return p.category === category.slug;
        }
    });

    // If it's a Purpose category, use the specialized PurposeView
    if (category.type === 'purpose') {
        return <PurposeView category={category} products={categoryProducts} />;
    }

    // Default View for Standard Product Categories
    return (
        <main className="flex-1 bg-gray-50 pb-20">
            {/* Header for Category */}
            <div className="bg-white border-b border-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link href="/" className="hover:text-brand-600">Home</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{category.name}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
                    <p className="text-gray-600 mt-2 max-w-2xl">{category.description}</p>
                </div>
            </div>

            {/* Product Grid with Filters */}
            <div className="container mx-auto px-4 py-8">
                {categoryProducts.length > 0 ? (
                    <ProductListWithFilters
                        products={categoryProducts}
                        category={category}
                        allCategories={allCategories}
                    />
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-500">No products found in this category yet.</p>
                        <Link href="/" className="text-brand-600 font-medium mt-2 inline-block">Back to Home</Link>
                    </div>
                )}
            </div>
        </main>
    );
}
