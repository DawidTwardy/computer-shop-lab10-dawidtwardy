"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const path = usePathname();
    
    // Logika sprawdzania, czy link jest aktywny.
    // Działa poprawnie dla '/' oraz dla zagnieżdżonych tras (np. '/product-list' aktywne także dla '/product-list/123').
    const isActive = path.startsWith(href) && (path === href || (href !== '/' && path.charAt(href.length) === '/'));
    
    return (
        <Link
            href={href}
            // Używamy klasy CSS 'active' zdefiniowanej w global.css
            className={isActive ? "active" : undefined}
        >
            {children}
        </Link>
    );
}