import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import SeatingChart from './components/SeatingChart';
import AdminPanel from './components/AdminPanel';
import './App.css';

const mockEventsData = [
  { 
    id: 1, 
    title: "Zomer Festival 2026", 
    date: "15 juli 2026", 
    location: "Amsterdam Arena", 
  ticketTypes: [
    { name: "Regulier", price: 45.00, available: 120 },
    { name: "VIP Lounge", price: 95.00, available: 30 }
  ]
  },
  { 
  id: 2, 
  title: "Live in Concert: De Jeugd", 
  date: "22 augustus 2026", 
  location: "Rotterdam Ahoy", 
  ticketTypes: [
  { name: "Staanplaats", price: 35.50, available: 50 },
  { name: "Gouden Cirkel", price: 60.00, available: 5 }
  ]
  }
];

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChartPrice, setActiveChartPrice] = useState(45.00);

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

 const handleAddEvent = (newEventData) => {
  const newEvent = {
    id: Date.now(),
     title: newEventData.title,
     date: newEventData.date,
     location: newEventData.location,
    ticketTypes: [
        { name: "Regulier", price: parseFloat(newEventData.price), available: parseInt(newEventData.availableTickets, 10) }
      ]
    };
    setEvents(prev => [...prev, newEvent]);
    alert(`"${newEvent.title}" toegevoegd met Regulier tickettype!`);
  };

  const handleUpdateEvent = (id, updatedFields) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === id) {
        return {
          ...ev,
          title: updatedFields.title,
          date: updatedFields.date,
          location: updatedFields.location,
          // Maintain original tiers or modify the baseline regular price
          ticketTypes: ev.ticketTypes.map((tier, index) => 
            index === 0 
              ? { ...tier, price: parseFloat(updatedFields.price), available: parseInt(updatedFields.availableTickets, 10) }
              : tier
          )
        };
      }
      return ev;
    }));
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