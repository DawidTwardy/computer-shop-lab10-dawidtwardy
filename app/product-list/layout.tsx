import React from 'react';

export default function ProductListLayout({
  children,
  products,
  discounts,
}: {
  children: React.ReactNode;
  products: React.ReactNode;
  discounts: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full gap-8">
      {/* Sekcja Promocji (Slot @discounts) */}
      <section className="w-full">
        {discounts}
      </section>

      {/* Sekcja Główna Produktów (Slot @products) */}
      <section className="w-full">
        {products}
      </section>

      {/* Domyślny slot children */}
      {children}
    </div>
  );
}