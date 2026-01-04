import fs from 'fs';
import path from 'path';
import { Product, Category } from '@/types';

const DATA_PATH = path.join(process.cwd(), 'data');

export function getRawProducts(): Product[] {
    try {
        const filePath = path.join(DATA_PATH, 'products.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading products.json:', error);
        return [];
    }
}

export function getRawCategories(): Category[] {
    try {
        const filePath = path.join(DATA_PATH, 'categories.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent);
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
