import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events }) => {
    return (
        <div className="event-grid">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
    );
};

export default EventList;