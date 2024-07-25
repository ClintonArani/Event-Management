import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Booking } from '../interfaces/booking.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookEventUrl = 'http://localhost:5400/books/new-book';
  private allBookingsUrl = 'http://localhost:5400/books/all-bookings';
  private deleteBookingUrl = 'http://localhost:5400/books/delete-event';

  constructor(private http: HttpClient) {}

  bookEvent(bookingData: Booking): Observable<Booking> {
    const token = localStorage.getItem('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post<Booking>(this.bookEventUrl, bookingData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getAllBookings(): Observable<{ bookings: Booking[] }> {
    const token = localStorage.getItem('authToken');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<{ bookings: Booking[] }>(this.allBookingsUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteBooking(bookingId: string): Observable<void> {
    const token = localStorage.getItem('authToken');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.delete<void>(`${this.deleteBookingUrl}/${bookingId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
