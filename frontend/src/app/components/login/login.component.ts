import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''));
    return JSON.parse(base64);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login({ email, password }).subscribe({
        next: (response) => {
          // Store the token in local storage
          localStorage.setItem('authToken', response.token);

          // Decode the token to get user role
          const token = response.token;
          const decodedToken: any = this.parseJwt(token); // Decode the JWT token

          // Check user role and navigate accordingly
          const role = decodedToken.role; // Adjust based on your token structure
          this.successMessage = 'Login successful!';
          this.errorMessage = '';

          // Clear the success message after 3 seconds
          setTimeout(() => this.successMessage = '', 3000);

          if (role === 'admin') {
            this.router.navigate(['/admin']);
          } else if (role === 'user') {
            this.router.navigate(['/user']);
          } else if (role === 'organizer') {
            this.router.navigate(['/organizer']);
          }
        },
        error: (error) => {
          this.errorMessage = 'Invalid credentials. Please try again.';
          this.successMessage = '';

          // Clear the error message after 3 seconds
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }
}
