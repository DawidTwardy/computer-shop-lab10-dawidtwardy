import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="text-center p-12 mt-12 border-2 border-[#bcbcb7] rounded-lg bg-white/5">
            <h1 className="text-4xl text-[#e5e5e1] mb-4 font-sans font-bold">404 - Nie znaleziono</h1>
            <p className="mb-6 text-lg">Strona lub produkt, którego szukasz, nie istnieje.</p>
            <Link 
                href="/" 
                className="inline-block px-6 py-2 bg-[#bcbcb7] text-[#181817] font-bold rounded hover:bg-white transition-colors"
            >
                Wróć na stronę główną
            </Link>
        </main>
    );
}