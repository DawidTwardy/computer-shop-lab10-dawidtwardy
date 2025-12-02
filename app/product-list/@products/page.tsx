import { getAllProductsAlphabetically, Product, getProductsByType } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// --- Helper numeracji (skopiowany) ---
function getProductCategoryIndex(product: Product) {
    const productsInCategory = getProductsByType(product.type as any)
        .sort((a, b) => a.name.localeCompare(b.name));
    return productsInCategory.findIndex(p => p.id === product.id) + 1;
}

// --- Renderer Listy (skopiowany) ---
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

export default function ProductListPage() {
    const products = getAllProductsAlphabetically();
    return renderProductList(products, "Wszystkie produkty");
}