import {
    getAllProductsAlphabetically,
    getAllProductsNewestFirst,
    getProductsInStock,
    getProductsOutOfStock,
    getProductsByType,
    getProductById,
    updateProductAmount,
    Product
} from '@/lib/products';
import Image from 'next/image';
import styles from './page.module.css';

// Ponowne uruchomienie logiki testowej
const TEST_INITIAL_AMOUNT = 15;
const TEST_NEW_AMOUNT = 99;

// Ustawienie wartości początkowej przed testem
updateProductAmount(1, TEST_INITIAL_AMOUNT); 

const allAlpha = getAllProductsAlphabetically();
const newest = getAllProductsNewestFirst();
const inStock = getProductsInStock();
const outOfStock = getProductsOutOfStock();
const gpus = getProductsByType('karta graficzna');
const product1BeforeUpdate = getProductById(1);

// Wykonanie mutacji i pobranie wyniku
const initialAmount = product1BeforeUpdate?.amount || 0;
const updateSuccess = updateProductAmount(1, TEST_NEW_AMOUNT);
const product1AfterUpdate = getProductById(1);

export default function ProductList() {
    // Ograniczamy listę do 9 produktów
    const productsToDisplay = allAlpha.slice(0,100); 

    return (
        <main>
            <h2 className={styles.title}>Lista Produktów (Test Siatki i Funkcji)</h2>
            
            <h3>Produkty na sprzedaż </h3>
            
            {/* Siatka produktów z obrazami */}
            <ul className={styles.productListGrid}>
                {productsToDisplay.map((p: Product) => (
                    <li key={p.id} className={styles.productListItem}>
                        {p.image && (
                            <div className={styles.productImageContainer}>
                                <Image 
                                    src={`/${p.image}`} 
                                    alt={p.name} 
                                    width={250} 
                                    height={200} 
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        )}
                        
                        <h4>{p.name}</h4>
                        <p>Kod: {p.code}</p>
                        <p>Cena: <strong>{p.price.toFixed(2)} zł</strong></p>
                        <p>Ilość na stanie: {p.amount}</p>
                        <button style={{ padding: '8px 15px', backgroundColor: '#bcbcb7', color: '#181817', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Dodaj do koszyka
                        </button>
                    </li>
                ))}
            </ul>

            <hr />
            
            {/* Sekcja testowania funkcji */}
            <div className={styles.testSection}>
                <h3 className={styles.testHeader}>Testy Weryfikacyjne Funkcji</h3>
                <p>1. Pierwszy produkt alfabetycznie: {allAlpha[0].name}</p>
                <p>2. Najnowszy produkt: {newest[0].name}</p>
                <p>3. Liczba na stanie: {inStock.length}</p>
                <p>4. Liczba brakujących: {outOfStock.length}</p>
                <p>5. Liczba kart graficznych: {gpus.length}</p>

                <h4 className={styles.testHeader}>Test Mutacji (ID 1)</h4>
                <p>Nazwa: {product1BeforeUpdate?.name}</p>
                <p>Ilość przed aktualizacją: {initialAmount} (Oczekiwane {TEST_INITIAL_AMOUNT})</p>
                <p>Wynik operacji `updateProductAmount(1, {TEST_NEW_AMOUNT})`: {updateSuccess ? 'Sukces' : 'Błąd'}</p>
                <p>Ilość po aktualizacji: {product1AfterUpdate?.amount} (Oczekiwane {TEST_NEW_AMOUNT})</p>
            </div>
        </main>
    );
}