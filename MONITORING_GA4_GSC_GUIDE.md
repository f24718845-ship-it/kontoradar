# Kompletny Przewodnik Monitorowania Ruchu: GA4 & Google Search Console dla KontoRadar

Serwis **KontoRadar** (`https://kontoradar.pages.dev`) posiada wdrożoną pełną architekturę analityczną zgodną ze standardami Google, zoptymalizowaną pod Next.js 15 App Router oraz hosting Cloudflare Pages.

Zgodnie z wymaganiami bezpieczeństwa i czystości danych:
* **Nie stosujemy sztucznych/losowych identyfikatorów.**
* Integracje aktywują się w momencie podania prawdziwych kluczy w zmiennych środowiskowych.
* Serwis jest w 100% bezpieczny i działa poprawnie także przed podłączeniem kluczy (brak błędów JS w konsoli).

---

## 1. Wdrożone Zdarzenia Google Analytics 4 (GA4)

W kodzie portalu zaimplementowano i przetestowano obsługę 7 kluczowych zdarzeń:

| Zdarzenie | Gdzie występuje | Przekazywane parametry |
| :--- | :--- | :--- |
| `page_view` | Każde przejście między stronami portalu (Next.js SPA) | `page_path`, `page_title`, `page_location` |
| `offer_click` | Kliknięcie w nazwę konta, kafelek lub przycisk „Szczegóły oferty” | `bank_name`, `account_name`, `offer_id`, `rank_position`, `cta_label` |
| `affiliate_click` | Kliknięcie w przycisk „SPRAWDŹ OFERTĘ” / „PRZEJDŹ DO BANKU” (link partnerski Money2Money) | `bank_name`, `account_name`, `affiliate_url`, `offer_id`, `rank_position` |
| `filter_used` | Wybór kategorii w filtrach lub zmiana sortowania | `filter_name` (`category` / `sort_order`), `filter_value`, `total_results` |
| `comparison_started` | Dodanie konta do porównywarki lub kliknięcie „Porównaj teraz” | `comparison_count`, `accounts_compared` |
| `comparison_completed` | Wyświetlenie i analiza tabeli porównawczej dla 2–4 banków | `comparison_count`, `accounts_compared` |
| `calculator_used` | Użycie interaktywnego kalkulatora korzyści finansowych | `monthly_income`, `monthly_spend`, `savings_amount`, `estimated_gain` |

Automatycznie monitorowane przez GA4 po podłączeniu:
* Użytkownicy (ogółem) oraz Nowi użytkownicy
* Sesje i zaangażowanie (czas trwania, współczynnik zaangażowania)
* Źródła ruchu (Google Organic, bezpośrednie, referral, social)
* Strony wejścia (Landing Pages) i najpopularniejsze podstrony portalu

---

## 2. Jak podłączyć Google Analytics 4 (Krok po kroku)

### Krok 2.1: Założenie usługi w GA4
1. Otwórz w przeglądarce: [https://analytics.google.com/](https://analytics.google.com/)
2. Kliknij **Administracja** (ikona zębatki w lewym dolnym rogu) &rarr; **Utwórz konto** lub **Utwórz usługę**.
3. Wpisz nazwę: `KontoRadar`, strefa: `Polska`, waluta: `PLN`.
4. Wybierz platformę: **Sieć (Web)**.
5. Wpisz adres URL: `kontoradar.pages.dev` oraz nazwę strumienia: `KontoRadar Web`.
6. Kliknij **Utwórz strumień**.
7. Zobaczysz swój **Identyfikator pomiaru** w formacie: `G-XXXXXXXXXX` (np. `G-1A2B3C4D5E`). Skopiuj go.

---

## 3. Jak podłączyć Google Search Console (Krok po kroku)

### Krok 3.1: Dodanie usługi
1. Otwórz w przeglądarce: [https://search.google.com/search-console](https://search.google.com/search-console)
2. Kliknij **Dodaj usługę**.
3. Wybierz typ: **Prefiks adresu URL** i wpisz:
   ```
   https://kontoradar.pages.dev
   ```
4. Kliknij **Dalej**.

### Krok 3.2: Wybór metody weryfikacji Tag HTML
1. W sekcji **Inne metody weryfikacji** wybierz **Tag HTML**.
2. Google wyświetli kod w postaci:
   ```html
   <meta name="google-site-verification" content="TWOJ_KOD_WERYFIKACYJNY" />
   ```
3. Skopiuj samą zawartość atrybutu `content` (czyli np. `XyZ123_abc456Token`).

### Krok 3.3: Wysłanie sitemapy
Po potwierdzeniu weryfikacji w Search Console:
1. W menu bocznym kliknij **Mapy witryn** (Sitemaps).
2. W polu wpisz: `sitemap.xml` (pełny URL: `https://kontoradar.pages.dev/sitemap.xml`).
3. Kliknij **Prześlij**. Google zaindeksuje wszystkie 42 podstrony portalu.

---

## 4. Konfiguracja zmiennych w Cloudflare Pages

Aby zmienne zadziałały na działającej domenie produkcyjnej `https://kontoradar.pages.dev`:

1. Zaloguj się do Cloudflare: [https://dash.cloudflare.com/](https://dash.cloudflare.com/)
2. Przejdź do **Workers & Pages** &rarr; Wybierz projekt **kontoradar**.
3. Wejdź w zakładkę **Settings** (Ustawienia) &rarr; **Environment variables** (Zmienne środowiskowe).
4. Kliknij **Add variable** dla środowiska **Production**:
   * Zmienna 1:
     * Variable name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
     * Value: `G-XXXXXXXXXX` (Twój identyfikator z GA4)
   * Zmienna 2:
     * Variable name: `NEXT_PUBLIC_GSC_VERIFICATION_TOKEN`
     * Value: `TWOJ_KOD_WERYFIKACYJNY` (Token z Search Console)
5. Kliknij **Save** (Zapisz).
6. Przejdź do zakładki **Deployments** &rarr; obok najnowszego wdrożenia kliknij **Retry deployment** (lub zrób nowy commit do Git), aby Cloudflare zbudował projekt z nowymi zmiennymi.

---

## 5. Jak monitorować dane po podłączeniu

### W Google Search Console:
W zakładce **Skuteczność** (Wyszukiwarka) będziesz mógł w czasie rzeczywistym analizować:
* **Łączna liczba kliknięć:** Ile wejść z Google zyskał portal
* **Łączna liczba wyświetleń:** Jak często KontoRadar pojawia się w wynikach wyszukiwania
* **Średni CTR:** Odsetek osób klikających w linki w Google
* **Średnia pozycja:** Średnia pozycja dla fraz takich jak np. *„ranking kont bankowych”*, *„darmowe konto bankowe”*, *„konto z bonusem”*
* **Karty analityczne:**
  * **Zapytania:** Dokładne słowa kluczowe wpisywane przez użytkowników
  * **Strony:** Najpopularniejsze artykuły i rankingi (np. `/darmowe-konto-bankowe/`, `/porownywarka-kont-bankowych/`)
  * **Kraje:** Ruch z Polski i z zagranicy
  * **Urządzenia:** Podział na komputery, telefony komórkowe i tablety

### W Google Analytics 4:
* **Raporty &rarr; Czas rzeczywisty:** Podgląd użytkowników online w tym momencie
* **Raporty &rarr; Zaangażowanie &rarr; Zdarzenia:** Sprawdzanie liczby zdarzeń `affiliate_click`, `calculator_used`, `comparison_completed`
* **Raporty &rarr; Pozyskiwanie &rarr; Pozyskiwanie użytkowników:** Źródła ruchu (Google Organic vs Direct vs Social)
