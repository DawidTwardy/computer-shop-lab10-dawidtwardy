import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';
import Modal from './modal'; // Importujemy nasz nowy komponent

export default async function InterceptedImagePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // To pobieranie danych dzieje się na serwerze, więc jest bezpieczne
    const product = getProductById(parseInt(id));

    if (!product) notFound();

    // Przekazujemy dane do komponentu klienta
    return <Modal product={product} />;
}