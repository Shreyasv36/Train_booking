import React, { useState } from "react";
import "./App.css";
import "./Train.css";

function App() {
  const totalSeats = 80;
  const seatsPerRow = 7;
  const lastRowSeats = 3;
  const maxReservation = 7;
  const fullRows = Math.floor((totalSeats - lastRowSeats) / seatsPerRow);
  const totalRows = fullRows + 1;

  const [seats, setSeats] = useState(Array(totalSeats).fill(null));
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservationName, setReservationName] = useState("");
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");

  const toggleSeat = (seatIndex) => {
    if (seats[seatIndex] !== null) return;

    setSelectedSeats((prev) => {
      if (prev.includes(seatIndex)) {
        return prev.filter((i) => i !== seatIndex);
      } else {
        if (prev.length >= maxReservation) {
          setError(
            `You can only reserve up to ${maxReservation} seats at a time`
          );
          return prev;
        }
        setError("");
        return [...prev, seatIndex];
      }
    });
  };
  const handleReservation = (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
      setError("Please select at least one seat");
      return;
    }
    if (!reservationName.trim()) {
      setError("Please enter your name");
      return;
    }
    const newReservation = {
      name: reservationName,
      seats: [...selectedSeats].sort((a, b) => a - b),
      id: Date.now(),
    };

    const updatedSeats = [...seats];
    selectedSeats.forEach((seat) => {
      updatedSeats[seat] = newReservation.id;
    });

    setSeats(updatedSeats);
    setReservations([...reservations, newReservation]);
    setSelectedSeats([]);
    setReservationName("");
    setError("");
  };

  const handleCancel = (reservationId) => {
    const updatedSeats = seats.map((seat) =>
      seat === reservationId ? null : seat
    );

    const updatedReservations = reservations.filter(
      (res) => res.id !== reservationId
    );

    setSeats(updatedSeats);
    setReservations(updatedReservations);
  };

  const renderCoach = () => {
    let seatIndex = 0;
    let rows = [];

    for (let row = 0; row < totalRows; row++) {
      const seatsInThisRow = row === totalRows - 1 ? lastRowSeats : seatsPerRow;
      let rowSeats = [];

      for (let seat = 0; seat < seatsInThisRow; seat++) {
        const currentSeatIndex = seatIndex;
        const isReserved = seats[currentSeatIndex] !== null;
        const isSelected = selectedSeats.includes(currentSeatIndex);

        rowSeats.push(
          <div
            key={currentSeatIndex}
            className={`seat ${isReserved ? "reserved" : ""} ${
              isSelected ? "selected" : ""
            }`}
            onClick={() => !isReserved && toggleSeat(currentSeatIndex)}
          >
            {currentSeatIndex + 1}
          </div>
        );

        seatIndex++;
      }

      rows.push(
        <div key={row} className="seat-row">
          {rowSeats}
        </div>
      );
    }

    return <div className="coach">{rows}</div>;
  };
  return (
    <div className="app">
      <h1>Train Seat Reservation</h1>
      <p>
        Total seats: {totalSeats} | Seats per row: {seatsPerRow} (last row:{" "}
        {lastRowSeats})
      </p>

      <div className="container">
        <div className="coach-container">{renderCoach()}</div>

        <div className="reservation-form">
          <h2>Reserve Seats</h2>
          {error && <div className="error">{error}</div>}

          <form onSubmit={handleReservation}>
            <div className="form-group">
              <label>Your Name:</label>
              <input
                type="text"
                value={reservationName}
                onChange={(e) => setReservationName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label>
                Selected Seats ({selectedSeats.length} of {maxReservation}):
              </label>
              <div className="selected-seats p1">
                {selectedSeats.length > 0 ? (
                  selectedSeats.map((seat) => (
                    <span key={seat} className="seat-number">
                      {seat + 1}
                    </span>
                  ))
                ) : (
                  <span className="placeholder">No seats selected</span>
                )}
              </div>
            </div>
            <button type="submit" disabled={selectedSeats.length === 0}>
              Reserve Selected Seats
            </button>
          </form>
        </div>
      </div>

      <div className="reservations-list">
        <h2>Your Reservations</h2>
        {reservations.length === 0 ? (
          <p>No reservations yet</p>
        ) : (
          <ul>
            {reservations.map((res) => (
              <li key={res.id}>
                <span>
                  {res.name} - Seats: {res.seats.map((s) => s + 1).join(", ")}
                </span>
                <button onClick={() => handleCancel(res.id)}>Cancel</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default App;
