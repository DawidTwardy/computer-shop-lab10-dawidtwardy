import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="text-center p-12 mt-12 border-2 border-[#bcbcb7] rounded-lg">
            <h1 className="text-4xl text-[#e5e5e1] mb-4">Nie znaleziono zasobu (404)</h1>
            <p className="mb-4">Strona lub produkt, którego szukasz, nie istnieje.</p>
            <p>
                Sprawdź adres URL lub <Link href="/" className="text-[#e5e5e1] underline font-bold transition-colors duration-200 hover:text-[#bcbcb7]">wróć na stronę główną</Link>.
            </p>
        </main>
    );
}