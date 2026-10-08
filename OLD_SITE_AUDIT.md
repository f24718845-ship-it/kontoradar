# AUDYT ISTNIEJĄCEJ STRONY (OLD SITE AUDIT)
**Adres audytowany:** `https://toksi.oferty-kredytowe.pl`  
**Data audytu:** Październik 2026  
**Audytor:** KontoRadar Autonomous Agent  

---

## 1. Wprowadzenie i cel audytu
Celem niniejszego audytu jest dogłębna analiza techniczna, biznesowa, treściowa oraz afiliacyjna serwisu `https://toksi.oferty-kredytowe.pl`. Dane uzyskane w audycie posłużą jako fundament do stworzenia nowego, niezależnego portalu finansowego **KontoRadar** (*Ranking i porównywarka kont bankowych*), zachowania legalnych mechanizmów afiliacyjnych (Money2Money) oraz bezpiecznej migracji ruchu (mapa 301).

---

## 2. Architektura techniczna i stos technologiczny starej strony
* **Platforma:** Gotowy silnik white-label Totalmoney.pl sp. z o.o. (właściciel programu partnerskiego Money2Money).
* **Backend:** PHP / Symfony (wskazują na to ścieżki `/bundles/fosjsrouting/js/router.min.js` oraz endpoint `/js/routing`).
* **Frontend:** jQuery 3.5.1, Webpack Encore (`runtime.9b90c2b9.js`, `867.f0b9074e.js`, `consent-mode.c70d4514.js`, `main.032cee6f.js`, `index.e0545c5c.js`).
* **Hosting / Serwer:** Serwer współdzielony / reverse proxy TotalMoney, podpięty pod domenę `oferty-kredytowe.pl` na subdomenie `toksi`.
* **Analityka:** Przestarzały kod Google Analytics Universal Analytics (`UA-125143421-3`), który od lipca 2023 r. nie przetwarza danych w ekosystemie Google (brak migracji do GA4).
* **Pobieranie danych:** Asynchroniczne wywołania JSON przez routing FOSJsRouting:
  - `/get-promoted-campaigns`
  - `/get-new-campaigns`
  - `/get-category-campaigns/{category}`

---

## 3. Struktura menu i istniejące adresy URL

Stara strona posiadała w menu następujące pozycje i kategorie:

1. **Strona główna:** `/`
2. **Kredyty (rozwijane menu):**
   - `/kredyty-gotowkowe`
   - `/kredyty-konsolidacyjne`
   - `/kredyty-hipoteczne`
   - `/kredyty-samochodowe`
   - `/chwilowki`
   - `/pozyczki`
   - `/pozyczki-bankowe-online`
3. **Konta i Karty (rozwijane menu):**
   - `/konta-osobiste`
   - `/karty-kredytowe`
4. **Oszczędności (rozwijane menu):**
   - `/konta-oszczednosciowe`
   - `/lokaty-i-inwestycje`
5. **Ubezpieczenia (rozwijane menu):**
   - `/ubezpieczenia-ac-oc`
   - `/pozostale-ubezpieczenia`
6. **Dla firm (rozwijane menu):**
   - `/konta-dla-firm`
   - `/kredyty-dla-firm`
7. **Pozostałe:**
   - `/pozostale`

---

## 4. Analiza SEO, indeksowalności i metadanych

### 4.1. Meta Title i Meta Description
* **Strona główna (`/`):**
  - Title: `Oferty kredytowe i nie tylko` (bardzo ogólny, słaby pod kątem intencji wyszukiwania kont osobistych).
  - Description: `Konta, kredyty, karty, ubezpieczenia. Wybierz najlepsze dla siebie produkty z szerokiej oferty dostępnej w serwisie.`
* **Konta osobiste (`/konta-osobiste`):**
  - Title: `Konta osobiste - zestawienie ofert`
  - Description: `Konta osobiste, aktualne oferty bankw. Tanie konta, promocyjne oferty, konta osobiste z premi. Za konto bez wychodzenia z domu.`
  - **Błąd kodowania znaków:** W meta description występują błędy kodowania polskich znaków diakrytycznych (`bankw`, `premi`, `Za`).

### 4.2. Nagłówki H1, H2, H3
* Na stronie głównej:
  - H1: `Najlepsze produkty finansowe w jednym miejscu!`
  - H2: `Polecane produkty`, `Nowe produkty`
* Brak nagłówków H3 i brak właściwej hierarchii semantycznej.

