import { getProductsInStock, Product } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';

// Function to select N random products from a list
function getRandomProducts(products: Product[], n: number): Product[] {
    if (products.length <= n) {
        return products;
    }

    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

// Helper function to get slug from product object
const getProductSlug = (product: Product) => product.type.toLowerCase().replace(/ /g, '-').replace(/[ęśśćżóął]/g, (match) => {
    const replacements: { [key: string]: string } = { 'ę': 'e', 'ś': 's', 'ć': 'c', 'ż': 'z', 'ó': 'o', 'ą': 'a', 'ł': 'l' };
    return replacements[match] || match;
});

export default function DiscountsDefault() {
    const productsInStock = getProductsInStock();
    const discountedProducts = getRandomProducts(productsInStock, 3);

    return (
        <div className="p-4 bg-white/10 rounded-lg shadow-xl">
            <h3 className="text-xl font-bold mb-4 border-b pb-2 text-yellow-400">Promocje Dnia (-10%)</h3>
            <div className="flex flex-col gap-4">
                {discountedProducts.map((p) => {
                    const originalPrice = p.price;
                    const discountedPrice = originalPrice * 0.9;
                    const slug = getProductSlug(p);
                    
                    return (
                        <Link 
                            key={p.id} 
                            href={`/product-list/${slug}/${p.id}`} 
                            className="flex items-center gap-3 p-3 bg-white/5 rounded-md hover:bg-white/10 transition-colors"
                        >
                            <div className="flex-shrink-0 w-12 h-12 relative">
                                <Image 
                                    src={`/${p.image}`} 
                                    alt={p.name} 
                                    fill 
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold text-sm truncate">{p.name}</p>
                                <div className="flex items-center text-sm">
                                    <span className="line-through mr-2 text-red-400">{originalPrice.toFixed(2)} zł</span>
                                    <span className="font-bold text-green-400">{discountedPrice.toFixed(2)} zł</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            {productsInStock.length === 0 && (
                <p className="text-center text-gray-400">Brak produktów na stanie, brak promocji.</p>
            )}
            {discountedProducts.length === 0 && productsInStock.length > 0 && (
                <p className="text-center text-gray-400">Nie wybrano żadnych produktów do promocji.</p>
            )}
        </div>
    );
}