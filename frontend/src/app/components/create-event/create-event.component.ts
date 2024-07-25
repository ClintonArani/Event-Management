import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service'; // Adjust path as needed
import { EventDetails } from '../../interfaces/event.interface'; // Adjust path as needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  eventForm: FormGroup;
  selectedFile: File | null = null;
  successMessage: string | null = null;
  imageError: string | null = null;
  eventPhoto: string = '';

  constructor(private fb: FormBuilder, private eventService: EventService, private router: Router) {
    this.eventForm = this.fb.group({
      EventDate: ['', Validators.required],
      EventTime: ['', Validators.required],
      Location: ['', Validators.required],
      Price: ['', Validators.required],
      Description: ['', Validators.required],
      Image: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    
    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'eventphoto');
    formData.append('cloud_name', 'damim3aid');

    fetch('https://api.cloudinary.com/v1_1/damim3aid/image/upload', {
      method: 'POST',
      body: formData
    }).then(res => res.json()).then(res => {
      this.eventPhoto = res.url;
      console.log(this.eventPhoto);
      this.eventForm.patchValue({
        Image: this.eventPhoto
      });
    });
  }

  submitForm(): void {
    this.eventService.createEvent(this.eventForm.value).subscribe(
      (res) => {
        console.log(res);
        // Clear the form
        this.eventForm.reset();
        // Show success message
        this.successMessage = 'Event created successfully!';
        // Hide success message after 3 seconds
        setTimeout(() => {
          this.successMessage = null;
          // Navigate to the dashboard
          this.router.navigate(['organizer/dashboard']);
        }, 3000);
      },
      (error) => {
        console.error('Error creating event:', error);
      }
    );
  }

  continue(): void {
    this.successMessage = null;
  }
}
