"use client";

import { useCart } from '@/context/CartContext';
import { getWhatsappUrl } from '@/config/site';
import Link from 'next/link';

export default function CartView() {
    const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    const handleCheckout = () => {
        // Format message
        let message = "Hi, I would like to place an order for the following items:\n\n";
        items.forEach(item => {
            message += `- ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}\n`;
        });
        message += `\nTotal: ₹${cartTotal}`;
        message += `\n\nPlease confirm availability and delivery details.`;

        const whatsappUrl = getWhatsappUrl(message);

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link href="/" className="bg-brand-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-700 transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="lg:w-2/3">
                <div className="space-y-6">
                    {items.map(item => (
                        <div key={item.id} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm items-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                                <span className="text-xs text-gray-400">IMG</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
                                <div className="text-gray-500 text-sm">₹{item.price}</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                                >
                                    -
                                </button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-400 hover:text-red-500 p-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Summary */}
            <div className="lg:w-1/3">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold">₹{cartTotal}</span>
                    </div>
                    <div className="border-t border-gray-100 pt-4 mb-6">
                        <div className="flex justify-between">
                            <span className="text-lg font-bold text-gray-900">Total</span>
                            <span className="text-lg font-bold text-brand-600">₹{cartTotal}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform transform active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.02.618 1.97.962 3.164.962 1.017 0 3.864 0 5.626-6.104 3.094-11.458-5.325-11.238-5.984-11.238zm1.092 3.843c.123-1.097 2.112-2.316 2.373-1.743.201.442.175.767-.024 1.127-.234.42-3.111 2.531-1.352 1.346zm-2.072 2.383c.257-.022 1.983-.346 1.983-.346s-.103.882-.244 1.232c-.22.545-.557 1.206-1.543 1.986-.713.565-1.574.629-1.996.657-.597.04-1.391.077-2.618-.453-1.428-.617-2.628-2.227-2.628-2.227s-.198-.244-.249-.311c-.551-.715-.717-1.124-.717-1.63 0-1.287 1.282-2.126 1.282-2.126s.215-.224.582-.224c.241 0 .439.113.553.25.132.16.541 1.358.541 1.358s.229.475.051.782c-.12.204-.326.571-.326.571s-.073.18-.008.334c.16.376 1.098 1.97 2.68 2.583.504.195.897.106.897.106s.312-.116.543-.377c.219-.248.495-.732.495-.732z" />
                        </svg>
                        <span>Send Order to WhatsApp</span>
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-4">
                        Order details will be sent to our team directly.
                    </p>
                </div>
            </div>
        </div>
    );
}
