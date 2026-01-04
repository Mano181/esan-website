import { getProducts, getCategories } from '@/lib/db';
import CategoryClient from '@/components/category/CategoryClient';
import { notFound } from 'next/navigation';

export default function CategoryPage({ params }: { params: { slug: string } }) {
    const allProducts = getProducts();
    const allCategories = getCategories();

    const category = allCategories.find((c) => c.slug === params.slug);

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
