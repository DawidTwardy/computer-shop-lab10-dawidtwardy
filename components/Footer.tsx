import Link from 'next/link';
import React from 'react';

// Zgodnie z instrukcją: autor, obecna data (dynamicznie) i link do PK
export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <p>&copy; {currentYear} Dawid Twardy. Wszelkie prawa zastrzeżone.</p>
            <p>
                <Link 
                    href="https://www.pk.edu.pl/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                >
                    Politechnika Krakowska
                </Link>
            </p>
        </footer>
    );
}