import { getAllProductsAlphabetically, getProductsByType, Product } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';

// Helper do numeracji (identyczny jak w liście produktów)
function getProductCategoryIndex(product: Product) {
    const productsInCategory = getProductsByType(product.type as any)
        .sort((a, b) => a.name.localeCompare(b.name));
    return productsInCategory.findIndex(p => p.id === product.id) + 1;
}

function getRandomProducts(products: Product[], count: number) {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

export default function DiscountsPage() {
    const allProducts = getAllProductsAlphabetically();
    // Pobieramy 3 losowe produkty do promocji
    const randomProducts = getRandomProducts(allProducts, 3);

    return (
        <div className="mb-8 p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center gap-2">
                🔥 Gorące Promocje (-10%)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {randomProducts.map(product => {
                    const originalPrice = product.price;
                    const discountedPrice = (originalPrice * 0.9).toFixed(2);
                    
                    // Obliczamy indeks i slug, aby stworzyć poprawny link
                    const categoryIndex = getProductCategoryIndex(product);
                    const categorySlug = product.type.replace(/\s/g, '');
                    
                    // DODANO: Parametr discount=0.1 w adresie URL
                    const productLink = `/product-list/${categorySlug}/${categoryIndex}?discount=0.1`;

                    return (
                        <Link 
                            key={product.id} 
                            href={productLink}
                            className="block bg-white/5 p-4 rounded-lg border border-white/10 hover:border-yellow-500/50 transition-all hover:bg-white/10 group no-underline"
                        >
                            <div className="relative h-40 mb-3 bg-white/5 rounded-md p-2">
                                <Image
                                    src={`/${product.image}`}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    className="group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <h4 className="font-bold text-sm mb-2 truncate text-white group-hover:text-yellow-400 transition-colors">
                                {product.name}
                            </h4>
                            <div className="flex items-center gap-3">
                                <span className="text-red-400 line-through text-sm">{originalPrice.toFixed(2)} zł</span>
                                <span className="text-green-400 font-bold text-lg">{discountedPrice} zł</span>
                            </div>
                            <span className="text-xs text-gray-400 mt-3 block text-right group-hover:text-white transition-colors">
                                Zobacz szczegóły &rarr;
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}