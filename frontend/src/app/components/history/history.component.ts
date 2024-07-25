import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../interfaces/booking.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  historyEvents: Booking[] = [];
  searchTerm: string = '';
  successMessage: string = '';
  showConfirmationDialog: boolean = false;
  bookingIdToDelete?: string;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.bookingService.getAllBookings().subscribe({
      next: (response) => {
        console.log('Fetched bookings:', response); // Log the fetched data
        this.historyEvents = response.bookings;
        console.log('History Events:', this.historyEvents); // Log the data to ensure it's assigned correctly
      },
      error: (err) => console.error('Error fetching bookings:', err)
    });
  }

  openConfirmationDialog(bookingId: string): void {
    this.showConfirmationDialog = true;
    this.bookingIdToDelete = bookingId;
  }

  closeConfirmationDialog(): void {
    this.showConfirmationDialog = false;
    this.bookingIdToDelete = undefined;
  }

  confirmDelete(): void {
    if (this.bookingIdToDelete) {
      this.deleteBooking(this.bookingIdToDelete);
      this.closeConfirmationDialog();
    }
  }

  deleteBooking(bookingId: string): void {
    this.bookingService.deleteBooking(bookingId).subscribe({
      next: () => {
        this.historyEvents = this.historyEvents.filter(event => event.Id !== bookingId);
        this.setSuccessMessage('Booking deleted successfully.');
      },
      error: (err) => console.error('Error deleting booking:', err)
    });
  }

  setSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  onSearch(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.historyEvents = this.historyEvents.filter(event => 
      event.BookingDate.includes(this.searchTerm) ||
      (event.UserId && event.UserId.toLowerCase().includes(searchTermLower)) ||
      event.Type.toLowerCase().includes(searchTermLower) ||
      event.NumberOfPeople.toString().includes(this.searchTerm)
    );
  }
}
