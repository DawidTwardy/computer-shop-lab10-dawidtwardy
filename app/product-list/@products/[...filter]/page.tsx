import {
    getAllProductsAlphabetically,
    getProductsByType,
    Product
} from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

const productTypes = ['procesor', 'karta graficzna', 'pamięć ram', 'dysk'];

// Funkcja usuwająca polskie znaki i spacje do URLi (np. "Pamięć RAM" -> "pamiecram")
function normalizeCategory(type: string) {
    return type.toLowerCase()
        .replace(/ą/g, 'a')
        .replace(/ć/g, 'c')
        .replace(/ę/g, 'e')
        .replace(/ł/g, 'l')
        .replace(/ń/g, 'n')
        .replace(/ó/g, 'o')
        .replace(/ś/g, 's')
        .replace(/ź/g, 'z')
        .replace(/ż/g, 'z')
        .replace(/\s/g, '');
}

function getProductCategoryIndex(product: Product) {
    const productsInCategory = getProductsByType(product.type as any)
        .sort((a, b) => a.name.localeCompare(b.name));
    return productsInCategory.findIndex(p => p.id === product.id) + 1;
}

// --- Renderer Szczegółów ---
function renderProductDetails(product: Product, index: number, discountValue?: number) {
    const isAvailable = product.amount > 0;
    const stockClass = isAvailable ? 'text-green-400 font-bold' : 'text-red-400 font-bold';
    // Używamy ID do linkowania obrazka
    const imageLinkHref = `/product-list/image/${product.id}`;

    const originalPrice = product.price;
    let finalPrice = originalPrice;
    let isDiscounted = false;

    if (discountValue && discountValue > 0 && discountValue < 1) {
        finalPrice = originalPrice * (1 - discountValue);
        isDiscounted = true;
    }

    return (
        <div className="p-6 bg-white/5 rounded-lg max-w-4xl mx-auto text-[#e5e5e1] shadow-xl border border-white/10">
            <Link href="/product-list" className="inline-block mb-6 text-[#bcbcb7] font-bold hover:text-white transition-colors">
                &larr; Powrót do listy
            </Link>
            
            <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-10 items-start">
                <div className="border border-[#bcbcb7]/50 p-4 rounded-lg bg-black/20 flex justify-center items-center">
                    <Link href={imageLinkHref} className="block w-full h-full hover:opacity-80 transition-opacity relative aspect-square cursor-zoom-in">
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
                        <div className="text-lg">
                            Cena: 
                            {isDiscounted ? (
                                <>
                                    <span className="text-red-400 line-through ml-2 text-base">{originalPrice.toFixed(2)} zł</span>
                                    <strong className="text-3xl text-green-400 ml-3">{finalPrice.toFixed(2)} zł</strong>
                                    <span className="ml-2 text-xs text-yellow-400 font-bold border border-yellow-400 px-1 rounded">PROMOCJA</span>
                                </>
                            ) : (
                                <strong className="text-3xl text-green-400 ml-2">{originalPrice.toFixed(2)} zł</strong>
                            )}
                        </div>
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

// --- Renderer Listy ---
function renderProductList(products: Product[], title: string) {
    const allProducts = getAllProductsAlphabetically();
    const categories = new Set(allProducts.map(p => p.type));

    return (
        <main className="mx-auto w-full">
            <h2 className="text-3xl font-sans font-bold text-center mb-8 text-white">{title}</h2>
            <nav className="mb-8 p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="text-lg font-bold mb-3 pb-2 border-b border-white/20">Filtruj według kategorii:</h4>
                <div className="flex flex-wrap gap-3">
                    <Link href="/product-list" className="px-3 py-1 bg-[#bcbcb7] text-[#181817] rounded hover:bg-white transition-colors text-sm font-bold no-underline">
                        Wszystko
                    </Link>
                    {Array.from(categories).map(cat => (
                        <Link key={cat} href={`/product-list/${normalizeCategory(cat)}`} className="px-3 py-1 bg-white/10 text-white rounded hover:bg-white/20 transition-colors text-sm border border-white/10 no-underline capitalize">
                            {cat}
                        </Link>
                    ))}
                </div>
            </nav>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
                {products.map((p) => {
                    const categoryIndex = getProductCategoryIndex(p);
                    const categorySlug = normalizeCategory(p.type);
                    return (
                        <li key={p.id} className="border border-white/10 p-5 rounded-lg shadow-lg bg-white/5 text-center flex flex-col justify-between hover:bg-white/10 transition-colors">
                            <div>
                                <div className="w-full h-[200px] mb-4 flex justify-center items-center bg-white/10 rounded p-2 relative">
                                    <Image src={`/${p.image}`} alt={p.name} fill style={{ objectFit: 'contain' }} sizes="(max-width: 768px) 100vw, 33vw" />
                                </div>
                                <h4 className="text-lg font-bold mt-2 mb-1 text-white">{categoryIndex}. {p.name}</h4>
                                <p className="text-xs text-gray-400 mb-4">{p.code}</p>
                            </div>
                            <div>
                                <p className="mb-2 text-xl font-bold text-green-400">{p.price.toFixed(2)} zł</p>
                                <p className="text-sm mb-4 text-gray-300">Stan: {p.amount} szt.</p>
                                <Link href={`/product-list/${categorySlug}/${categoryIndex}`} className="block">
                                    <button className="w-full py-2 bg-[#bcbcb7] text-[#181817] font-bold rounded hover:bg-white transition-colors">Zobacz szczegóły</button>
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}

export default async function FilteredProductPage({ params, searchParams }: { params: Promise<{ filter: string[] }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    
    let discountValue = 0;
    if (resolvedSearchParams.discount && typeof resolvedSearchParams.discount === 'string') {
        discountValue = parseFloat(resolvedSearchParams.discount);
    }

    const filterSegments = resolvedParams.filter;
    
    // Używamy normalizeCategory do porównania tego co przyszło z URL (np. "pamiecram") z typami w bazie
    const categoryFromUrl = filterSegments[0].toLowerCase(); // URL jest już zazwyczaj lowercase

    // 1. Kategoria
    if (filterSegments.length === 1) {
        // Szukamy typu, który po normalizacji pasuje do URL
        const foundType = productTypes.find(type => normalizeCategory(type) === categoryFromUrl);

        if (!foundType) notFound();

        const products = getProductsByType(foundType as any).sort((a, b) => a.name.localeCompare(b.name));
        return renderProductList(products, `Kategoria: ${foundType}`);
    }

    // 2. Szczegóły
    if (filterSegments.length === 2) {
        const productIndex = parseInt(filterSegments[1]);

        if (isNaN(productIndex) || productIndex < 1) notFound();

        const foundType = productTypes.find(type => normalizeCategory(type) === categoryFromUrl);
        if (!foundType) notFound();

        const productsInCategory = getProductsByType(foundType as any).sort((a, b) => a.name.localeCompare(b.name));
        const product = productsInCategory[productIndex - 1];

        if (!product) notFound();
        
        return renderProductDetails(product, productIndex, discountValue);
    }
    
    notFound();
}