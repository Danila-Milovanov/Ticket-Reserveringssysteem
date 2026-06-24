# Ticket- & Reserveringssysteem 🎟️

Een moderne, component-gebaseerde frontend applicatie gebouwd met **React** en **Vite**, speciaal ontworpen voor het ontdekken van evenementen, het reserveren van tickets en het interactief selecteren van zitplaatsen. 

Dit project is gerealiseerd als onderdeel van de **Proeve van Bekwaamheid (Praktijkexamen)** voor de opleiding Software Development (Niveau 4).

## 🚀 Functionaliteiten (User Stories)

Het systeem is opgebouwd via de MoSCoW-methodiek en bevat de volgende afgeronde kernfunctionaliteiten:

*   **US1: Evenementen bekijken (Must Have):** Bezoekers kunnen direct een actueel en visueel overzicht van beschikbare evenementen bekijken, inclusief datum, locatie, prijs en live ticketvoorraad.
*   **US2: Tickets reserveren (Must Have):** Gebruikers kunnen dynamisch het gewenste aantal tickets selecteren en reserveren. De beschikbare voorraad wordt in de applicatiestate direct en veilig bijgewerkt.
*   **US3: Zitplaatsen bekijken (Must Have):** Een interactieve, visuele plattegrond (seating chart) van de zaal waarmee gebruikers realtime beschikbare stoelen kunnen selecteren. De totale prijs wordt direct berekend op basis van de selectie.
*   **US4: Evenementen beheren (Must Have - Admin):** Een afgeschermd beheerpaneel (CRUD) voor organisatoren om evenementen toe te voegen, aan te passen of te verwijderen met strikte client-side formuliervalidatie (lege velden zijn niet toegestaan).

## 🛠️ Technische Stack & Architectuur

*   **Framework:** React (Component-based architectuur)
*   **Build Tool:** Vite (voor snelle HMR en optimale bundeling)
*   **Styling:** CSS3 (Geoptimaliseerd voor dark mode en vloeiende transities/animaties)
*   **State Management:** Functioneel programmeren met React Hooks (`useState`, `useEffect`)

### Architectuur Keuzes (Docenten-toelichting)
1.  **Single Source of Truth:** De globale data-state (de lijst met evenementen) leeft centraal in `App.jsx`. Wijzigingen vanuit lagere componenten (zoals verkoop via `EventCard` of beheer via `AdminPanel`) communiceren veilig omhoog via *callback functies* (Actions flow up, data flows down).
2.  **Immutability:** Bij het updaten van de ticketstanden of het toevoegen van evenementen wordt de state nooit direct gemuteerd. Er wordt consistent gebruik gemaakt van `.map()` en `.filter()` om een schone, nieuwe array-kopie aan te leveren aan de Virtual DOM.
3.  **Geheugenoptimalisatie:** Statische sjablonen (zoals de initiële stoelindeling) zijn *buiten* de component scope gedeclareerd om onnodige re-allocatie in het geheugen tijdens re-renders te voorkomen.

## 📦 Installatie & Lokale Uitvoering

Volg deze stappen om het project lokaal op te starten:

1.  **Kloon de repository:**
```bash
    git clone [https://github.com/jouw-gebruikersnaam/ticket-system.git](https://github.com/jouw-gebruikersnaam/ticket-system.git)
    cd ticket-system
    ```

2.  **Installeer de benodigde node packages (dependencies):**
```bash
    npm install
    ```
    *(Dit leest de `package.json` en bouwt de lokale `node_modules` map op).*

3.  **Start de lokale ontwikkelserver:**
```bash
    npm run dev
    ```

4.  **Open de applicatie:**
    Klik op de gegenereerde lokale link in de terminal (meestal `http://localhost:5173`).

## 🧪 Testen & Kwaliteitsborging

De acceptatiecriteria van de user stories zijn handmatig en systematisch getoetst via gestructureerde testscenario's:
*   **Formuliervalidatie:** Het beheerpaneel onderbreekt de submit-actie direct met een foutmelding zodra een invoerveld leeg wordt gelaten.
*   **State Grenzen:** De ticketreservering blokkeert invoer onder de 1 en corrigeert automatisch als er meer tickets worden gevraagd dan er beschikbaar zijn.
