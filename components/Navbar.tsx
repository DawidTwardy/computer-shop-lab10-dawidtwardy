import Link from 'next/link';

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">Strona Główna</Link>
                </li>
                <li>
                    <Link href="/product-list">Lista Produktów</Link>
                </li>
                <li>
                    <Link href="/basket">Koszyk</Link>
                </li>
                <li>
                    <Link href="/order-history">Historia Zakupów</Link>
                </li>
                <li>
                    <Link href="/about">O Sklepie</Link>
                </li>
            </ul>
        </nav>
    );
}