# MAPA PRZEKIEROWAŃ: OLD URL → NEW URL
**Stary serwis:** `https://toksi.oferty-kredytowe.pl`  
**Nowy serwis:** `https://kontoradar.pages.dev`  
**Typ przekierowań:** 301 Permanent Redirect  

Niniejszy dokument przedstawia precyzyjną mapę migracji każdego adresu URL ze starego serwisu do najbardziej adekwatnej, wartościowej podstrony w nowym portalu **KontoRadar**.

---

## 1. Tabela mapowania adresów

| Stary URL (`toksi.oferty-kredytowe.pl`) | Nowy URL (`kontoradar.pages.dev`) | Uzasadnienie i intencja wyszukiwania (Search Intent) | Status HTTP |
| :--- | :--- | :--- | :--- |
| `/` | `/` | Strona główna z głównym rankingiem i porównywarką | 301 |
| `/konta-osobiste` | `/ranking-kont-bankowych` | Główny ranking kont osobistych z filtrami i tabelą | 301 |
| `/konta-oszczednosciowe` | `/konto-bankowe-z-bonusem` | Konta oferujące wysokie oprocentowanie oszczędności i premie | 301 |
| `/konta-dla-firm` | `/najlepsze-konta-bankowe` | Zestawienie kont z opcją filtrowania i profilami banków | 301 |
| `/karty-kredytowe` | `/porownywarka-kont-bankowych` | Narzędzie porównawcze parametrów kart i rachunków | 301 |
| `/lokaty-i-inwestycje` | `/konto-bankowe-z-bonusem` | Sekcja promocji kapitałowych i premii finansowych | 301 |
| `/kredyty-gotowkowe` | `/` | Przekierowanie do strony głównej serwisu finansowego | 301 |
| `/kredyty-konsolidacyjne` | `/` | Przekierowanie do strony głównej serwisu finansowego | 301 |
| `/kredyty-hipoteczne` | `/` | Przekierowanie do strony głównej serwisu finansowego | 301 |
| `/kredyty-samochodowe` | `/` | Przekierowanie do strony głównej serwisu finansowego | 301 |
| `/chwilowki` | `/konto-bez-oplat` | Użytkownicy szukający szybkiej gotówki / tanich rozwiązań finansowych | 301 |
| `/pozyczki` | `/konto-bez-oplat` | Alternatywa finansowa o zerowych kosztach stałych | 301 |
| `/pozyczki-bankowe-online` | `/najlepsze-konto-mobilne` | Oferty w 100% online z wnioskiem przez aplikację | 301 |
| `/ubezpieczenia-ac-oc` | `/` | Przekierowanie do strony głównej | 301 |
| `/pozostale-ubezpieczenia` | `/` | Przekierowanie do strony głównej | 301 |
| `/kredyty-dla-firm` | `/najlepsze-konto-osobiste` | Zestawienie najlepszych kont osobistych | 301 |
| `/pozostale` | `/blog` | Baza wiedzy finansowej, poradniki i artykuły | 301 |

---

## 2. Nowa struktura podstron SEO w serwisie KontoRadar

W nowym serwisie powstały następujące dedykowane filary SEO:

1. **Strona Główna:** `/`
2. **Interaktywna Porównywarka:** `/porownywarka-kont-bankowych`
3. **Landingi Rankingowe SEO:**
   - `/ranking-kont-bankowych` – Pełny, obiektywny ranking kont bankowych w Polsce
   - `/najlepsze-konta-bankowe` – Wyselekcjonowane konta o najwyższej ocenie punktowej (9.0+)
   - `/darmowe-konto-bankowe` – Konta z zerową opłatą za prowadzenie i kartę
   - `/konto-bankowe-z-bonusem` – Konta z najwyższymi premiami gotówkowymi i cashbackiem
   - `/konto-bankowe-dla-mlodych` – Konta dla studentów i osób w wieku 13-26 lat
   - `/najlepsze-konto-osobiste` – Przegląd flagowych rachunków ROR w Polsce
   - `/konto-bez-oplat` – Poradnik i zestawienie kont bez ukrytych gwiazdek i prowizji
   - `/najlepsze-konto-mobilne` – Konta z najlepszą aplikacją i obsługą BLIK/Apple Pay
4. **Strony pojedynczych ofert (Detailed Account Pages):**
   - `/konto/pekao-konto-przekorzystne`
   - `/konto/mbank-ekonto-do-uslug`
   - `/konto/santander-konto`
   - `/konto/millennium-360`
   - `/konto/ing-konto-direct`
   - `/konto/nest-bank-nest-konto`
   - `/konto/alior-konto-jakze-osobiste`
   - `/konto/velobank-velokonto`
   - `/konto/bnp-paribas-otwarte-na-ciebie`
   - `/konto/pko-konto-za-zero`
   - `/konto/credit-agricole-konto-dla-ciebie`
5. **Blog i Baza Wiedzy (Ekspercki Content):**
   - `/blog` – Główny spis poradników
   - `/blog/jak-wybrac-konto-bankowe`
   - `/blog/jak-zalozyc-konto-przez-internet`
   - `/blog/jak-znalezc-darmowe-konto-bankowe`
   - `/blog/co-oznacza-darmowe-konto`
   - `/blog/jak-dziala-bonus-za-otwarcie-konta`
   - `/blog/czy-warto-zmieniac-konto-bankowe`
   - `/blog/konto-dla-mlodych-na-co-zwrocic-uwage`
   - `/blog/jak-dziala-blik`
   - `/blog/jakie-oplaty-sprawdzic-przed-otwarciem-konta`
   - `/blog/konto-osobiste-a-konto-premium`
6. **Kluczowe podstrony informacyjne i Legal/Compliance:**
   - `/jak-tworzymy-ranking` – Pełna metodyka oceny 0-10, kryteria punktacji, weryfikacja
   - `/afiliacja` – Deklaracja transparentności i zasady monetyzacji afiliacyjnej
   - `/regulamin` – Regulamin serwisu KontoRadar
   - `/polityka-prywatnosci` – RODO, prawa użytkownika, dane
   - `/cookies` – Polityka plików cookies i lokalnego przechowywania
   - `/kontakt` – Formularz i dane kontaktowe redakcji
   - `/o-nas` – Misja i zespół KontoRadar

---

## 3. Plik `_redirects` dla Cloudflare Pages
W katalogu produkcyjnym Cloudflare umieszczony zostanie plik `public/_redirects`:
```text
/konta-osobiste /ranking-kont-bankowych 301
/konta-oszczednosciowe /konto-bankowe-z-bonusem 301
/konta-dla-firm /najlepsze-konta-bankowe 301
/karty-kredytowe /porownywarka-kont-bankowych 301
/lokaty-i-inwestycje /konto-bankowe-z-bonusem 301
/kredyty-gotowkowe / 301
/kredyty-konsolidacyjne / 301
/kredyty-hipoteczne / 301
/kredyty-samochodowe / 301
/chwilowki /konto-bez-oplat 301
/pozyczki /konto-bez-oplat 301
/pozyczki-bankowe-online /najlepsze-konto-mobilne 301
/ubezpieczenia-ac-oc / 301
/pozostale-ubezpieczenia / 301
/kredyty-dla-firm /najlepsze-konto-osobiste 301
/pozostale /blog 301
```
