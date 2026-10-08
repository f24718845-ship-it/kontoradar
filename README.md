# KontoRadar – Ranking i Porównywarka Kont Bankowych

[![Status](https://img.shields.io/badge/Status-Live%20Ready-emerald.svg)](https://kontoradar.pages.dev)
[![Stack](https://img.shields.io/badge/Stack-Next.js%2015%20%7C%20TypeScript%20%7C%20Tailwind%20CSS-blue.svg)](https://kontoradar.pages.dev)
[![Hosting](https://img.shields.io/badge/Hosting-Cloudflare%20Pages%20(0%20z%C5%82)-orange.svg)](https://kontoradar.pages.dev)
[![SEO](https://img.shields.io/badge/SEO-Schema.org%20%7C%20Sitemap%20%7C%20OpenGraph-success.svg)](https://kontoradar.pages.dev/sitemap.xml)

**KontoRadar** to nowoczesny, niezależny portal finansowy stworzony z myślą o konsumentach poszukujących najlepszego rachunku osobistego w Polsce. Serwis łączy obiektywny, matematyczny system rankingowy (0–10) z interaktywną porównywarką ofert, bazą wiedzy finansowej oraz przygotowaniem pod monetyzację afiliacyjną (Money2Money).

---

## 1. Główne Funkcjonalności

* **Interaktywny Ranking:** 11 zweryfikowanych polskich banków (Pekao S.A., mBank, Nest Bank, Santander, Millennium, ING, Alior, VeloBank, BNP Paribas, PKO BP, Credit Agricole).
* **Filtry i Sortowanie ("Znajdź najlepsze konto"):** Filtrowanie ofert wg: darmowe konto (0 zł), z bonusem, dla młodych (<26 lat), bez opłaty za prowadzenie, BLIK, Apple Pay, Google Pay, założenie online.
* **Porównywarka Obok Siebie (`/porownywarka-kont-bankowych`):** Narzędzie umożliwiające bezpośrednie zestawienie parametrów do 4 kont na jednym ekranie z responsywnym widokiem mobilnym.
* **Szczegółowe Strony Ofert (`/konto/[slug]`):** Dedykowana recenzja każdego banku: zalety, wady, dla kogo, tabela opłat TOiP, instrukcja założenia krok po kroku, dedykowany FAQ oraz link partnerski.
* **Filary SEO:** Dedykowane podstrony z unikalnym contentem:
  - `/ranking-kont-bankowych`
  - `/najlepsze-konta-bankowe`
  - `/darmowe-konto-bankowe`
  - `/konto-bankowe-z-bonusem`
  - `/konto-bankowe-dla-mlodych`
  - `/najlepsze-konto-osobiste`
  - `/konto-bez-oplat`
  - `/najlepsze-konto-mobilne`
* **Ekspercki Blog Finansowy (`/blog`):** 10 oryginalnych, wyczerpujących poradników zoptymalizowanych pod intencje wyszukiwania Google.
* **Legal & Compliance:** Polityka prywatności zgodna z RODO, Regulamin, Polityka Cookies z interaktywnym banerem zgód, transparentna podstrona `/afiliacja` oraz `/jak-tworzymy-ranking`.
* **Przekierowania 301 z dawnego serwisu:** Plik `_redirects` mapujący wszystkie adresy z `toksi.oferty-kredytowe.pl` na odpowiedniki w nowej architekturze.

---

## 2. Stos Technologiczny

* **Framework:** Next.js 15 (App Router, Static Export `output: 'export'`)
* **Język:** TypeScript
* **Styling:** Tailwind CSS, PostCSS, Autoprefixer
* **Ikony:** Lucide React
* **Hosting docelowy:** Cloudflare Pages (darmowy hosting `*.pages.dev`, globalny CDN, 100/100 Core Web Vitals)
* **Zarządzanie Danymi:** Czysta, modułowa baza JSON (`/data/banks.json`, `/data/affiliates.json`, `/data/blog-posts.json`)

---

## 3. Struktura Projektu

```text
├── app/
│   ├── layout.tsx                     # Główny layout, metadane, Schema.org
│   ├── page.tsx                       # Homepage z rankingiem i filtrami
│   ├── globals.css                    # Tailwind CSS i style bazowe
│   ├── porownywarka-kont-bankowych/   # Interaktywna porównywarka
│   ├── konto/[slug]/                  # Dynamiczne podstrony pojedynczych kont
│   ├── ranking-kont-bankowych/        # Strona SEO rankingu
│   ├── najlepsze-konta-bankowe/       # Strona SEO czołówki rynku
│   ├── darmowe-konto-bankowe/         # Strona SEO kont za 0 zł
│   ├── konto-bankowe-z-bonusem/       # Strona SEO premii gotówkowych
│   ├── konto-bankowe-dla-mlodych/     # Strona SEO dla studentów
│   ├── najlepsze-konto-osobiste/      # Strona SEO rachunków ROR
│   ├── konto-bez-oplat/               # Strona SEO bez ukrytych prowizji
│   ├── najlepsze-konto-mobilne/       # Strona SEO bankowości mobilnej
│   ├── blog/                          # Główny indeks bloga
│   │   └── [slug]/                    # Podstrony artykułów blogowych
│   ├── jak-tworzymy-ranking/          # Metodyka punktacji 0-10
│   ├── afiliacja/                     # Informacje o linkach partnerskich
│   ├── regulamin/                     # Regulamin serwisu
│   ├── polityka-prywatnosci/          # RODO / Privacy policy
│   ├── cookies/                       # Polityka ciasteczek
│   ├── kontakt/                       # Dane kontaktowe redakcji
│   └── o-nas/                         # O zespole KontoRadar
├── components/                        # Komponenty UI (Navbar, Footer, OfferCard, etc.)
├── data/
│   ├── banks.json                     # Główna baza parametrów kont
│   ├── affiliates.json                # Centralny rejestr linków Money2Money
│   └── blog-posts.json                # Baza artykułów poradnikowych
├── lib/
│   ├── data.ts                        # Funkcje dostępowe do danych
│   └── analytics.ts                   # Moduł analityki i trackingu CTA
├── public/
│   ├── _headers                       # Nagłówki bezpieczeństwa Cloudflare
│   ├── _redirects                     # Reguły 301 ze starego serwisu
│   ├── favicon.svg                    # Nowoczesny favicon SVG
│   ├── logo.svg                       # Logotyp KontoRadar
│   ├── robots.txt                     # Konfiguracja indeksowania
│   └── sitemap.xml                    # Pełna mapa serwisu
├── types/                             # Typy TypeScript
├── OLD_SITE_AUDIT.md                  # Pełny audyt starej witryny
├── OLD_URL_TO_NEW_URL.md              # Mapa migracji adresów 301
└── GOOGLE_SEARCH_CONSOLE_SETUP.md     # Instrukcja konfiguracji GSC
```

---

## 4. Instrukcja Uruchomienia Lokalnego

### Wymagania wstępne:
* Node.js v18+ (zalecany v20+)
* npm v10+

### Kroki:
1. Zainstaluj zależności:
   ```bash
   npm install
   ```
2. Uruchom serwer developerski:
   ```bash
   npm run dev
   ```
3. Otwórz w przeglądarce: [http://localhost:3000](http://localhost:3000)

---

## 5. Budowanie Wersji Produkcyjnej

Projekt korzysta z Next.js Static Export, generując czysty, zoptymalizowany kod HTML/CSS/JS do katalogu `out/`:

```bash
npm run build
```

Po zakończeniu budowy katalog `out/` zawiera gotową, w pełni statyczną i bezpieczną stronę przygotowaną do wdrożenia na Cloudflare Pages.

---

## 6. Wdrożenie na Cloudflare Pages (0 zł)

Projekt jest w 100% dostosowany do darmowego planu Cloudflare Pages:

### Opcja A: Wdrożenie przez GitHub (Zalecane)
1. Utwórz nowe repozytorium na GitHubie (np. `kontoradar`).
2. Połącz repozytorium z Cloudflare Dashboard (`Workers & Pages` -> `Create application` -> `Pages` -> `Connect to Git`).
3. Skonfiguruj ustawienia buildu:
   * **Framework preset:** `None` lub `Next.js (Static Export)`
   * **Build command:** `npm run build`
   * **Build output directory:** `out`
   * **Node version:** `20` lub wyższa
4. Kliknij **Save and Deploy**. Cloudflare automatycznie utworzy adres:
   ```text
   https://kontoradar.pages.dev
   ```

### Opcja B: Wdrożenie bezpośrednie przez Wrangler CLI
```bash
npx wrangler pages deploy out --project-name kontoradar
```

---

## 7. Jak Aktualizować Dane Ofert i Afiliacji?

Wszystkie parametry finansowe, prowizje i linki są scentralizowane w jednym miejscu:

1. **Aktualizacja parametrów konta (np. zmiana premii, opłat):**
   Edytuj plik [`data/banks.json`](file:///c:/Users/Toksi/Desktop/strona%20www/data/banks.json). Zmień wartość oraz zaktualizuj pole `"last_verified": "RRRR-MM-DD"`.
2. **Aktualizacja linku partnerskiego:**
   W [`data/banks.json`](file:///c:/Users/Toksi/Desktop/strona%20www/data/banks.json) oraz [`data/affiliates.json`](file:///c:/Users/Toksi/Desktop/strona%20www/data/affiliates.json) podmień pole `"affiliate_url"`.
3. **Dodanie nowego artykułu na blogu:**
   Dopisz nowy obiekt do [`data/blog-posts.json`](file:///c:/Users/Toksi/Desktop/strona%20www/data/blog-posts.json). Nowa strona wygeneruje się automatycznie podczas kolejnego buildu!

---

## 8. Licencja i Prawa Autorskie

Projekt stworzony dla marki **KontoRadar**. Wszelkie prawa zastrzeżone © 2026.
