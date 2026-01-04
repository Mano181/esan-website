'use client';

import Link from 'next/link';
import { Category } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

type PurposeCardProps = {
    category: Category;
};

export default function PurposeCard({ category }: PurposeCardProps) {
    const { t } = useLanguage();

    return (
        <Link
            href={`/category/${category.slug}`}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
            <div className="aspect-[4/3] bg-gray-200 relative">
                {/* Placeholder for real image */}
                <div className="absolute inset-0 bg-brand-100 flex items-center justify-center text-brand-300">
                    <span className="text-6xl opacity-50">?</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-2xl font-bold mb-1">{t(`data.categories.${category.id}.name`)}</h3>
                    <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {t(`data.categories.${category.id}.description`)}
                    </p>
                </div>
            </div>
        </Link>
    );
}
