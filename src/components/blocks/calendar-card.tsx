import { Calendar, Unlink, LinkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface GoogleCalendarCardProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function GoogleCalendarCard({
  isConnected,
  onConnect,
  onDisconnect,
}: GoogleCalendarCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Calendar className="w-8 h-8 text-indigo-600" />
            <div>
              <h2 className="text-lg font-semibold">Google Calendar</h2>
              <p className="text-gray-600">
                {isConnected
                  ? "Connected - conflicts checked automatically"
                  : "Connect to check for conflicts"}
              </p>
            </div>
          </div>
          {isConnected ? (
            <Button
              variant="outline"
              onClick={onDisconnect}
              className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
            >
              <Unlink className="w-4 h-4" /> Disconnect
            </Button>
          ) : (
            <Button onClick={onConnect} className="gap-2">
              <LinkIcon className="w-4 h-4" /> Connect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}