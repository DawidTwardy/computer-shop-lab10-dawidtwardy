// ZMODYFIKOWANY PLIK: app/basket/page.tsx

import { auth } from "@/lib/auth"; // Import funkcji autentykacji
import { getCartWithItems, getCartTotal, getAllUsersWithCarts, transferCart } from "@/lib/actions/cart";
import { SignIn, SignOut } from "@/components/auth-components";
import { TEMP_USER_ID } from '@/utils/constants'; // Tymczasowy import
import { revalidatePath } from 'next/cache';
import Link from "next/link";
import { redirect } from 'next/navigation';

// Komponent Server-Side
export default async function BasketPage() {
  const session = await auth(); // Pobranie sesji użytkownika (Task 7.1.1b)
  
  // Użyj zalogowanego ID lub tymczasowego ID z seeda dla testów (Task 7.1.1b)
  const userId = session?.user?.id || TEMP_USER_ID; 

  // Wymagane pobieranie danych
  const cart = await getCartWithItems(userId);
  const total = await getCartTotal(userId);
  const users = await getAllUsersWithCarts();
  const isTransferEnabled = users.length > 1; // Włącz transfer jeśli jest więcej niż 1 użytkownik

  // Wewnętrzny komponent dla Formularza Transferu (Task 7.1.4a)
  async function TransferCartForm() {
    'use server';
    
    // Przetwarzanie akcji formularza transferu
    const handleTransfer = async (formData: FormData) => {
        const fromUserId = formData.get('fromUserId') as string;
        const toUserId = formData.get('toUserId') as string;

        if (fromUserId === toUserId) {
             // Walidacja (Task 7.1.4c)
            console.error('Nie można przenieść koszyka do tego samego użytkownika.');
            revalidatePath('/basket'); // Odświeżenie na wypadek błędu
            return;
        }

        try {
            await transferCart(fromUserId, toUserId); // Wywołanie Server Action (Task 7.1.4d)
            revalidatePath('/basket'); // Wymuszenie odświeżenia strony po transferze (Task 7.1.4e)
            // Użycie redirect jest lepsze w kontekście formularzy do zmiany stanu
            // redirect('/basket'); 

        } catch (error) {
            console.error('Błąd podczas transferu koszyka:', (error as Error).message);
        }
    }

    const usersWithCarts = users.filter(u => u.itemCount > 0);
    const usersForTransfer = users.filter(u => u.id !== userId);

    return (
        <div className="mt-10 p-6 border rounded-lg bg-yellow-50">
          <h2 className="text-xl font-bold mb-4">Transfer Koszyka (Dev/Admin)</h2>
          <form action={handleTransfer} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="fromUserId" className="block text-sm font-medium text-gray-700">
                  Od Kogo (koszyk źródłowy)
                </label>
                <select 
                    name="fromUserId" 
                    id="fromUserId" 
                    required 
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Wybierz użytkownika...</option>
                  {/* Lista użytkowników z liczbą produktów w koszyku (Task 7.1.4b) */}
                  {usersWithCarts.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name || user.email} ({user.itemCount} prod.)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="toUserId" className="block text-sm font-medium text-gray-700">
                  Do Kogo (koszyk docelowy)
                </label>
                <select 
                    name="toUserId" 
                    id="toUserId" 
                    required 
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Wybierz użytkownika...</option>
                  {usersForTransfer.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name || user.email} ({user.itemCount} prod.)
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Przenieś Koszyk
            </button>
          </form>
        </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">Koszyk Zakupowy</h1>

        {/* Sekcja Autentykacji (Task 7.1.1) */}
        <div className="flex justify-between items-center mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
            {session ? (
                <div>
                    <p className="text-lg font-semibold text-gray-700">
                        Zalogowano jako: <span className="text-blue-600">{session.user.email}</span> (ID: {session.user.id.substring(0, 8)}...) {/* Wyświetlanie informacji (Task 7.1.1c) */}
                    </p>
                    <div className="mt-2 w-40">
                         <SignOut /> {/* Przycisk wylogowania (Task 7.1.1e) */}
                    </div>
                </div>
            ) : (
                <div className="flex items-center space-x-4">
                    <p className="text-lg font-semibold text-gray-700">Jesteś niezalogowany.</p>
                    <SignIn provider="github" /> {/* Przycisk logowania (Task 7.1.1d) */}
                </div>
            )}
        </div>

        {/* Wyświetlanie koszyka (Task 7.1.3) */}
        {cart && cart.items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Lista produktów (Task 7.1.3b) */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.items.map((item) => (
                        <div key={item.id} className="flex border p-4 rounded-xl items-center bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-20 h-20 mr-4 flex-shrink-0">
                                <img 
                                    src={item.product.image || '/placeholder.jpg'} 
                                    alt={item.product.name} 
                                    className="w-full h-full object-cover rounded-lg" 
                                />
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-xl font-bold">{item.product.name}</h3>
                                <p className="text-sm text-gray-500">{item.product.category.name}</p>
                                <p className="font-semibold text-lg text-gray-800 mt-1">{item.product.price.toFixed(2)} zł</p>
                            </div>
                            <div className="text-right flex flex-col items-end">
                                <p className="text-md text-gray-600">Ilość: <span className="font-bold">{item.quantity}</span></p>
                                <p className="text-xl font-bold text-blue-600 mt-2">
                                    Suma: {(item.product.price * item.quantity).toFixed(2)} zł
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Podsumowanie (Task 7.1.3c) */}
                <div className="lg:col-span-1 border p-6 rounded-xl bg-blue-50 shadow-lg h-fit sticky top-4">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Podsumowanie Zamówienia</h2>
                    <div className="space-y-2 border-b pb-4">
                        {cart.items.map(item => (
                            <div key={item.id} className="flex justify-between text-sm text-gray-600">
                                <span>{item.product.name} x {item.quantity}</span>
                                <span>{(item.product.price * item.quantity).toFixed(2)} zł</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-2xl font-extrabold text-gray-800 border-t pt-4 mt-4">
                        <span>Całkowita wartość:</span>
                        <span>{total.toFixed(2)} zł</span>
                    </div>
                    <button className="w-full mt-6 py-3 bg-green-600 text-white font-bold rounded-lg text-lg hover:bg-green-700 transition-colors">
                        Przejdź do kasy (Task 7.1.3d)
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-2">Darmowa dostawa od 500 zł.</p>
                </div>
            </div>
        ) : (
            // Obsługa pustego koszyka (Task 7.1.3a)
            <div className="text-center p-20 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 bg-white">
                <p className="text-3xl font-bold mb-3">🛒 Twój koszyk jest pusty.</p>
                <p className="text-lg">Dodaj produkty, aby rozpocząć zakupy.</p>
                <Link href="/product-list" className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                    Przejdź do listy produktów
                </Link>
            </div>
        )}

        {/* Funkcja transferu koszyka (Task 7.1.4) */}
        {isTransferEnabled && (
            <TransferCartForm />
        )}
    </div>
  );
}