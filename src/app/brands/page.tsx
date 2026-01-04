import { getProducts } from '@/lib/db';
import BrandsClient from '@/components/brands/BrandsClient';

export default function BrandsPage() {
    const products = getProducts();
    return <BrandsClient initialProducts={products} />;
}
