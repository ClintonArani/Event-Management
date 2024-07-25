import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDetails } from '../interfaces/event.interface';
import { UserService } from './user.service'; // Import UserService

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:5400/events/new-event';
  private fetchUrl = 'http://localhost:5400/events/all-events'; 
  private baseUrl = 'http://localhost:5400/events';
  private deleteUrl = 'http://localhost:5400/events/delete-event';
  private GetEventId  =  'http://localhost:5400/events/one-event';

  constructor(private http: HttpClient, private userService: UserService) {}

  private get headers(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Create event with FormData for file uploads
  createEvent(eventData: FormData): Observable<EventDetails> {
    return this.http.post<EventDetails>(this.apiUrl, eventData, { headers: this.headers });
  }

  // Fetch all events
  getAllEvents(): Observable<{ events: EventDetails[] }> {
    return this.http.get<{ events: EventDetails[] }>(this.fetchUrl, { headers: this.headers });
  }

  // Update event with EventDetails
  updateEvent(id: string, eventData: EventDetails): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-event/${id}`, eventData, { headers: this.headers });
  }
  
  // Delete event
  deleteEvent(id: string): Observable<void> {
    const url = `${this.deleteUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.headers });
  }

  // Get event by ID
  getEventById(id: string): Observable<EventDetails> {
    const url = `${this.GetEventId}/${id}`;
    return this.http.get<EventDetails>(url, { headers: this.headers });
  }
}
