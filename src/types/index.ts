export type StockStatus = 'in_stock' | 'out_of_stock' | 'pre_order';

export interface Product {
    id: string;
    name: string;
    brand: string;
    category: string; // references category.id
    purposes: string[]; // references purpose.id
    price: number;
    shortDescription: string;
    description: string;
    specifications?: Record<string, string>;
    image: string; // placeholder path
    stockStatus: StockStatus;
    slug: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    type: 'purpose' | 'category';
    image: string;
    tips?: string[];
}
