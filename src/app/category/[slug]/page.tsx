import { getProducts, getCategories } from '@/lib/db';
import CategoryClient from '@/components/category/CategoryClient';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const allProducts = getProducts();
    const allCategories = getCategories();

    const category = allCategories.find((c) => c.slug === slug);

    if (!category) {
        notFound();
    }

    return (
        <CategoryClient
            initialProducts={allProducts}
            category={category}
            initialAllCategories={allCategories}
        />
    );
}
