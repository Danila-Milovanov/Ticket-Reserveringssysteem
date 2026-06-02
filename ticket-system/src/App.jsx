import React, { useState, useEffect } from "react";
import EventList from "./components/EventList";
import "./App.css"

const mockEventsData = [
  {
        "id": 1,
        "title": "Zomer Festival 2026",
        "date": "2026-07-15",
        "location": "Amsterdam Arena",
        "price": 45.00,
        "availableTickets": 150
        
    },
    {
      "id": 2,
        "title": "Live in Concert: De Jeugd",
        "date": "2026-08-22",
        "location": "Rotterdam",
        "price": 35.50,
        "availableTickets": 80 
    },
  {
    id: 3,
    title: "Techno Rave Night",
    date: "05 september 2026",
    location: "Klokgebouw Eindhoven",
    price: 29.99,
    availableTickets: 0
  }
];

function App () {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //fetch delay simulation
    const timer = setTimeout(() => {
      setEvents(mockEventsData);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>Ticket-Reserveringssysteem</h1>
        <p>Ontdek en reserveer tickets voor de beste evenementen</p>
      </header>

      <main>
        <h2>Beschikbare Evenementen</h2>
        
        {loading ? (
          <div className="loader">Evenementen laden...</div>
        ) : (
          <EventList events={events} />
        )}
      </main>
    </div>
  );
}
