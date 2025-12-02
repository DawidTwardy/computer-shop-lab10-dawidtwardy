import { getProductById } from '@/lib/products';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ImagePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = getProductById(parseInt(id));

    if (!product) notFound();

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 bg-black/80 fixed inset-0 z-[100]">
            <div className="relative w-full max-w-4xl h-[80vh] bg-white/10 rounded-xl overflow-hidden border border-white/20">
                <Image
                    src={`/${product.image}`}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                />
            </div>
            <div className="mt-4 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
                <Link href="/product-list" className="px-4 py-2 bg-white text-black font-bold rounded hover:bg-gray-200">
                    Wróć do sklepu
                </Link>
            </div>
        </div>
    );
}