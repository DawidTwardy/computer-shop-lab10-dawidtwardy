import './global.css';
import { Inter, Merriweather } from 'next/font/google';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({ 
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const merriweather = Merriweather({
    weight: ['300', '400', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-merriweather',
    display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pl" className={`${inter.variable} ${merriweather.variable}`}>
            <body className={`${inter.className} bg-[#8989e0] text-[#e5e5e1] min-h-screen flex flex-col selection:bg-[#bcbcb7] selection:text-[#181817]`}>
                <div className="w-[95%] max-w-7xl mx-auto my-6 flex-grow flex flex-col">
                    
                    {/* Header bez animacji ruchu logo */}
                    <header className="flex flex-col md:flex-row justify-between items-center mb-12 py-4 px-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 sticky top-4 z-50 transition-all duration-300 hover:bg-white/15">
                        {/* Usunięto hover:scale-105 */}
                        <Link href="/" className="flex items-center no-underline text-[#e1e1d7] hover:text-white transition-colors group mb-4 md:mb-0">
                            {/* Usunięto group-hover:rotate-12 i transition-transform */}
                            <div className="bg-white p-1.5 rounded-full mr-4 shadow-lg">
                                <Image
                                    src="/politechnika-krakowska-logo.svg"
                                    alt="Logo Politechniki Krakowskiej"
                                    width={40}
                                    height={40}
                                    priority
                                />
                            </div>
                            <h1 className="font-sans text-xl md:text-2xl m-0 font-bold tracking-wide drop-shadow-md">
                                Sklep <span className="text-white">PBE-LAB11</span>
                            </h1>
                        </Link>
                        
                        <div className="w-full md:w-auto overflow-x-auto">
                            <Navbar />
                        </div>
                    </header>
                    
                    <main className="flex-grow py-2 px-2 md:px-4">
                        {children}
                    </main>
                    
                    <Footer />
                </div>
            </body>
        </html>
    );
}