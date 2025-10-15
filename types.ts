export interface User {
  uid: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
}

export enum SeatStatus {
  Available = 'Available',
  Occupied = 'Occupied',
  Selected = 'Selected',
  Reserved = 'Reserved',
}

export interface Seat {
  id: string;
  seatNumber: string;
  status: SeatStatus;
  position: { x: number; y: number };
  type: 'pc' | 'console';
}

export interface Zone {
  id: string;
  name: string;
  description: string;
  totalSeats: number;
  occupiedSeats: number;
  seats: Seat[];
}

export enum BookingStatus {
  Confirmed = 'Confirmed',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Pending = 'Pending',
}

export interface Booking {
  id: string;
  zoneName: string;
  seatNumbers: string[];
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
  qrCodeValue: string;
}
