import React, { useState, useEffect } from 'react';

const EventCard = ({ event, onReserve, onSelectPrice = () => {} }) => {
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const activeTier = event.ticketTypes[selectedTierIndex];
  const isSoldOut = activeTier.available === 0;

  useEffect(() => {
    onSelectPrice(activeTier.price);
  }, [selectedTierIndex, activeTier.price, onSelectPrice]);

  const handleIncrement = () => {
    if (quantity < activeTier.available) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleReservation = () => {
    onReserve(event.id, activeTier.name, quantity);
    setQuantity(1);
  };

  return (
    <div className={`event-card ${isSoldOut ? 'sold-out' : ''}`}>
      <h3>{event.title}</h3>
      <p className="event-detail">📅 {event.date}</p>
      <p className="event-detail">📍 {event.location}</p>
      
      <div className="ticket-type-selector" style={{ margin: '10px 0' }}>
        <label htmlFor={`tier-${event.id}`} style={{ marginRight: '8px', color: '#a8a8b3' }}>
          Tickettype:
        </label>
        <select 
          id={`tier-${event.id}`} 
          value={selectedTierIndex} 
          onChange={(e) => {
            setSelectedTierIndex(parseInt(e.target.value, 10));
            setQuantity(1);
          }}
          style={{ background: '#121214', color: '#fff', border: '1px solid #29292e', padding: '6px', borderRadius: '4px' }}
        >
          {event.ticketTypes.map((tier, idx) => (
            <option key={tier.name} value={idx}>
              {tier.name} (€{tier.price.toFixed(2)})
            </option>
          ))}
        </select>
      </div>

      <p className="event-price">€{activeTier.price.toFixed(2)}</p>
      
      <div className="card-footer">
        {!isSoldOut ? (
          <>
            <span className="tickets-left">{activeTier.available} tickets over</span>
            
            <div className="reservation-controls">
              <div className="quantity-selector">
                <button onClick={handleDecrement} disabled={quantity <= 1}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncrement} disabled={quantity >= activeTier.available}>+</button>
              </div>
              
              <button className="reserve-btn" onClick={handleReservation}>
                Reserveer
              </button>
            </div>
          </>
        ) : (
          <span className="badge sold-out-badge">Dit type is uitverkocht</span>
        )}
      </div>
    </div>
  );
};

export default EventCard;
//done