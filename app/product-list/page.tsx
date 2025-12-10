'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchProducts, fetchCategories, addToCart } from '@/lib/api';
import Image from 'next/image';
import styles from './page.module.css';
import { slugifyCategoryName } from '@/lib/products'; // DODANY IMPORT

// ZAKTUALIZOWANY INTERFEJS O WŁAŚCIWOŚCI POCHODZĄCE Z API
interface Product {
  id: number;
  name: string;
  code: string;
  price: number;
  amount: number;
  image?: string;
  description?: string;
  type?: string;
  categoryId: number; 
  // DODANO ZAGNIEDŻONY OBIEKT KATEGORII ZWRACANY PRZEZ API
  category: {
    id: number;
    name: string; // Używany do generowania sluga
  };
}

interface Category {
  id: number;
  name: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(productsData as Product[]); 
        setCategories(categoriesData);
      } catch (err) {
        setError('Nie udało się załadować danych');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryId === selectedCategory)
    : products;

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(1, productId, 1); 
      alert('Produkt dodany do koszyka!');
    } catch (err) {
      alert('Błąd przy dodawaniu do koszyka');
    }
  };

  if (loading) return <div className={styles.title}>⏳ Ładowanie produktów...</div>;
  if (error) return <div className={styles.title}>❌ {error}</div>;

  return (
    <main>
      <h2 className={styles.title}>Lista Produktów ({filteredProducts.length})</h2>
      
      {/* Filtry po kategoriach */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Filtruj po kategorii:</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              padding: '8px 15px',
              backgroundColor: selectedCategory === null ? '#333' : '#ddd',
              color: selectedCategory === null ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Wszystkie ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '8px 15px',
                  backgroundColor: selectedCategory === cat.id ? '#333' : '#ddd',
                  color: selectedCategory === cat.id ? '#fff' : '#000',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p>Brak produktów do wyświetlenia</p>
      ) : (
        <ul className={styles.productListGrid}>
          {filteredProducts.map((p: Product) => {
            // GENEROWANIE POPRAWNEGO SLUGA
            const categorySlug = p.category ? slugifyCategoryName(p.category.name) : 'unknown';
            
            return (
              <li key={p.id} className={styles.productListItem}>
                {/* POPRAWIONY LINK Z UŻYCIEM SLUGA: /product-list/<slug>/<id> */}
                <Link href={`/product-list/${categorySlug}/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {p.image && (
                    <div className={styles.productImageContainer}>
                      <Image 
                        src={`/${p.image}`} 
                        alt={p.name} 
                        width={250} 
                        height={200}
                        style={{ objectFit: 'contain' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.png';
                        }}
                      />
                    </div>
                  )}
                  
                  <h4>{p.name}</h4>
                  <p>Kod: {p.code}</p>
                  <p>Typ: {p.type}</p>
                  <p>Cena: <strong>{p.price.toFixed(2)} zł</strong></p>
                  <p>Ilość na stanie: {p.amount}</p>
                </Link>
                <button 
                  onClick={() => handleAddToCart(p.id)}
                  disabled={p.amount <= 0}
                  style={{ 
                    padding: '8px 15px', 
                    backgroundColor: p.amount > 0 ? '#bcbcb7' : '#999', 
                    color: '#181817', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: p.amount > 0 ? 'pointer' : 'not-allowed',
                    fontWeight: 'bold',
                    opacity: p.amount > 0 ? 1 : 0.6,
                    width: '100%',
                  }}
                >
                  {p.amount > 0 ? 'Dodaj do koszyka' : 'Brak na stanie'}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}