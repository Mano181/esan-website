import Link from 'next/link';
import categories from '@/data/categories.json';
import PurposeCard from '@/components/home/PurposeCard';
import { Category } from '@/types';

export default function PurposeGrid() {
    const purposeCategories = (categories as Category[]).filter(c => c.type === 'purpose');

    return (
        <section id="purpose" className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Shop by Use</h2>
                        <p className="text-gray-600 mt-2">What are you buying for today?</p>
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
