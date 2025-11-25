// components/MainHeader.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function MainHeader() {
    return (
        // Zaimplementowane style z `app/global.css` jako klasy Tailwind
        <header className="flex justify-between items-center mb-8 p-0 text-left">
            {/* Odtworzenie struktury z logo PK (link do strony głównej) i tytułem */}
            <div className="flex items-center space-x-4">
                <Link href="/">
                    {/* Logo PK pełniące rolę linka do strony głównej */}
                    <Image
                        src="/politechnika-krakowska-logo.svg"
                        alt="Logo Politechniki Krakowskiej"
                        width={30}
                        height={30}
                        priority
                        className="mr-2"
                    />
                </Link>
                {/* Tytuł */}
                <h1 className="font-['Inter'] text-2xl md:text-3xl text-[#e1e1d7] m-0">
                    Sklep Komputerowy PBE-LAB10
                </h1>
            </div>
            <Navbar />
        </header>
    );
}