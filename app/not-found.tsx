// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="global-not-found">
            <h1>Nie znaleziono strony</h1>
            <p>Strona, której szukasz, nie istnieje.</p>
            <p>
                Sprawdź adres URL lub <Link href="/">wróć na stronę główną</Link>.
            </p>
        </main>
    );
}