### 4.3. Pliki robots.txt i sitemap.xml
* **robots.txt:** **BRAK**. Wywołanie `https://toksi.oferty-kredytowe.pl/robots.txt` zwraca kod 200 z pełnym kodem HTML strony głównej (fallback serwera SPA).
* **sitemap.xml:** **BRAK**. Wywołanie `https://toksi.oferty-kredytowe.pl/sitemap.xml` również zwraca kod 200 z HTML strony głównej.
* **Wniosek SEO:** Wyszukiwarki indeksowały serwis w sposób chaotyczny, brak mapy witryny powodował osłabienie widoczności podstron.

### 4.4. Dane strukturalne (Schema.org)
* Całkowity brak Schema.org (`FinancialProduct`, `FAQPage`, `BreadcrumbList`, `Organization`).

---

## 5. Analiza mechanizmów afiliacyjnych i sieci partnerskich

* **Sieć afiliacyjna:** **Money2Money (Totalmoney.pl sp. z o.o.)**
* **Identyfikator partnera (Partner ID):** `338701`
* **Domena śledząca (Tracking Domain):** `tmlead.pl`
* **Format linków przekierowujących:** `https://tmlead.pl/redirect/338701_XXXX` (lub `338701._XXXX`)
* **Aktywne kampanie zidentyfikowane w systemie:**
  1. **Bank Pekao S.A. - Konto Przekorzystne:**
     - URL: `https://tmlead.pl/redirect/338701._1134`
     - Treść: Konto z kartą do podróżowania, premia online do 300 zł + do 2400 zł w promocji podróżnej, 5,7% na Koncie Oszczędnościowym.
  2. **Credit Agricole - Konto dla Ciebie:**
     - URL: `https://tmlead.pl/redirect/338701_2395`
     - Treść: Premia nawet do 1000 zł zwrotów za płatności kartą/BLIK oraz wysokie oprocentowanie rachunku oszczędnościowego.
  3. **Erste Bank Polska - Konto Platinum:**
     - URL: `https://tmlead.pl/redirect/338701_3079`
  4. **BIK - Raport:**
     - URL: `https://tmlead.pl/redirect/338701_1090`
  5. **Allegro Pay:**
     - URL: `https://tmlead.pl/redirect/338701_2468`
  6. **Wakacje.pl:**
     - URL: `https://tmlead.pl/redirect/338701_2062`
  7. **Vectra:**
     - URL: `https://tmlead.pl/redirect/338701_3066`

* **Status podstrony `/konta-osobiste`:** W starym widżecie dynamicznym kategoria zwraca obecnie komunikat *"Brak ofert z tej kategorii. Sprawdź pozostałe kategorie produktów"*, co oznacza, że widget nie zaciągał automatycznie ofert. Nowy serwis musi posiadać **niezależny, statyczny i stabilny system bazodanowy ofert**, niewrażliwy na awarie zewnętrznych skryptów.

---

## 6. Kwestie prawne (Legal & Compliance) na starej stronie
* Stopka zawierała jedynie zewnętrzne odnośniki do `https://www.totalmoney.pl/polityka-prywatnosci` i `https://www.totalmoney.pl/regulamin`.
* Brak danych administratora serwisu (`toksi.oferty-kredytowe.pl`).
* Brak jasnej informacji o afiliacji i prowizjach dla użytkownika.
* Brak ostrzeżeń o ryzyku i braku charakteru doradztwa finansowego.
* Prosty pasek cookies bez zaawansowanego mechanizmu Consent Mode v2.

---

## 7. Wnioski i wytyczne dla nowego serwisu KontoRadar
1. **Pełna niezależność technologiczna:** Oparcie o Next.js + TypeScript + Tailwind CSS, hosting na bezpłatnym Cloudflare Pages (`kontoradar.pages.dev`).
2. **Zachowanie identyfikatora Money2Money:** Zachowujemy Partner ID `338701` oraz strukturę linków `https://tmlead.pl/redirect/338701_...` z możliwością błyskawicznej konfiguracji w `/data/affiliates.json`.
3. **Prawdziwy ranking i baza danych:** Niezależna baza `/data/banks.json` z 11 czołowymi bankami w Polsce, zweryfikowanymi opłatami, bonusami, tabelami TOiP oraz systemem punktowym 0-10.
4. **Nowoczesne SEO:** Kompletne generowanie `sitemap.xml`, `robots.txt`, Breadcrumbs, OpenGraph, Twitter Cards, Schema.org (`FinancialProduct`, `FAQPage`, `Article`, `Organization`).
5. **Polityka RODO & Compliance:** Własny Regulamin, Polityka Prywatności, Polityka Cookies, transparentna informacja o afiliacji i braku świadczenia poradnictwa inwestycyjnego.
