# INSTRUKCJA PODŁĄCZENIA GOOGLE SEARCH CONSOLE DLA KONTORADAR

**Adres docelowy serwisu:** `https://kontoradar.pages.dev`  
**Plik sitemap:** `https://kontoradar.pages.dev/sitemap.xml`  
**Plik robots:** `https://kontoradar.pages.dev/robots.txt`  

---

## Krok 1. Otwórz panel Google Search Console
1. Przejdź do oficjalnej strony: [https://search.google.com/search-console](https://search.google.com/search-console)
2. Zaloguj się na swoje konto Google. *(Pamiętaj: agent AI nigdy nie prosi Cię o hasło – logujesz się samodzielnie w swojej przeglądarce).*

---

## Krok 2. Dodaj nową usługę (Property)
1. W lewym górnym rogu panelu rozwiń listę usług i kliknij **"Dodaj usługę"** (Add property).
2. Wybierz metodę: **Prefiks adresu URL** (URL prefix).
3. Wpisz dokładny adres:
   ```text
   https://kontoradar.pages.dev
   ```
4. Kliknij **Dalej** (Continue).

---

## Krok 3. Weryfikacja własności witryny

Dla darmowej domeny `*.pages.dev` najprostszą i najszybszą metodą jest **Tag HTML (Meta tag)** lub **Plik HTML**:

### Metoda A: Tag HTML (Meta tag) – Zalecana
1. W sekcji "Inne metody weryfikacji" wybierz **Tag HTML**.
2. Google wyświetli kod w postaci:
   ```html
   <meta name="google-site-verification" content="TWÓJ_UNIKALNY_KOD_WERYFIKACYJNY" />
   ```
3. Skopiuj wartość `content="..."` i przekaż ją agentowi lub wklej w pliku `app/layout.tsx` w sekcji `<head>`.
4. Po wdrożeniu kliknij przycisk **"Weryfikuj"** (Verify).

### Metoda B: Plik HTML
1. Pobierz plik weryfikacyjny (np. `google1234567890abcdef.html`).
2. Umieść go w katalogu `public/` projektu i uruchom deploy.
3. Kliknij **Weryfikuj**.

---

## Krok 4. Przesłanie mapy witryny (Sitemap.xml)
1. Po udanej weryfikacji przejdź w menu po lewej stronie do sekcji **"Mapy witryn"** (Sitemaps).
2. W polu "Dodaj nową mapę witryny" wpisz:
   ```text
   sitemap.xml
   ```
3. Kliknij **Prześlij** (Submit).
4. Google rozpocznie pobieranie i indeksowanie wszystkich podstron serwisu KontoRadar.

---

## Krok 5. Sprawdzenie indeksowania i Core Web Vitals
* Sprawdź w sekcji **"Strony"** (Pages), czy strony są indeksowane bez błędów.
* W sekcji **"Podstawowe wskaźniki internetowe"** (Core Web Vitals) witryna osiągnie najwyższe wyniki (100% Good URLs) dzięki statycznej architekturze Cloudflare Pages.
