'use client';

import { getWhatsappUrl } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
    const { t } = useLanguage();

    return (
        <main className="flex-1 bg-white py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('contact.title')}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-brand-700">{t('contact.getInTouch.title')}</h2>
                            <p className="text-gray-600 mb-6">
                                {t('contact.getInTouch.description')}
                            </p>

                            <div className="space-y-4">
                                <a
                                    href={getWhatsappUrl()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-4 hover:bg-gray-50 p-2 rounded-lg transition-colors -ml-2"
                                >
                                    <div className="bg-brand-50 p-3 rounded-full text-brand-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{t('contact.info.phoneWhatsapp')}</h3>
                                        <p className="text-gray-600">+91 98765 43210</p>
                                        <p className="text-xs text-gray-500">{t('contact.info.hours')}</p>
                                    </div>
                                </a>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{t('contact.info.store')}</h3>
                                    <p className="text-gray-600">
                                        {t('footer.contact.address')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="h-64 md:h-full bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-200">
                    <span>Google Maps Placeholder</span>
                </div>
            </div>
        </main>
    );
}
