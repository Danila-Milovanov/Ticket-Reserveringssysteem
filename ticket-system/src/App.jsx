import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import './App.css';

const mockEventsData = [
  {
    id: 1,
    title: "Zomer Festival 2026",
    date: "15 juli 2026",
    location: "Amsterdam Arena",
    price: 45.00,
    availableTickets: 150
  },
  {
    id: 2,
    title: "Live in Concert: De Jeugd",
    date: "22 augustus 2026",
    location: "Rotterdam Ahoy",
    price: 35.50,
    availableTickets: 8
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

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(mockEventsData);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);


  const handleReserveTickets = (eventId, qtyToReserve) => {
    setEvents(prevEvents => 
      prevEvents.map(event => {
        if (event.id === eventId) {
          const updatedTickets = event.availableTickets - qtyToReserve;
          
          alert(`Succesvol ${qtyToReserve} ticket(s) gereserveerd voor ${event.title}!`);
          
          return {
            ...event,
            availableTickets: updatedTickets < 0 ? 0 : updatedTickets
          };
        }
        return event;
      })
    );
  };

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
          <EventList events={events} onReserve={handleReserveTickets} />
        )}
      </main>
    </div>
  );
}


export default App;
