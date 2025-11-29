import { Booking } from "@/types";
import { Label } from "@radix-ui/react-label";
import { Loader2, Calendar, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface BookingFormProps {
  formData: any;
  submitting: boolean;
  onChange: (field: any) => (e: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

interface BookingItemProps {
  booking: Booking;
  onDelete: (id: string) => void;
}

interface BookingListProps {
  bookings: Booking[];
  onDelete: (id: string) => void;
}

export function BookingForm({
  formData,
  submitting,
  onChange,
  onSubmit,
  onCancel,
}: BookingFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Booking Name</Label>
        <Input
          id="name"
          placeholder="Booking name"
          required
          value={formData.name}
          onChange={onChange("name")}
          disabled={submitting}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          required
          min={new Date().toISOString().split("T")[0]}
          value={formData.date}
          onChange={onChange("date")}
          disabled={submitting}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            type="time"
            required
            value={formData.startTime}
            onChange={onChange("startTime")}
            disabled={submitting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            type="time"
            required
            value={formData.endTime}
            onChange={onChange("endTime")}
            disabled={submitting}
          />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </form>
  );
}

export function BookingList({ bookings, onDelete }: BookingListProps) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
        <p>No bookings yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((booking) => (
        <BookingItem key={booking.id} booking={booking} onDelete={onDelete} />
      ))}
    </div>
  );
}

export function BookingItem({ booking, onDelete }: BookingItemProps) {
  const formattedDate = useMemo(() => {
    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);
    return `${start.toLocaleDateString()} ${start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${end.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }, [booking.startTime, booking.endTime]);

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div>
        <h3 className="font-medium">{booking.name}</h3>
        <p className="text-sm text-gray-600">{formattedDate}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(booking.id)}
        className="text-red-600 hover:bg-red-50 hover:text-red-700"
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </div>
  );
}
