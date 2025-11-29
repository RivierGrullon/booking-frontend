"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Plus, LogOut, Link as LinkIcon, Loader2 } from "lucide-react";
import type { User } from "@auth0/nextjs-auth0/types";
import { toast } from "sonner";

import { apiClient } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Booking, UserProfile } from "@/types";
import { BookingForm, BookingList } from "./booking-form";
import { GoogleCalendarCard } from "./calendar-card";

interface Props {
  user: User;
  accessToken: string;
}

const INITIAL_FORM_STATE = {
  name: "",
  date: "",
  startTime: "",
  endTime: "",
};

export default function DashboardClient({ user, accessToken }: Props) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    apiClient.setToken(accessToken);
  }, [accessToken]);

  const loadData = useCallback(async () => {
    try {
      const [profileData, bookingsData] = await Promise.all([
        apiClient.getProfile(),
        apiClient.getBookings(),
      ]);
      setProfile(profileData);
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleConnectGoogle = useCallback(async () => {
    try {
      const data = await apiClient.getGoogleAuthUrl();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Error: No Google URL received");
      }
    } catch (error) {
      console.error("Error connecting to Google:", error);
      toast.error("Error connecting with Google Calendar");
    }
  }, []);

  const handleDisconnectGoogle = useCallback(async () => {
    try {
      await apiClient.disconnectGoogle();
      setProfile((prev) =>
        prev ? { ...prev, isGoogleCalendarConnected: false } : null
      );
      toast.success("Disconnected from Google Calendar");
    } catch (error) {
      console.error("Error disconnecting Google:", error);
      toast.error("Failed to disconnect Google Calendar");
    }
  }, []);

  const handleCreateBooking = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);

      try {
        const startTime = new Date(
          `${formData.date}T${formData.startTime}`
        ).toISOString();
        const endTime = new Date(
          `${formData.date}T${formData.endTime}`
        ).toISOString();

        const newBooking = await apiClient.createBooking({
          name: formData.name,
          startTime,
          endTime,
        });

        setBookings((prev) => [...prev, newBooking]);
        setShowModal(false);
        setFormData(INITIAL_FORM_STATE);
        toast.success("Booking created successfully");
      } catch (error: any) {
        console.error("Error creating booking:", error);

        toast.error(error.message || "Failed to create booking");
      } finally {
        setSubmitting(false);
      }
    },
    [formData]
  );

  const handleDeleteBooking = useCallback(async (id: string) => {
    try {
      await apiClient.deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      toast.success("Booking deleted");
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking");
    }
  }, []);

  const handleFormChange = useCallback(
    (field: keyof typeof INITIAL_FORM_STATE) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      },
    []
  );

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setFormData(INITIAL_FORM_STATE);
  }, []);

  const sortedBookings = useMemo(
    () =>
      [...bookings].sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      ),
    [bookings]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">BookingApp</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user.email}</span>
            <a
              href="/auth/logout"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4" /> Logout
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <GoogleCalendarCard
          isConnected={profile?.isGoogleCalendarConnected ?? false}
          onConnect={handleConnectGoogle}
          onDisconnect={handleDisconnectGoogle}
        />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Bookings</CardTitle>
            <Dialog open={showModal} onOpenChange={setShowModal}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" /> New Booking
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Booking</DialogTitle>
                </DialogHeader>
                <BookingForm
                  formData={formData}
                  submitting={submitting}
                  onChange={handleFormChange}
                  onSubmit={handleCreateBooking}
                  onCancel={handleCloseModal}
                />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <BookingList
              bookings={sortedBookings}
              onDelete={handleDeleteBooking}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
