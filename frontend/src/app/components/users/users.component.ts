import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Adjust the path as needed
import { Users } from '../../interfaces/user.interface'; // Import the Users interface
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  selectedusers: Users[] = [];
  successMessage: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: { users: Users[] } | any) => {
        if (Array.isArray(data.users)) {
          this.selectedusers = data.users;
        } else {
          console.error('Data.users is not an array:', data.users);
          this.successMessage = 'Failed to load users.';
        }
      },
      error: (err) => {
        console.error('Error fetching users', err);
        this.successMessage = 'Failed to load users.';
      }
    });
  }

  approveUser(user: Users, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked; // true if checked, false if unchecked
    const newRole = isChecked ? 'organizer' : 'user';
    const successMessage = isChecked
      ? `${user.firstName}'s role has been successfully changed to organizer.`
      : `${user.firstName}'s role has been successfully changed to user.`;

    // Call the switchRole method from UserService
    this.userService.switchRole(user.id).subscribe({
      next: () => {
        // Update local user role after successful API call
        const updatedUser = { ...user, role: newRole };
        const index = this.selectedusers.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.selectedusers[index] = updatedUser;
        }

        // Set success message
        this.successMessage = successMessage;
        setTimeout(() => this.successMessage = null, 3000); // Hide message after 3 seconds

        console.log('User role updated:', updatedUser);
      },
      error: (err) => {
        console.error('Error switching user role', err);
        this.successMessage = 'Failed to switch user role.';
      }
    });
  }
}
