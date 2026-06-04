import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import SeatingChart from './components/SeatingChart';
import AdminPanel from './components/AdminPanel';
import './App.css';

const mockEventsData = [
  { id: 1, title: "Zomer Festival 2026", date: "15 juli 2026", location: "Amsterdam Arena", price: 45.00, availableTickets: 150 },
  { id: 2, title: "Live in Concert: De Jeugd", date: "22 augustus 2026", location: "Rotterdam Ahoy", price: 35.50, availableTickets: 8 },
  { id: 3, title: "Techno Rave Night", date: "05 september 2026", location: "Klokgebouw Eindhoven", price: 29.99, availableTickets: 0 }
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

  // Handler: Reserve tickets 
  const handleReserveTickets = (eventId, qtyToReserve) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        const remaining = ev.availableTickets - qtyToReserve;
        alert(`Gereserveerd! ${qtyToReserve} ticket(s) voor ${ev.title}`);
        return { ...ev, availableTickets: remaining < 0 ? 0 : remaining };
      }
      return ev;
    }));
  };

  // CREATE
  const handleAddEvent = (newEventData) => {
    const newEvent = {
      id: Date.now(), // Generate unique simple timestamp ID
      ...newEventData
    };
    setEvents(prev => [...prev, newEvent]);
    alert(`Evenement "${newEvent.title}" succesvol toegevoegd!`);
  };

  // UPDATE
  const handleUpdateEvent = (id, updatedFields) => {
    setEvents(prev => prev.map(ev => (ev.id === id ? { ...ev, ...updatedFields } : ev)));
    alert('Evenement succesvol bijgewerkt!');
  };

  // DELETE
  const handleDeleteEvent = (id) => {
    if (window.confirm('Weet je zeker dat je dit evenement wilt verwijderen?')) {
      setEvents(prev => prev.filter(ev => ev.id !== id));
    }
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
          <>
            <EventList events={events} onReserve={handleReserveTickets} />
            
            <SeatingChart eventPrice={45.00} />

            <AdminPanel 
              events={events}
              onAddEvent={handleAddEvent}
              onUpdateEvent={handleUpdateEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;