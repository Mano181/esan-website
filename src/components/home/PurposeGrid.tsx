'use client';

import Link from 'next/link';
import PurposeCard from '@/components/home/PurposeCard';
import { Category } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCategories } from '@/hooks/useData';

export default function PurposeGrid({ initialCategories }: { initialCategories?: Category[] }) {
    const { t } = useLanguage();
    const allCategories = useCategories(initialCategories);
    const purposeCategories = allCategories.filter(c => c.type === 'purpose');

    return (
        <section id="purpose" className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{t('home.sections.use.title')}</h2>
                        <p className="text-gray-600 mt-2">{t('home.sections.use.description')}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {purposeCategories.map((category) => (
                        <PurposeCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </section>
    );
}
