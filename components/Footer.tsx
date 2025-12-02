import Link from 'next/link';
import React from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="text-center py-4 text-[#e5e5e1] mt-8 border-t border-[#bcbcb7]/30 pt-6">
            <p className="m-0">&copy; {currentYear} Dawid Twardy. Wszelkie prawa zastrzeżone.</p>
            <p className="mt-2">
                <Link 
                    href="https://www.pk.edu.pl/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#bcbcb7] no-underline font-bold hover:underline hover:text-white transition-colors"
                >
                    Politechnika Krakowska
                </Link>
            </p>
        </footer>
    );
}