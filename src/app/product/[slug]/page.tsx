import { getProducts, getCategories } from '@/lib/db';
import ProductClient from '@/components/product/ProductClient';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: { slug: string } }) {
    const allProducts = getProducts();
    const allCategories = getCategories();

    const product = allProducts.find((p) => p.slug === params.slug);

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
