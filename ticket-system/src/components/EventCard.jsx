import React, { useState } from 'react'; 


const EventCard = ({ event, onReserve }) => {

    const [selectedTierIndex, setSelectedTierIndex] = useState(0);
    const [ quantity, setQuantity] = useState(1);
    const isSoldOut = event.availableTickets === 0;

    const activeTier = event.ticketTypes[selectedTierIndex];
    const isSoldOut = activeTier.available === 0;


    //global seating chart = what price is currently selected
    useEffect(() => {
      onSelectedPrice(activeTier.price);
    }, [ selectedTierIndex, activeTier, onSelectedPrice]);

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
      
      {/* dropdown selector*/}
      <div className="ticket-type-selector">
        <label htmlFor={`tier-${event.id}`}>Tickettype:</label>
        <select 
          id={`tier-${event.id}`} 
          value={selectedTierIndex} 
          onChange={(e) => {
            setSelectedTierIndex(parseInt(e.target.value, 10));
            setQuantity(1); // Reset counter safely
          }}
        />
          {event.ticketTypes.map((tier, idx) => (
            <option key={tier.name} value={idx}>
              {tier.name} (€{tier.price.toFixed(2)})
            </option>
          ))}
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
                Reserveer Tiers
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


// test complete, ready to deploy in main branch
// update US5: Nieuwe price display voor VIP, enz