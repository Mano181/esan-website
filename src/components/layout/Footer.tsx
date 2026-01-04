import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">ESAN</h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Your trusted partner for electrical products in Tamil Nadu.
                        Simplified buying for homeowners and professionals.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link href="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-semibold text-white mb-4">Contact Us</h4>
                    <p className="text-sm text-gray-400 mb-2">Tamil Nadu, India</p>
                    <a href="tel:+919876543210" className="block text-sm text-white hover:text-brand-400 mb-2">+91 98765 43210</a>
                    <a href="mailto:support@esan.in" className="block text-sm text-white hover:text-brand-400">support@esan.in</a>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} ESAN Electricals. All rights reserved.
            </div>
        </footer>
    );
}
