import Link from "next/link";
import { redirect } from "next/navigation";
import { auth0 } from "@/services/auth0";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, CheckCircle2 } from "lucide-react";

export default async function Home() {
  const session = await auth0.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      <nav className="border-b bg-white/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-900">BookingApp</h1>
          </div>
          <a href="/auth/login">
            <Button variant="default">Login</Button>
          </a>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Smart Booking System for{" "}
              <span className="text-indigo-600">Modern Professionals</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Avoid conflicts and save time with this booking solution. :)
            </p>
            <div className="pt-8 flex flex-col gap-3">
              {[
                "Calendar read from Google",
                "Conflict Detection",
                "Easy Scheduling",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 justify-center md:justify-start text-gray-600"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-2xl opacity-20 animate-pulse" />
            <Card className="relative border-0 shadow-2xl">
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Access your dashboard to manage bookings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <a href="/auth/login" className="block">
                  <Button className="w-full py-6 text-lg" variant="outline">
                    <svg
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                    Continue with Google
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}