import React, { useState } from 'react'; 


const EventCard = ({ event, onReserve }) => {
    const [ quantity, setQuantity] = useState(1);
    const isSoldOut = event.availableTickets === 0;

    const handleIncrement = () => {
        if (quantity < event.availableTickets) {
            setQuantity( quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity (quantity - 1);
        }
    };

    const handleReservation = () => {
        onReserve(event.id, quantity);
        setQuantity(1); // reset counter after reservation
    };

    return (
    <div className={`event-card ${isSoldOut ? 'sold-out' : ''}`}>
      <h3>{event.title}</h3>
      <p className="event-detail">📅 {event.date}</p>
      <p className="event-detail">📍 {event.location}</p>
      <p className="event-price">€{event.price.toFixed(2)}</p>
      
      <div className="card-footer">
        {!isSoldOut ? (
          <>
            <span className="tickets-left">{event.availableTickets} tickets beschikbaar</span>
            
            
            <div className="reservation-controls">
              <div className="quantity-selector">
                <button onClick={handleDecrement} disabled={quantity <= 1}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncrement} disabled={quantity >= event.availableTickets}>+</button>
              </div>
              
              <button className="reserve-btn" onClick={handleReservation}>
                Reserveer
              </button>
            </div>
          </>
        ) : (
          <span className="badge sold-out-badge">Uitverkocht</span>
        )}
      </div>
    </div>
  );
}

export default EventCard;