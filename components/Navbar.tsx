import NavLink from '@/components/NavLink';

export default function Navbar() {
    return (
        <nav>
            <ul className="flex gap-6 font-bold list-none m-0 p-0">
                <li><NavLink href="/">Strona Główna</NavLink></li>
                <li><NavLink href="/product-list">Lista Produktów</NavLink></li>
                <li><NavLink href="/basket">Koszyk</NavLink></li>
                <li><NavLink href="/order-history">Historia</NavLink></li>
                <li><NavLink href="/about">O Sklepie</NavLink></li>
            </ul>
        </nav>
    );
}