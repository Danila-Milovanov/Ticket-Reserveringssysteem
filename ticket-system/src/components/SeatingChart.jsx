import React, { useState } from "react";

const INITIAL_SEATING = [
    { id: 'A1', row: 'A', number: 1, status: 'available' },
    { id: 'A2', row: 'A', number: 2, status: 'occupied' }, // taken
    { id: 'A3', row: 'A', number: 3, status: 'available' },
    { id: 'A4', row: 'A', number: 4, status: 'available' },
    { id: 'B1', row: 'B', number: 1, status: 'available' },
    { id: 'B2', row: 'B', number: 2, status: 'available' },
    { id: 'B3', row: 'B', number: 3, status: 'occupied' }, // taken
    { id: 'B4', row: 'B', number: 4, status: 'available' },
    { id: 'C1', row: 'C', number: 1, status: 'available' },
    { id: 'C2', row: 'C', number: 2, status: 'available' },
    { id: 'C3', row: 'C', number: 3, status: 'available' },
    { id: 'C4', row: 'C', number: 4, status: 'available' },

];

const SeatingChart = ({ eventPrice }) => {
  const [seats, setSeats] = useState(INITIAL_SEATS);

  // Toggle seat selectie
  const handleSeatClick = (seatId) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) => {
        if (seat.id === seatId) {
          if (seat.status === 'available') {
            return { ...seat, status: 'selected' }; // select it
          } else if (seat.status === 'selected') {
            return { ...seat, status: 'available' }; // deselect it
          }
        }
        return seat; // If occupied / not matching - leave it
      })
    );
  };

  
}