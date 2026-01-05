import fs from 'fs';
import path from 'path';
import { Product, Category } from '@/types';

const DATA_PATH = path.join(process.cwd(), 'data');

export function getRawProducts(): Product[] {
    try {
        const filePath = path.join(DATA_PATH, 'products.json');
        if (!fs.existsSync(filePath)) {
            console.error(`products.json NOT FOUND at ${filePath}`);
            return [];
        }
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        // Transform data to ensure stockStatus exists
        const transformedData = data.map((product: any) => {
            // If stockStatus is missing but inStock exists, map it
            if (!product.stockStatus && 'inStock' in product) {
                return {
                    ...product,
                    stockStatus: product.inStock ? 'in_stock' : 'out_of_stock'
                };
            }
            // Ensure stockStatus has a default if completely missing
            if (!product.stockStatus) {
                return {
                    ...product,
                    stockStatus: 'in_stock'
                };
            }
            return product;
        });


        return transformedData;
    } catch (error) {
        console.error('Error reading products.json:', error);
        return [];
    }
}

export function getRawCategories(): Category[] {
    try {
        const filePath = path.join(DATA_PATH, 'categories.json');
        if (!fs.existsSync(filePath)) {
            console.error(`categories.json NOT FOUND at ${filePath}`);
            return [];
        }
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);
        return data;
    } catch (error) {
        console.error('Error reading categories.json:', error);
        return [];
    }
}

// In-memory cache for production performance
let cachedProducts: Product[] | null = null;
let cachedCategories: Category[] | null = null;

export function getProducts(): Product[] {
    if (process.env.NODE_ENV === 'development') {
        return getRawProducts();
    }

    if (!cachedProducts) {
        cachedProducts = getRawProducts();
    }
    return cachedProducts;
}

export function getCategories(): Category[] {
    if (process.env.NODE_ENV === 'development') {
        return getRawCategories();
    }

    if (!cachedCategories) {
        cachedCategories = getRawCategories();
    }
    return cachedCategories;
}
