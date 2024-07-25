import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Users } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private createUserUrl = 'http://localhost:5400/users/create';
  private loginUrl = 'http://localhost:5400/auth';
  private apiUrl = 'http://localhost:5400/users/all-users';
  private baseUrl = 'http://localhost:5400/users';

  constructor(private http: HttpClient) {}

  createUser(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Creating user:', user);
    return this.http.post<any>(this.createUserUrl, user, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/login`, credentials).pipe(
      tap((response: { token: string; }) => {
        // Store token in local storage
        localStorage.setItem('authToken', response.token);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl);
  }

  switchRole(userId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/switch-role`, { user_id: userId });
  }
}
