import { Component } from '@angular/core';
import { SeatReservationService } from './seat-reservation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  numberOfSeats: number = 1; // Default value for seats
  bookedSeats: number[] = [];
  allSeats: any[] = [];
  bookingFailed: boolean = false; // Flag for booking failure

  constructor(private seatService: SeatReservationService) {
    this.allSeats = this.seatService.getSeats();
  }

  // Function to reserve seats
  reserveSeats() {
    this.bookedSeats = this.seatService.bookSeats(this.numberOfSeats);
    this.allSeats = this.seatService.getSeats(); // Refresh seat status after booking

    // Check if booking failed
    if (this.bookedSeats.length < this.numberOfSeats) {
      this.bookingFailed = true;
    } else {
      this.bookingFailed = false;
    }
  }

  // Function to structure seats into rows
  getSeatRows() {
    const rows = [];
    for (let i = 0; i < this.allSeats.length; i += 7) {
      rows.push(this.allSeats.slice(i, i + 7));
    }
    return rows;
  }
}
