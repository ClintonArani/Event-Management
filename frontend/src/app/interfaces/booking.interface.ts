export interface Booking {
  Id?: string;
  UserId: string;
  EventId: string;
  Type: 'single' | 'group';
  BookingDate: string; // ISO string format
  NumberOfPeople: number;
  TotalPrice?: number; // If available, add this
}
