import './global.css';
import { Inter } from 'next/font/google';
import React from 'react';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pl">
            <body className={inter.className}>
                <div className="main-container">
                    <header>
                        <h1>Sklep Komputerowy PBE-LAB10</h1>
                        <Navbar />
                    </header>
                    <main>
                        {children}
                    </main>
                    <footer>
                        <p>&copy; 2025 Dawid Twardy. Wszelkie prawa zastrzeżone.</p>
                    </footer>
                </div>
            </body>
        </html>
    );
}