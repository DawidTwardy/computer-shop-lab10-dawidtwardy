# Computer Shop - Next.js BackEnd Programming Labs (LAB 11)

Projekt rozwijany w ramach laboratorium Programowania BackEnd na Politechnice Krakowskiej (KIS). Aplikacja stanowi jednostronicowy (SPA) sklep internetowy zbudowany w oparciu o framework **Next.js App Router** i stylizowany za pomocą **Tailwind CSS**.

## Kluczowe Zaimplementowane Funkcjonalności (Lab 11)

W ramach tego laboratorium skupiono się na zaawansowanych mechanizmach routingu i renderowania w Next.js:

### 1. Architektura Routingu

* **Routing Dynamiczny i Catch-all (`[...filter]`):** Implementacja elastycznego systemu tras pozwalającego na filtrowanie produktów według kategorii (np. `/product-list/procesor`) oraz wyświetlanie szczegółów konkretnego produktu (np. `/product-list/procesor/1`).
    * Wprowadzono **normalizację nazw kategorii (np. "pamiecram")** w URL, aby wyeliminować problemy z kodowaniem polskich znaków.
* **Trasy Równoległe (Parallel Routes):** Równoczesne renderowanie niezależnych sekcji na tym samym poziomie trasy:
    * `@products`: Główna lista i filtry produktów.
    * `@discounts`: Dynamiczna sekcja promocji.
    * `@modal`: Warstwowe okno do wyświetlania obrazów.

### 2. Interaktywność i Renderowanie

* **Trasy Przechwytujące (Intercepting Routes):** Zaimplementowano wyświetlanie obrazka produktu w oknie modalnym. Kliknięcie obrazka na stronie szczegółów **przechwytuje** trasę i ładuje widok w modalu, zachowując kontekst poprzedniej strony.
* **Linkowanie Głębokie (Deep Linking):** Odświeżenie strony z otwartym modalem lub bezpośrednie wejście na adres obrazka (np. `/product-list/image/1`) ładuje go jako pełną, osobną stronę.
* **Obsługa Rabatu:** Strona szczegółów dynamicznie przelicza i wyświetla cenę z rabatem przekazanym jako parametr zapytania w URL (np. `?discount=0.1`).
* **Next.js Renderowanie:** Wykorzystanie komponentów serwerowych (Server Components) do pobierania danych (używając `fs`) oraz komponentów klienckich (Client Components, np. w modalu) do obsługi interaktywności.

***

### 🚀 Uruchomienie projektu

```bash
# Instalacja zależności
npm install

# Uruchomienie w trybie deweloperskim (zalecane)
npm run dev
# Aplikacja będzie dostępna pod adresem: http://localhost:3000