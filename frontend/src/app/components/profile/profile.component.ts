import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedProfileService } from '../../services/shared-profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  successMessage: string = '';
  successTimeout: any;

  constructor(private sharedProfileService: SharedProfileService){}

  admin = {
    id: 1,
    name: 'Organizer Name',
    email: 'organizer@gmail.com',
    profileImage: '../assets/bill.jpg',
    password: '********',
  };

  editMode = false;

  changeProfileImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.admin.profileImage = e.target.result;
        this.sharedProfileService.changeProfileImage(this.admin.profileImage);
        this.successMessage = 'Profile image updated successfully!';
        this.showSuccessMessage();
      };
      reader.readAsDataURL(file);
    }
  }
  toggleEditMode() {
    this.editMode = !this.editMode;
  }
  saveDetails() {
    // Example: Implement logic to save details to server
    this.editMode = false;
    console.log('Details saved successfully.');
  }

  // Method to cancel editing and revert changes
  cancelEdit1() {
    // Reset any changes made during edit mode
    // Example: Fetch original data from server or reset local changes
    this.editMode = false;
    console.log('Edit canceled.');
  }
  showSuccessMessage(): void {
    // Clear existing timeout
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
    // Set timeout to clear success message after 3 seconds
    this.successTimeout = setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
}
