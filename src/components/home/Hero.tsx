'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative bg-brand-900 text-white overflow-hidden rounded-3xl mx-4 mt-4 mb-12 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900 to-brand-700 opacity-90 z-0"></div>
            {/* Abstract Pattern */}
            <div className="absolute top-0 right-0 p-12 opacity-10">
                <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#FFFFFF" d="M45.7,-70.5C58.9,-62.5,69.3,-49.6,75.9,-35.1C82.5,-20.6,85.3,-4.6,82.4,10.2C79.6,25,71.1,38.6,60.2,49.2C49.3,59.8,35.9,67.3,21.9,71.9C7.9,76.5,-6.7,78.2,-20.4,74.9C-34.1,71.6,-46.9,63.3,-56.9,52.2C-66.9,41.1,-74.1,27.2,-76.3,12.5C-78.5,-2.2,-75.7,-17.7,-67.6,-30.2C-59.5,-42.7,-46.1,-52.2,-32.1,-59.8C-18.1,-67.4,-3.5,-73.1,9.8,-71.4L45.7,-70.5Z" transform="translate(100 100)" />
                </svg>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                        {t('home.hero.title')} <span className="text-brand-300">{t('home.hero.titleHighlight')}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-brand-100 mb-8 max-w-2xl mx-auto md:mx-0">
                        {t('home.hero.description')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                            href="#purpose"
                            className="bg-accent-500 hover:bg-accent-600 text-white text-lg font-semibold px-8 py-3 rounded-full transition-transform transform hover:scale-105 shadow-lg"
                        >
                            {t('home.hero.ctaPrimary')}
                        </Link>
                        <Link
                            href="/shop"
                            className="bg-white/10 hover:bg-white/20 text-white text-lg font-semibold px-8 py-3 rounded-full backdrop-blur-sm transition-colors"
                        >
                            {t('home.hero.ctaSecondary')}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
