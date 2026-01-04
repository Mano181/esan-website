import { getProducts, getCategories } from '@/lib/db';
import HomeClient from '@/components/home/HomeClient';

export default function Home() {
  const products = getProducts();
  const categories = getCategories();

  return <HomeClient initialProducts={products} initialCategories={categories} />;
}
