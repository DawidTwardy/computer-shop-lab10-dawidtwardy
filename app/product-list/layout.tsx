import React from 'react';

export default function ProductListLayout({
  children,
  products,
  discounts,
  modal, // Dodajemy slot modal
}: {
  children: React.ReactNode;
  products: React.ReactNode;
  discounts: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full gap-8 relative">
      {/* Slot Modalny */}
      {modal}

      {/* Sekcja Promocji */}
      <section className="w-full">
        {discounts}
      </section>

      {/* Sekcja Główna Produktów */}
      <section className="w-full">
        {products}
      </section>

      {/* Domyślny slot children */}
      {children}
    </div>
  );
}