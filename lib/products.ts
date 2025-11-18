import fs from 'fs';
import path from 'path';

export interface Product {
    id: number;
    code: string;
    name: string;
    type: 'procesor' | 'karta graficzna' | 'pamięć ram' | 'dysk';
    price: number;
    amount: number;
    description: string;
    date: string;
    image: string;
}

const productsFilePath = path.join(process.cwd(), 'data', 'products.json');

function loadProducts(): Product[] {
    try {
        const fileContent = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(fileContent) as Product[];
    } catch (error) {
        return [];
    }
}

function saveProducts(products: Product[]): void {
    try {
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
    } catch (error) {
        console.error('Błąd zapisywania danych produktów');
    }
}

export function getAllProductsAlphabetically(): Product[] {
    const products = loadProducts();
    return products.sort((a, b) => a.name.localeCompare(b.name));
}

export function getAllProductsNewestFirst(): Product[] {
    const products = loadProducts();
    return products.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProductsInStock(): Product[] {
    const products = loadProducts();
    return products.filter(product => product.amount > 0);
}

export function getProductsOutOfStock(): Product[] {
    const products = loadProducts();
    return products.filter(product => product.amount === 0);
}

export function getProductsByType(type: Product['type']): Product[] {
    const products = loadProducts();
    return products.filter(product => product.type === type);
}

export function getProductById(id: number): Product | undefined {
    const products = loadProducts();
    return products.find(product => product.id === id);
}

export function updateProductAmount(id: number, newAmount: number): boolean {
    const products = loadProducts();
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex !== -1) {
        products[productIndex].amount = newAmount;
        saveProducts(products);
        return true;
    }
    return false;
}