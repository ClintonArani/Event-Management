import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.userService.createUser(this.registerForm.value).subscribe(
        (response: any) => {
          this.successMessage = 'User registered successfully!';
          this.errorMessage = '';
          this.registerForm.reset();
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/login']); // Navigate to login page
          }, 3000);
        },
        (error: any) => {
          this.errorMessage = 'An error occurred while registering the user.';
          this.successMessage = '';
          console.error(error);
          setTimeout(() => this.errorMessage = '', 3000);
        }
      );
    }
  }
}
