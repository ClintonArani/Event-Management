import { Component, OnInit } from '@angular/core';
import { EventDetails } from '../../interfaces/event.interface';
import { EventService } from '../../services/event.service';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../interfaces/booking.interface';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-active',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-active.component.html',
  styleUrls: ['./user-active.component.css']
})
export class UserActiveComponent implements OnInit {
  events: EventDetails[] = [];
  filteredEvents: EventDetails[] = [];
  selectedEvent: EventDetails | null = null;
  successMessage: string | null = null;
  bookingType: 'single' | 'group' = 'single'; // Default value
  numberOfPeople: number = 1; // Default value

  constructor(
    private eventService: EventService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      response => {
        this.events = response.events;
        this.filteredEvents = response.events;
        console.log('Events loaded:', this.events); // Debugging statement
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }

  filterTable(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEvents = this.events.filter(e =>
      e.Description.toLowerCase().includes(filterValue)
    );
  }

  viewDetails(selectedEvent: EventDetails): void {
    console.log('Viewing details for event with Id:', selectedEvent.Id);
    this.selectedEvent = this.events.find(e => e.Id === selectedEvent.Id) || null;
    console.log('Selected Event:', this.selectedEvent);
    if (!this.selectedEvent) {
      console.error('Event not found with Id:', selectedEvent.Id);
    }
  }

  getUserIdFromToken(token: string): string {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  }

  bookEvent(): void {
    const token = localStorage.getItem('authToken');
    if (token && this.selectedEvent) {
      const userId = this.getUserIdFromToken(token);
      const bookingData: Booking = {
        UserId: userId,
        EventId: this.selectedEvent.Id, // Ensure this is not null or undefined
        Type: this.bookingType,
        BookingDate: new Date().toISOString(),
        NumberOfPeople: this.numberOfPeople
      };
      console.log('Booking Data:', bookingData); // Debug logging
      this.bookingService.bookEvent(bookingData).subscribe(
        res => {
          console.log('Booking Response:', res);
          this.successMessage = 'Event booked successfully!';
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
        },
        error => {
          console.error('Booking Error:', error);
        }
      );
    } else {
      console.error('Token or selected event is missing');
    }
  }
  
  
}
