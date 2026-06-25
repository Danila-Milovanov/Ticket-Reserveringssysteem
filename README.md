# Ticket- & Reserveringssysteem 

Een moderne, component-gebaseerde frontend applicatie gebouwd met **React** en **Vite**, speciaal ontworpen voor het ontdekken van evenementen, het reserveren van tickets, het interactief selecteren van zitplaatsen en het beheren van prijs-tiers.

Dit project is gerealiseerd als onderdeel van de **Proeve van Bekwaamheid (Praktijkexamen)** voor de opleiding Software Development (Niveau 4).

## Functionaliteiten (User Stories & MoSCoW)

Het systeem is succesvol opgeleverd met een volledige dekking van zowel de vereiste *Must Haves* als de uitgebreide *Should Haves*:

### Must Haves
* **US1: Evenementen bekijken:** Bezoekers kunnen direct een actueel en visueel overzicht van beschikbare evenementen bekijken, inclusief datum, locatie en live voorraadstatus.
* **US2: Tickets reserveren:** Gebruikers kunnen dynamisch het gewenste aantal tickets selecteren en reserveren. De beschikbare voorraad wordt in de applicatiestate direct bijgewerkt.
* **US3: Zitplaatsen bekijken:** Een interactieve, visuele plattegrond (seating chart) van de zaal waarmee gebruikers realtime beschikbare stoelen kunnen selecteren. De totale prijs wordt direct berekend.
* **US4: Evenementen beheren (Admin):** Een afgeschermd beheerpaneel (CRUD) voor organisatoren om evenementen toe te voegen, aan te passen of te verwijderen met strikte formuliervalidatie.

### Should Haves (Toegevoegde Waarde)
* **US5: Tickettypes beheren:** Het datamodel en de interface zijn uitgebreid naar een geneste structuur. Gebruikers kunnen per evenement via een dropdown selecteren tussen verschillende prijscategorieën (bijv. **Regulier** vs. **VIP Lounge**). De winkelmand en stoelreservering synchroniseren hier live mee.

---

## 🛠️ Technische Stack & Architectuur

* **Framework:** React 18+ (Component-based architectuur)
* **Build Tool:** Vite (voor snelle HMR en optimale bundeling)
* **Styling:** CSS3 (Geoptimaliseerd voor dark mode en vloeiende transities)
* **State Management:** Functioneel programmeren met React Hooks (`useState`, `useEffect`)

### Architectuur- & Kwaliteitskeuzes (Assessoren-toelichting)
1.  **Single Source of Truth:** De globale data-state (de lijst met evenementen) leeft centraal in `App.jsx`. Wijzigingen vanuit lagere componenten (zoals verkoop via `EventCard` of beheer via `AdminPanel`) communiceren veilig omhoog via *callback functies* (Unidirectionele datastroom: *Data flows down, actions flow up*).
2.  **Immutability (Onveranderlijkheid):** Bij het updaten van de ticketstanden of het muteren van evenementen wordt de state nooit direct aangepast. Er wordt consistent gebruik gemaakt van `.map()` en `.filter()` om een schone, nieuwe array-kopie aan te leveren aan de Virtual DOM.
3.  **Defensive Programming (Robuustheid):** Om runtime crashes in de interface te voorkomen, maakt de applicatie gebruik van *type-guards* en *default parameters* (zoals `onSelectPrice = () => {}`). Hierdoor blijft de app stabiel, zelfs als optionele component-eigenschappen niet direct worden meegeleverd.
4.  **Geheugenoptimalisatie:** Statische sjablonen (zoals de initiële stoelindeling van de zaal) zijn *buiten* de component-scope gedeclareerd om onnodige herallocatie in het geheugen tijdens re-renders te voorkomen.

---

##  Installatie & Lokale Uitvoering

Volg deze stappen om het project lokaal op te starten voor de live demo:

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

---

## 🧪 Testen & Kwaliteitsborging

De acceptatiecriteria van alle user stories zijn handmatig en systematisch getoetst via gestructureerde testscenario's:
* **Formuliervalidatie:** Het beheerpaneel onderbreekt de submit-actie met een duidelijke foutmelding zodra een verplicht invoerveld leeg wordt gelaten.
* **State Grenzen:** De ticketreservering blokkeert invoer onder de 1 en corrigeert automatisch via logische grenswaarden als er meer tickets worden gevraagd dan er beschikbaar zijn.
* **Fouttolerantie:** Eventuele ontbrekende parameters crashen de browseromgeving niet dankzij ingebouwde inline fallbacks.
