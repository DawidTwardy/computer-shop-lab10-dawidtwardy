"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

// Prosty interfejs, żeby nie importować z lib/products i nie psuć buildu
interface Product {
    id: number;
    name: string;
    image: string;
}

export default function Modal({ product }: { product: Product }) {
    const router = useRouter();

    return (
        <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => router.back()} // Kliknięcie w tło zamyka modal
        >
            <div 
                className="relative w-full max-w-5xl aspect-video bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Kliknięcie w obrazek NIE zamyka modala
            >
                <button 
                    onClick={() => router.back()}
                    className="absolute top-4 right-4 z-50 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors font-bold text-xl border border-white/20"
                >
                    &times;
                </button>

                <Image
                    src={`/${product.image}`}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="p-8"
                    priority
                />

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <h3 className="text-white text-xl font-bold text-center drop-shadow-md">{product.name}</h3>
                </div>
            </div>
        </div>
    );
}