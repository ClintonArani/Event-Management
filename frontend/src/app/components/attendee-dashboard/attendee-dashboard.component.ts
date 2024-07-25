import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventDetails } from '../../interfaces/event.interface'; 

declare var createGoogleEvent: any;
declare var gapiLoaded: any;
declare var gisLoaded: any;

@Component({
  selector: 'app-attendee-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './attendee-dashboard.component.html',
  styleUrls: ['./attendee-dashboard.component.css']
})
export class AttendeeDashboardComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // showProfile: boolean = false;
  // appointmentForm!: FormGroup;
  // bookings: any[] = []; // Placeholder for bookings
  // historyEvents: any[] = []; // Placeholder for history events
  // showBookings = false;
  // showHistory = false;
  // successMessage: string = '';
  // successTimeout: any;
  // sidebarCollapsed: boolean = false; 
  // events: EventDetails[] = [
  //   {id: '1', EventDate:'2024-07-09', EventTime: '10:00 AM', Location: 'Nairobi, Kenya', Description: 'Annual Tech Conference', Price: "$2000"},
  //   { id: '2', EventDate: '2024-08-15', EventTime: '2:00 PM', Location: 'Mombasa, Kenya', Description: 'Software Development Workshop', Price: "$5200"}
    
  // ];
  // filteredEvents: EventDetails[] = this.events;
  // selectedEvent: EventDetails | null = null;
  // admin = {
  //   id: 1,
  //   name: 'Attendee Name',
  //   email: 'attendee@example.com',
  //   profileImage: 'path/to/profile-image.jpg',
  //   password: '********',
  // };
  // editMode = false;
  // bookedEventsCount: number = 0;
  // nonBookedEventsCount: number = 0;
  // allEventsCount: number = 0;

  // constructor(private fb: FormBuilder) {}

  // ngOnInit() {
  //   this.appointmentForm = this.fb.group({
  //     appointmentTime: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //   });
   
  //   const gapiScript = document.createElement('script');
  //   gapiScript.src = "https://apis.google.com/js/api.js";
  //   gapiScript.onload = () => gapiLoaded();
  //   document.body.appendChild(gapiScript);

  //   const gisScript = document.createElement('script');
  //   gisScript.src = "https://accounts.google.com/gsi/client";
  //   gisScript.onload = () => gisLoaded();
  //   document.body.appendChild(gisScript);

    
  //   this.updateEventCounts();
  // }

  // scheduleMeeting() {
  //   const appointmentTime = new Date(this.appointmentForm.value.appointmentTime);
  //   const startTime = appointmentTime.toISOString().slice(0, -1) + '-07:00';
  //   const endTime = this.getEndTime(appointmentTime);
  //   const eventDetails = {
  //     email: this.appointmentForm.value.email,
  //     startTime: startTime,
  //     endTime: endTime,
  //   };
  //   console.log('Attempting to create Google Event', eventDetails);
  //   createGoogleEvent(eventDetails);

  //   this.successMessage = 'Event sheduled successfully.';
  //   this.showSuccessMessage();
  // }

  // getEndTime(appointmentTime: Date) {
  //   appointmentTime.setHours(appointmentTime.getHours() + 1);
  //   const endTime = appointmentTime.toISOString().slice(0, -1) + '-07:00';
  //   return endTime;
  // }


  // toggleProfile() {
  //   this.showProfile = !this.showProfile;
  // }

  // changeProfileImage(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.admin.profileImage = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //     this.successMessage = 'update profile photo successfully'
  //     this.showSuccessMessage();
  //   }
  // }

  // toggleEditMode() {
  //   this.editMode = !this.editMode;
  // }

  // saveDetails() {
  //   this.editMode = false;
  //   console.log('Details saved successfully.');
  //   this.successMessage = 'Details saved successfully.'
  //   this.showSuccessMessage
  // }

  // cancelEdit() {
  //   this.editMode = false;
  //   console.log('Edit canceled.');
  // }

  // filterTable(event: Event): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   const query = inputElement.value.toLowerCase();
  //   this.filteredEvents = this.events.filter(event =>
  //     event.Location.toLowerCase().includes(query) ||
  //     event.Description.toLowerCase().includes(query) ||
  //     event.EventTime.toLowerCase().includes(query) ||
  //     event.EventDate.toLowerCase().includes(query)
  //   );
  // }

  // viewDetails(event: EventDetails): void {
  //   this.selectedEvent = event;
  // }

  // bookEvent(event: EventDetails): void {
  //   console.log('Booking event:', event);
    

    
  //   this.updateEventCounts();

  
  //   this.successMessage = 'Event booked successfully.';
  //   this.showSuccessMessage();
  // }

  // closeEventDetails(): void {
  //   this.selectedEvent = null;
  // }

  // viewBookings(): void {
    
  //   this.bookings = [
  //     { id: 1, date: '2024-07-15', time: '10:00 AM', location: 'Conference Room A', description: 'Meeting with client' },
  //     { id: 2, date: '2024-07-18', time: '2:30 PM', location: 'Office Lobby', description: 'Team meeting' }
      
  //   ];
  //   this.showBookings = true;
  //   this.showHistory = false;
  // }

  // viewBookingHistory(): void {
    
  //   this.historyEvents = [
  //     { id: 1, date: '2024-06-30', time: '2:00 PM', location: 'Conference Room B', description: 'Training session' },
  //     { id: 2, date: '2024-07-05', time: '3:30 PM', location: 'Online', description: 'Webinar' }
      
  //   ];
  //   this.showHistory = true;
  //   this.showBookings = false;
  // }

  // deleteBooking(bookingId: number): void {
    
  //   this.bookings = this.bookings.filter(booking => booking.id !== bookingId);

   
  //   this.updateEventCounts();

    
  //   this.successMessage = 'Booking deleted successfully.';
  //   this.showSuccessMessage();
  // }

  // deleteHistory(historyId: number): void {
    
  //   this.historyEvents = this.historyEvents.filter(history => history.id !== historyId);

   
  //   this.successMessage = 'History event deleted successfully.';
  //   this.showSuccessMessage();
  // }

  // closeHistory(): void {
  //   this.showHistory = false;
  // }

  // closeBooking(): void {
  //   this.showBookings = false;
  // }

  // toggleSidebar() {
  //   this.sidebarCollapsed = !this.sidebarCollapsed;
  // }

  // showSuccessMessage(): void {
   
  //   if (this.successTimeout) {
  //     clearTimeout(this.successTimeout);
  //   }
    
  //   this.successTimeout = setTimeout(() => {
  //     this.successMessage = '';
  //   }, 3000);
  // }

  // updateEventCounts(): void {
  //   this.bookedEventsCount = this.events.filter(event => event).length;
  //   this.nonBookedEventsCount = this.events.filter(event=>event).length;
  //   this.allEventsCount = this.events.length;
  // }
}
