'use client';

import Link from 'next/link';
import { useState } from 'react';
import CartBadge from '@/components/cart/CartBadge';
import { getWhatsappUrl } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ta' : 'en');
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 z-20">
                    <span className="text-2xl font-bold tracking-tight text-brand-700">ESAN</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600 items-center">
                    <Link href="/" className="hover:text-brand-600">{t('nav.home')}</Link>
                    <Link href="/#purpose" className="hover:text-brand-600">{t('nav.use')}</Link>
                    <Link href="/#categories" className="hover:text-brand-600">{t('nav.product')}</Link>
                    <Link href="/brands" className="hover:text-brand-600">{t('nav.brands')}</Link>
                    <Link href="/contact" className="hover:text-brand-600">{t('nav.contact')}</Link>

                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="ml-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                        {language === 'en' ? 'தமிழ்' : 'EN'}
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-600 z-20 flex items-center gap-4"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span onClick={(e) => { e.stopPropagation(); toggleLanguage(); }} className="text-sm font-bold bg-gray-100 px-2 py-1 rounded">
                        {language === 'en' ? 'TA' : 'EN'}
                    </span>
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>

                {/* Action Button & Cart */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-4 z-20">
                        <CartBadge />
                        <a
                            href={getWhatsappUrl()}
                            target="_blank"
                            rel="noreferrer"
                            className="hidden md:flex bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors items-center gap-2"
                        >
                            <span>{t('nav.whatsapp')}</span>
                        </a>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-white z-10 flex flex-col pt-24 px-6 md:hidden">
                        <nav className="flex flex-col gap-2">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800 py-3 border-b border-gray-50">{t('nav.home')}</Link>
                            <Link href="/#purpose" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800 py-3 border-b border-gray-50">{t('nav.use')}</Link>
                            <Link href="/#categories" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800 py-3 border-b border-gray-50">{t('nav.product')}</Link>
                            <Link href="/brands" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800 py-3 border-b border-gray-50">{t('nav.brands')}</Link>
                            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800 py-3">{t('nav.contact')}</Link>
                            <hr className="border-gray-100 my-2" />
                            <a
                                href={getWhatsappUrl()}
                                target="_blank"
                                rel="noreferrer"
                                className="flex justify-center bg-brand-600 text-white px-4 py-4 rounded-xl font-bold mt-2"
                            >
                                {t('nav.chatOnWhatsapp')}
                            </a>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
