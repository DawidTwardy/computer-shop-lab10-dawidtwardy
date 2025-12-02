"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const path = usePathname();
    const isActive = path.startsWith(href) && (path === href || (href !== '/' && path.charAt(href.length) === '/'));
    
    // Klasy Tailwind
    const baseClasses = "px-3 py-2 rounded transition-colors duration-200 no-underline";
    const activeClasses = "bg-[#bcbcb7] text-[#181817]";
    const inactiveClasses = "text-[#e5e5e1] hover:bg-[#bcbcb7] hover:text-[#181817]";

    return (
        <Link
            href={href}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            {children}
        </Link>
    );
}