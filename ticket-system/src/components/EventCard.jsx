import React from 'react';

const EventCard = ({ event }) => {
    const isSoldOut = event.availableTickets === 0;

    return (
        <div className={`event-card ${isSoldOut ? 'sold-out': ''}`}>
            <h3>{event.title}</h3>
            <p className='event-detail'>📅 {event.date}</p>
            <p className='event-detail'>📍</p>
            <p className='event-price'>€{event.price.toFixed(2)}</p>

            <div className="card-footer">
        {!isSoldOut ? (
          <span className="tickets-left">{event.availableTickets} tickets beschikbaar</span>
        ) : (
          <span className="badge sold-out-badge">Uitverkocht</span>
        )}
            
            </div>
        </div>
    );
};

export default EventCard;