import {
    getAllProductsAlphabetically,
    getProductById,
    getProductsByType
} from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

const productTypes = ['procesor', 'karta graficzna', 'pamięć ram', 'dysk'];

// --- Helper: Pobiera numer produktu w jego kategorii (1, 2, 3...) ---
function getProductCategoryIndex(product) {
    const productsInCategory = getProductsByType(product.type)
        .sort((a, b) => a.name.localeCompare(b.name));
    
    // Zwracamy indeks + 1 (bo ludzie liczą od 1)
    return productsInCategory.findIndex(p => p.id === product.id) + 1;
}

// --- Renderer szczegółów produktu ---
function renderProductDetails(product, index) {
    const isAvailable = product.amount > 0;
    const stockClass = isAvailable ? 'in-stock' : 'out-of-stock';
    
    // Link do obrazka również używa indeksu
    const imageLinkHref = `/product-list/${product.type.replace(/\s/g, '')}/${index}/image`;

    return (
        <div className="product-details-container">
            <Link href="/product-list" className="back-link">
                &larr; Powrót do listy
            </Link>
            
            <div className="product-details-grid">
                <div className="image-box">
                    <Link href={imageLinkHref} style={{ display: 'block' }}>
                        <Image 
                            src={`/${product.image}`}
                            alt={product.name}
                            width={400}
                            height={400}
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </Link>
                </div>

                <div>
                    <h2 style={{ fontSize: '2.5rem', marginTop: 0, color: '#bcbcb7' }}>
                        {index}. {product.name}
                    </h2>
                    <p style={{ fontStyle: 'italic', color: '#e5e5e1' }}>Kategoria: {product.type}</p>
                    <p style={{ fontWeight: 300 }}>Kod produktu: {product.code}</p>
                    
                    <div style={{ margin: '20px 0', padding: '15px', borderLeft: '3px solid #bcbcb7', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                        <strong style={{ display: 'block', marginBottom: '8px' }}>Opis:</strong>
                        <p style={{ margin: 0 }}>{product.description}</p>
                    </div>

                    <p style={{ marginBottom: '8px' }}>Cena: <strong style={{ fontSize: '1.8rem', color: '#79d279' }}>{product.price.toFixed(2)} zł</strong></p>
                    <p className={stockClass}>
                        Dostępność: {isAvailable ? `Na stanie: ${product.amount} szt.` : 'Chwilowo niedostępny'}
                    </p>
                    
                    {isAvailable && (
                        <button className="buy-button">Dodaj do koszyka</button>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- Renderer listy produktów ---
function renderProductList(products, title) {
    const categoryLinkStyle = { padding: '5px 10px', backgroundColor: '#bcbcb7', color: '#181817', borderRadius: '4px', textDecoration: 'none' };
    const categoryFilterStyle = { padding: '5px 10px', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#e5e5e1', borderRadius: '4px', textDecoration: 'none' };

    const allProducts = getAllProductsAlphabetically();
    const categories = new Set(allProducts.map(p => p.type));

    return (
        <main style={{ margin: '0 auto' }}>
            <h2 style={{ fontSize: '24px', color: '#e5e5e1', marginBottom: '30px', textAlign: 'center' }}>{title}</h2>

            <nav style={{ marginBottom: '20px', border: '1px solid #bcbcb7', padding: '15px', borderRadius: '5px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                <h4 style={{ margin: '0 0 10px 0', paddingBottom: '5px', borderBottom: '1px solid #bcbcb7' }}>Filtruj według kategorii:</h4>
                <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', listStyle: 'none', padding: 0, margin: 0 }}>
                    <li>
                        <Link href="/product-list" style={categoryLinkStyle}>
                            Wszystko
                        </Link>
                    </li>
                    {Array.from(categories).map(cat => (
                        <li key={cat}>
                            <Link href={`/product-list/${cat.replace(/\s/g, '')}`} style={categoryFilterStyle}>
                                {cat}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            
            <ul className="product-list-grid">
                {products.map((p) => {
                    const categoryIndex = getProductCategoryIndex(p);
                    const categorySlug = p.type.replace(/\s/g, '');

                    return (
                        <li key={p.id} className="product-list-item">
                            <div style={{ width: '100%', height: '200px', marginBottom: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}>
                                <Image 
                                    src={`/${p.image}`} 
                                    alt={p.name} 
                                    width={250} 
                                    height={200} 
                                    style={{ objectFit: 'contain' }}
                                    priority
                                />
                            </div>
                            
                            <h4 style={{ marginTop: 0 }}>{categoryIndex}. {p.name}</h4>
                            <p>Kod: {p.code}</p>
                            <p style={{ marginBottom: '10px' }}>Cena: <strong>{p.price.toFixed(2)} zł</strong></p>
                            <p style={{ marginBottom: '15px' }}>Ilość na stanie: {p.amount}</p>
                            
                            <Link href={`/product-list/${categorySlug}/${categoryIndex}`} style={{ display: 'block' }}>
                                <button className="buy-button">
                                    Zobacz szczegóły
                                </button>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}

export default async function DynamicProductPage({ params }) {
    const resolvedParams = await params;
    const filterSegments = resolvedParams.filter;
    
    // Scenariusz 1: Wszystkie produkty
    if (!filterSegments || filterSegments.length === 0) {
        const products = getAllProductsAlphabetically();
        return renderProductList(products, "Wszystkie produkty (alfabetycznie)");
    }

    // Scenariusz 2: Filtrowanie po kategorii
    if (filterSegments.length === 1) {
        const categorySegment = filterSegments[0].toLowerCase();
        const foundType = productTypes.find(type => categorySegment === type.replace(/\s/g, '').toLowerCase());

        if (!foundType) {
            notFound();
        }

        const products = getProductsByType(foundType).sort((a, b) => a.name.localeCompare(b.name));
        return renderProductList(products, `Produkty w kategorii: ${foundType}`);
    }

    // Scenariusz 3: Szczegóły produktu (na podstawie INDEKSU)
    if (filterSegments.length === 2) {
        const categoryFromUrl = filterSegments[0].toLowerCase();
        const productIndex = parseInt(filterSegments[1]);

        if (isNaN(productIndex) || productIndex < 1) {
            notFound();
        }

        const foundType = productTypes.find(type => categoryFromUrl === type.replace(/\s/g, '').toLowerCase());
        
        if (!foundType) {
            notFound();
        }

        const productsInCategory = getProductsByType(foundType).sort((a, b) => a.name.localeCompare(b.name));
        const product = productsInCategory[productIndex - 1];

        if (!product) {
            notFound();
        }
        
        return renderProductDetails(product, productIndex);
    }
    
    notFound();
}