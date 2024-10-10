import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeatReservationService {
  seats: any[] = [];

  constructor() {
    this.initializeSeats();
  }

  // Initialize seats
  initializeSeats() {
    // 10 rows, 7 seats per row, and last row has 3 seats
    for (let i = 0; i < 80; i++) {
      this.seats.push({
        id: i + 1,
        row: Math.floor(i / 7),
        booked: false,
      });
    }
  }

  // Get current seats
  getSeats() {
    return this.seats;
  }

  // Book seats
  bookSeats(numberOfSeats: number): number[] {
    let bookedSeats: number[] = [];
    const availableSeats = this.seats.filter((seat) => !seat.booked);

    if (availableSeats.length >= numberOfSeats) {
      // Try to find seats in the same row
      for (let row = 0; row < 12; row++) {
        const seatsInRow = availableSeats.filter((seat) => seat.row === row);
        if (seatsInRow.length >= numberOfSeats) {
          bookedSeats = seatsInRow
            .slice(0, numberOfSeats)
            .map((seat) => seat.id);
          break;
        }
      }

      // If no row has enough seats, select the nearest available seats
      if (bookedSeats.length === 0) {
        bookedSeats = availableSeats
          .slice(0, numberOfSeats)
          .map((seat) => seat.id);
      }

      // Mark seats as booked
      this.markSeatsAsBooked(bookedSeats);
    }

    return bookedSeats;
  }

  // Mark specific seats as booked
  markSeatsAsBooked(bookedSeats: number[]) {
    for (let seat of this.seats) {
      if (bookedSeats.includes(seat.id)) {
        seat.booked = true;
      }
    }
  }
}
