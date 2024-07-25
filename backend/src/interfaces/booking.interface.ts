export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  type: 'single' | 'group';
  bookingDate: Date;
  numberOfPeople: number;
  totalPrice?: number; // Optional since it's calculated
}
