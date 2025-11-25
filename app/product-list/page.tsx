import { getAllProductsAlphabetically, Product } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductList() {
    const productsToDisplay = getAllProductsAlphabetically(); 

    return (
        <main>
            <h2 className="text-2xl text-center mb-8 font-merriweather">Lista Produktów</h2>
            
            <p className="text-sm text-center mb-6">W tym miejscu w przyszłości zostanie zaimplementowany panel sterowania sortowaniem i filtrowaniem.</p>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-0">
                {productsToDisplay.map((p: Product) => (
                    <li key={p.id} className="border border-[#bcbcb7] p-5 rounded-lg shadow-md bg-white/5 text-center text-[#e5e5e1] flex flex-col">
                        <Link href={`/product-list/${p.id}`} className="hover:text-[#bcbcb7] transition-colors flex-grow">
                            {p.image && (
                                <div className="w-full h-[200px] mb-4 flex justify-center items-center bg-white/10 rounded-md">
                                    <Image 
                                        src={`/${p.image}`} 
                                        alt={p.name} 
                                        width={250} 
                                        height={200} 
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            )}
                            
                            <h4 className="text-lg font-semibold mb-1">{p.name}</h4>
                            <p className="text-sm">Kod: {p.code}</p>
                            <p className="text-base">Typ: {p.type}</p>
                            <p className="text-base">Ilość na stanie: <span className={p.amount > 0 ? "text-green-400 font-bold" : "text-red-400 font-bold"}>{p.amount}</span></p>
                            <p className="text-base mb-4">Cena: <strong className="font-bold">{p.price.toFixed(2)} zł</strong></p>
                        </Link>
                        <button className="mt-auto py-2 px-4 bg-[#bcbcb7] text-[#181817] border-none rounded-md cursor-pointer font-bold hover:bg-[#a3a3a3] transition-colors">
                            Dodaj do koszyka
                        </button>
                    </li>
                ))}
            </ul>
        </main>
    );
}