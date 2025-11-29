export interface Booking {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingData {
  name: string;
  startTime: string;
  endTime: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  picture: string | null;
  isGoogleCalendarConnected: boolean;
}

export interface GoogleEvent {
  id: string;
  summary: string;
  start: string;
  end: string;
}

export interface SlotsResponse {
  date: string;
  bookings: Booking[];
  googleEvents: GoogleEvent[];
}

export interface ConflictError {
  message: string;
  type: 'SYSTEM_CONFLICT' | 'GOOGLE_CALENDAR_CONFLICT';
  conflictingBooking?: {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
  };
  conflictingEvent?: {
    summary: string;
    start: string;
    end: string;
  };
}