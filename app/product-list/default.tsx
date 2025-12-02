import React from 'react';

// Ten plik jest wymagany, aby podstrony (np. /product-list/procesor/1) działały.
// Next.js używa go do wyrenderowania slotu "children", gdy nie ma dokładnego dopasowania ścieżki.
export default function DefaultProductListRoot() {
    return null; 
}