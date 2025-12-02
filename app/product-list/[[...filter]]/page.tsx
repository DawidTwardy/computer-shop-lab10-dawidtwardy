import {
    getAllProductsAlphabetically,
    getProductById,
    getProductsByType,
    Product
} from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

const productTypes = ['procesor', 'karta graficzna', 'pamięć ram', 'dysk'];

// Helper do numeracji
function getProductCategoryIndex(product: Product) {
    const productsInCategory = getProductsByType(product.type)
        .sort((a, b) => a.name.localeCompare(b.name));
    return productsInCategory.findIndex(p => p.id === product.id) + 1;
}

// --- Renderer Szczegółów (Tailwind) ---
function renderProductDetails(product: Product, index: number) {
    const isAvailable = product.amount > 0;
    const stockClass = isAvailable ? 'text-green-400 font-bold' : 'text-red-400 font-bold';
    const imageLinkHref = `/product-list/${product.type.replace(/\s/g, '')}/${index}/image`;

    return (
        <div className="p-6 bg-white/5 rounded-lg max-w-4xl mx-auto text-[#e5e5e1] shadow-xl border border-white/10">
            <Link href="/product-list" className="inline-block mb-6 text-[#bcbcb7] font-bold hover:text-white transition-colors">
                &larr; Powrót do listy
            </Link>
            
            <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-10 items-start">
                <div className="border border-[#bcbcb7]/50 p-4 rounded-lg bg-black/20 flex justify-center items-center">
                    <Link href={imageLinkHref} className="block w-full h-full hover:opacity-80 transition-opacity relative aspect-square">
                        <Image 
                            src={`/${product.image}`}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'contain' }}
                            priority
                            sizes="(max-width: 768px) 100vw, 400px"
                        />
                    </Link>
                </div>

                <div>
                    <h2 className="text-3xl font-sans font-bold mt-0 text-[#bcbcb7] mb-2">
                        {index}. {product.name}
                    </h2>
                    <p className="italic text-gray-400 mb-1">Kategoria: <span className="capitalize">{product.type}</span></p>
                    <p className="font-light text-sm mb-4 text-gray-500">Kod: {product.code}</p>
                    
                    <div className="my-6 p-4 border-l-4 border-[#bcbcb7] bg-white/5 rounded-r">
                        <strong className="block mb-2 text-white">Opis:</strong>
                        <p className="m-0 text-gray-300">{product.description}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-lg">Cena: <strong className="text-3xl text-green-400 ml-2">{product.price.toFixed(2)} zł</strong></p>
                        <p className={stockClass}>
                            Dostępność: {isAvailable ? `Na stanie: ${product.amount} szt.` : 'Chwilowo niedostępny'}
                        </p>
                    </div>
                    
                    {isAvailable && (
                        <button className="mt-4 px-6 py-3 bg-[#bcbcb7] text-[#181817] font-bold rounded hover:bg-white hover:scale-105 transition-all">
                            Dodaj do koszyka
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- Renderer Listy (Tailwind) ---
function renderProductList(products: Product[], title: string) {
    const allProducts = getAllProductsAlphabetically();
    const categories = new Set(allProducts.map(p => p.type));

    return (
        <main className="mx-auto w-full">
            <h2 className="text-3xl font-sans font-bold text-center mb-8 text-white">{title}</h2>

            {/* Filtry */}
            <nav className="mb-8 p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="text-lg font-bold mb-3 pb-2 border-b border-white/20">Filtruj według kategorii:</h4>
                <div className="flex flex-wrap gap-3">
                    <Link href="/product-list" className="px-3 py-1 bg-[#bcbcb7] text-[#181817] rounded hover:bg-white transition-colors text-sm font-bold no-underline">
                        Wszystko
                    </Link>
                    {Array.from(categories).map(cat => (
                        <Link key={cat} href={`/product-list/${cat.replace(/\s/g, '')}`} className="px-3 py-1 bg-white/10 text-white rounded hover:bg-white/20 transition-colors text-sm border border-white/10 no-underline capitalize">
                            {cat}
                        </Link>
                    ))}
                </div>
            </nav>
            
            {/* Grid Produktów */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
                {products.map((p) => {
                    const categoryIndex = getProductCategoryIndex(p);
                    const categorySlug = p.type.replace(/\s/g, '');

                    return (
                        <li key={p.id} className="border border-white/10 p-5 rounded-lg shadow-lg bg-white/5 text-center flex flex-col justify-between hover:bg-white/10 transition-colors">
                            <div>
                                <div className="w-full h-[200px] mb-4 flex justify-center items-center bg-white/10 rounded p-2 relative">
                                    <Image 
                                        src={`/${p.image}`} 
                                        alt={p.name} 
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                                
                                <h4 className="text-lg font-bold mt-2 mb-1 text-white">{categoryIndex}. {p.name}</h4>
                                <p className="text-xs text-gray-400 mb-4">{p.code}</p>
                            </div>
                            
                            <div>
                                <p className="mb-2 text-xl font-bold text-green-400">{p.price.toFixed(2)} zł</p>
                                <p className="text-sm mb-4 text-gray-300">Stan: {p.amount} szt.</p>
                                
                                <Link href={`/product-list/${categorySlug}/${categoryIndex}`} className="block">
                                    <button className="w-full py-2 bg-[#bcbcb7] text-[#181817] font-bold rounded hover:bg-white transition-colors">
                                        Zobacz szczegóły
                                    </button>
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}

export default async function DynamicProductPage({ params }: { params: Promise<{ filter?: string[] }> }) {
    const resolvedParams = await params;
    const filterSegments = resolvedParams.filter;
    
    // 1. Lista
    if (!filterSegments || filterSegments.length === 0) {
        const products = getAllProductsAlphabetically();
        return renderProductList(products, "Wszystkie produkty");
    }

    // 2. Kategoria
    if (filterSegments.length === 1) {
        const categorySegment = filterSegments[0].toLowerCase();
        const foundType = productTypes.find(type => categorySegment === type.replace(/\s/g, '').toLowerCase());

        if (!foundType) notFound();

        const products = getProductsByType(foundType).sort((a, b) => a.name.localeCompare(b.name));
        return renderProductList(products, `Kategoria: ${foundType}`);
    }

    // 3. Szczegóły
    if (filterSegments.length === 2) {
        const categoryFromUrl = filterSegments[0].toLowerCase();
        const productIndex = parseInt(filterSegments[1]);

        if (isNaN(productIndex) || productIndex < 1) notFound();

        const foundType = productTypes.find(type => categoryFromUrl === type.replace(/\s/g, '').toLowerCase());
        if (!foundType) notFound();

        const productsInCategory = getProductsByType(foundType).sort((a, b) => a.name.localeCompare(b.name));
        const product = productsInCategory[productIndex - 1];

        if (!product) notFound();
        
        return renderProductDetails(product, productIndex);
    }
    
    notFound();
}