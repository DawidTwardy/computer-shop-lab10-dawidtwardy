import React from 'react';

export default function ProductListLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            {children}
        </section>
    );
}