import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { EventDetails } from '../../interfaces/event.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organizer-active',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './organizer-active.component.html',
  styleUrls: ['./organizer-active.component.css']
})
export class OrganizerActiveComponent implements OnInit {
  events: EventDetails[] = [];
  filteredEvents: EventDetails[] = [];
  searchTerm: string = '';
  showForm: boolean = false;
  isEdit: boolean = false;
  eventForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showConfirmDialog: boolean = false;
  eventToDelete: EventDetails | null = null;
  selectedFile: File | null = null;
  imageError: string | null = null;
  eventPhoto: string = '';

  constructor(private eventService: EventService, private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      Id: [''],
      EventDate: [''],
      EventTime: [''],
      Location: [''],
      Price: [''],
      Description: [''],
      Image: [null] // For file uploads
    });
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getAllEvents().subscribe(
      response => {
        this.events = response.events as EventDetails[];
        this.filteredEvents = [...this.events];
      },
      error => {
        console.error('Error fetching events', error);
        this.errorMessage = 'Error fetching events';
        setTimeout(() => this.errorMessage = null, 3000);
      }
    );
  }

  applyFilter(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredEvents = this.events.filter(event =>
      (event.EventDate ? event.EventDate.toLowerCase().includes(searchTermLower) : '') ||
      (event.EventTime ? event.EventTime.toLowerCase().includes(searchTermLower) : '') ||
      (event.Location ? event.Location.toLowerCase().includes(searchTermLower) : '') ||
      (event.Price ? event.Price.toString().toLowerCase().includes(searchTermLower) : '') ||
      (event.Description ? event.Description.toLowerCase().includes(searchTermLower) : '') ||
      (event.Image ? event.Image.toLowerCase().includes(searchTermLower) : '')
    );
  }

  editEvent(event: EventDetails): void {
    this.isEdit = true;
    this.showForm = true;

    const eventDate = event.EventDate || '';
    const eventTime = event.EventTime || '';

    const formattedEvent = {
      ...event,
      EventDate: eventDate.split('T')[0] || '',
      EventTime: eventTime.split('T')[1]?.substring(0, 5) || ''
    };

    this.eventForm.patchValue(formattedEvent);
  }

  cancelEdit(): void {
    this.isEdit = false;
    this.showForm = false;
    this.eventForm.reset();
  }

  submitForm(): void {
    if (this.eventForm.valid) {
      const formData = new FormData();
      const eventData = this.eventForm.value;

      for (const key in eventData) {
        if (eventData.hasOwnProperty(key)) {
          formData.append(key, eventData[key]);
        }
      }

      if (this.isEdit) {
        const updatedEventData: EventDetails = {
          Id: eventData.Id,
          EventDate: eventData.EventDate,
          EventTime: eventData.EventTime,
          Location: eventData.Location,
          Description: eventData.Description,
          Price: eventData.Price,
          Image: eventData.Image // Assume the image URL is already set here
        };

        this.eventService.updateEvent(eventData.Id, updatedEventData).subscribe(
          response => {
            this.successMessage = 'Event updated successfully';
            setTimeout(() => this.successMessage = null, 3000);
            this.fetchEvents();
            this.cancelEdit();
          },
          error => {
            this.errorMessage = 'Error updating event';
            setTimeout(() => this.errorMessage = null, 3000);
            console.error('Error updating event', error);
          }
        );
      } else {
        this.eventService.createEvent(formData).subscribe(
          response => {
            this.successMessage = 'Event created successfully';
            setTimeout(() => this.successMessage = null, 3000);
            this.fetchEvents();
            this.cancelEdit();
          },
          error => {
            this.errorMessage = 'Error creating event';
            setTimeout(() => this.errorMessage = null, 3000);
            console.error('Error creating event', error);
          }
        );
      }
    } else {
      console.error('Form is invalid');
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "eventphoto");
    formData.append("cloud_name", "damim3aid");

    fetch("https://api.cloudinary.com/v1_1/damim3aid/image/upload", {
      method: "POST",
      body: formData
    }).then(res => res.json()).then(res => {
      this.eventPhoto = res.url;
      this.eventForm.patchValue({
        Image: this.eventPhoto
      });
    });
  }

  confirmDeleteEvent(event: EventDetails): void {
    this.showConfirmDialog = true;
    this.eventToDelete = event;
  }

  deleteEvent(): void {
    if (this.eventToDelete) {
      this.eventService.deleteEvent(this.eventToDelete.Id).subscribe(
        () => {
          this.successMessage = 'Event deleted successfully';
          setTimeout(() => this.successMessage = null, 3000);
          this.fetchEvents(); // Refresh the list of events
        },
        error => {
          this.errorMessage = 'Error deleting event';
          setTimeout(() => this.errorMessage = null, 3000);
          console.error('Error deleting event', error);
        }
      );
      this.showConfirmDialog = false;
      this.eventToDelete = null;
    }
  }
  

  cancelDelete(): void {
    this.showConfirmDialog = false;
    this.eventToDelete = null;
  }
}
