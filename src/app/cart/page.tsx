import CartView from "@/components/cart/CartView";

export default function CartPage() {
    return (
        <main className="flex-1 bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
                <CartView />
            </div>
        </main>
    );
}
