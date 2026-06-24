import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events, onReserve, onSelectedPrice }) => {
  return (
    <div className="event-grid">
      {events.map(event => (
        <EventCard key={event.id} event={event} onReserve={onReserve} onSelectedPrice={onSelectedPrice} />
      ))}
    </div>
  );
};

export default EventList;