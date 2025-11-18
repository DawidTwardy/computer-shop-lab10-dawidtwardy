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

const TEST_INITIAL_AMOUNT = 15;
const TEST_NEW_AMOUNT = 99;

updateProductAmount(1, TEST_INITIAL_AMOUNT); 

const allAlpha = getAllProductsAlphabetically();
const newest = getAllProductsNewestFirst();
const inStock = getProductsInStock();
const outOfStock = getProductsOutOfStock();
const gpus = getProductsByType('karta graficzna');
const product1BeforeUpdate = getProductById(1);

const initialAmount = product1BeforeUpdate?.amount || 0;
const updateSuccess = updateProductAmount(1, TEST_NEW_AMOUNT);
const product1AfterUpdate = getProductById(1);

export default function ProductList() {
    return (
        <main className="p-4">
            <h2>Lista Produktów (Test Funkcji)</h2>
            <p>Łączna liczba produktów: {allAlpha.length}</p>
            
            <hr />

            <h3>1. Wszystkie produkty (Alfabetycznie, 3 pierwsze)</h3>
            <ul>
                {allAlpha.slice(0, 3).map((p: Product) => (
                    <li key={p.id}>{p.name} (ID: {p.id})</li>
                ))}
            </ul>

            <h3>2. Najnowsze produkty (3 pierwsze)</h3>
            <ul>
                {newest.slice(0, 3).map((p: Product) => (
                    <li key={p.id}>{p.name} (Data: {new Date(p.date).toLocaleDateString()})</li>
                ))}
            </ul>

            <h3>3. Produkty na stanie (amount {'>'} 0)</h3>
            <p>Liczba produktów na stanie: {inStock.length}</p>

            <h3>4. Produkty bez stanu (amount = 0)</h3>
            <p>Liczba produktów bez stanu: {outOfStock.length}</p>

            <h3>5. Produkty kategorii 'Karta graficzna'</h3>
            <p>Liczba kart graficznych: {gpus.length}</p>
            <ul>
                {gpus.slice(0, 3).map((p: Product) => (
                    <li key={p.id}>{p.name}</li>
                ))}
            </ul>

            <hr />

            <h3>6. & 7. Test wybranego produktu (ID 1) i mutacji</h3>
            <p>Nazwa: {product1BeforeUpdate?.name}</p>
            <p>Ilość przed aktualizacją: {initialAmount} (Oczekiwane {TEST_INITIAL_AMOUNT})</p>
            <p>Wynik operacji `updateProductAmount(1, {TEST_NEW_AMOUNT})`: {updateSuccess ? 'Sukces' : 'Błąd'}</p>
            <p>Ilość po aktualizacji: {product1AfterUpdate?.amount} (Oczekiwane {TEST_NEW_AMOUNT})</p>
        </main>
    );
}