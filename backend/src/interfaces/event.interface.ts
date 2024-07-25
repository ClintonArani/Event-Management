export interface Event {
  id: string; // Optional or required based on your needs
  Image: string;
  EventDate: string;
  EventTime: string;
  Location: string;
  Price: string;
  Description: string;
  isBooked?: boolean; // Optional field
}
