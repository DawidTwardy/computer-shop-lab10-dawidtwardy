import './global.css';
import { Inter } from 'next/font/google';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; // Dodaj import Footer
import Link from 'next/link'; // Wymagany dla logo/linku
import Image from 'next/image'; // Wymagany dla logo

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pl">
            <body className={inter.className}>
                <div className="main-container">
                    
                    {/* Zmieniamy istniejący header, dodając logo PK jako link */}
                    <header>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                            <Image
                                src="/politechnika-krakowska-logo.svg"
                                alt="Logo Politechniki Krakowskiej"
                                width={50}
                                height={50}
                                priority
                                style={{marginRight: '15px'}}
                            />
                            {/* Zmieniamy z PBE-LAB10 na PBE-LAB11 */}
                            <h1 style={{margin: 0, fontSize: '1.5rem'}}>Sklep Komputerowy PBE-LAB11</h1>
                        </Link>
                        <Navbar />
                    </header>
                    
                    <main>
                        {children}
                    </main>
                    
                    {/* Wstawiamy komponent stopki */}
                    <Footer />
                    
                </div>
            </body>
        </html>
    );
}