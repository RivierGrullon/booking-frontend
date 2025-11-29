import { UserProfile, Booking, CreateBookingData, SlotsResponse } from "@/types";

class ApiClient {
  private baseUrl: string;
  private accessToken: string | null = null;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  }

  setToken(token: string) {
    this.accessToken = token;
  }

  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    if (!this.accessToken) {
      throw new Error("No access token set");
    }

    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: "API Error" }));
      throw new Error(error.message || `HTTP ${res.status}`);
    }

    const text = await res.text();
    return text ? (JSON.parse(text) as T) : (undefined as unknown as T);
  }

  // Auth
  getProfile = () => this.fetch<UserProfile>("/auth/me");

  getGoogleAuthUrl = () => this.fetch<{ url: string }>("/auth/google/connect");

  disconnectGoogle = () =>
    this.fetch<void>("/auth/google/disconnect", { method: "POST" });

  // Bookings
  getBookings = () => this.fetch<Booking[]>("/bookings");

  getBooking = (id: string) => this.fetch<Booking>(`/bookings/${id}`);

  createBooking = (data: CreateBookingData) =>
    this.fetch<Booking>("/bookings", {
      method: "POST",
      body: JSON.stringify(data),
    });

  deleteBooking = (id: string) =>
    this.fetch<void>(`/bookings/${id}`, { method: "DELETE" });

  getAvailableSlots = (date: string) =>
    this.fetch<SlotsResponse>(`/bookings/slots?date=${date}`);
}


export const apiClient = new ApiClient();