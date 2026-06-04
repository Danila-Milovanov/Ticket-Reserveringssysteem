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

  const selectedSeats = seats.filter((seat) => seat.status === 'selected');
  const totalPrice = selectedSeats.length * eventPrice;

  return (
    <div className="seating-container">
        <h3>Kies je zitplaatsen</h3>
        // Legenda
        <div className="legend">
            <div className="legend-item"><span className="seat-sample available"></span>Beschikbaar</div>
            <div className="legend-item"><span className="seat-sample selected"></span>Geselecteerd</div>
            <div className="legend-item"><span className="seat-sample occupied"></span>Bezet</div>
        </div>

        <div className="stage">PODIUM / TONEEL</div>

        // Grid van stoelen
        <div className="seating-grid">
            {seats.map((seat) => (
                <button
                key={seat.id}
                    className={`seat ${seat.status}`}
                    disabled={seat.status === 'occupied'}
                    onClick={() => handleSeatClick(seat.id)}
                    title={`Rij ${seat.row} Stoel ${seat.number}`}
                >
                    {seat.id}
                </button>
            ))}
        </div>
        // Summary van geselecteerde stoelen en prijs
            {selectedSeats.length > 0 && (
                <div className="booking-summary">
                    <p>Geselecterde stoelen: <strong>{selectedSeats.map(s => s.id).join(', ')}</strong></p>
                    <p>Totaalprijs: <strong className="price-tag">€{totalPrice.toFixed(2)}</strong></p>
                    <button className="confirm-btn" onClick={() => alert('Zitplaatsen succesvol gereserveerd!')}>
                        Bevestig Zitplaatsen
                    </button>
                </div>
            )}
    </div>
  );
};

export default SeatingChart;