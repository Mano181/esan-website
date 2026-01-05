import { getProducts, getCategories } from '@/lib/db';
import ProductClient from '@/components/product/ProductClient';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const allProducts = getProducts();
    const allCategories = getCategories();

    const product = allProducts.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <ProductClient
            initialProduct={product}
            initialAllCategories={allCategories}
        />
    );
}
