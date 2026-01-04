import Link from 'next/link';
import { Category, Product } from '@/types';
import ProductGrid from '@/components/product/ProductGrid';
import ProductCard from '@/components/product/ProductCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { getWhatsappUrl } from '@/config/site';

type PurposeViewProps = {
    category: Category;
    products: Product[];
};

export default function PurposeView({ category, products }: PurposeViewProps) {
    // WhatsApp Message
    const whatsappUrl = getWhatsappUrl(`Hi ESAN team, I want to buy products for ${category.name}.`);

    return (
        <main className="flex-1 bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-brand-900 text-white py-12 md:py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-900 to-brand-800 opacity-90 z-0"></div>
                {/* Abstract Pattern overlay could go here */}

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">{category.name} Use</h1>
                    <p className="text-brand-100 text-lg md:text-xl max-w-2xl mx-auto">{category.description}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                {/* Tips Section */}
                {category.tips && category.tips.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 mb-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="bg-yellow-100 text-yellow-700 p-2 rounded-full text-sm">💡</span>
                            <span>Smart Tips for {category.name}</span>
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {category.tips.map((tip, idx) => (
                                <div key={idx} className="flex gap-3">
                                    <div className="min-w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-bold mt-1">
                                        {idx + 1}
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">{tip}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Products Section */}
                <div className="mb-12">
                    <SectionHeader title="Recommended Products" />
                    {products.length > 0 ? (
                        <ProductGrid>
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </ProductGrid>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                            <p className="text-gray-500">No recommended products added yet.</p>
                        </div>
                    )}
                </div>

                {/* Context Aware CTA */}
                <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Need a complete checklist?</h3>
                    <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                        Don't miss anything for your {category.name.toLowerCase()}. Chat with our expert for a full requirements list.
                    </p>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-full font-bold transition-all shadow-md hover:shadow-lg"
                    >
                        Chat about {category.name}
                    </a>
                </div>
            </div>
        </main>
    );
}
