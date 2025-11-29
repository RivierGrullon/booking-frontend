# BookingApp - Frontend

Booking system with Google Calendar integration.

## 🚀 Features

- **Auth0 Authentication** - Secure login with Google support
- **Booking Management** - Create, view, and cancel bookings
- **Google Calendar Integration** - Conflict checking with existing events
- **Conflict Detection** - Prevents duplicate bookings in the system and Google Calendar
- **Modern UI** - Built with Tailwind CSS and shadcn/ui components

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Authentication:** Auth0
- **Components:** shadcn/ui, Radix UI
- **Notifications:** Sonner

## 📋 Prerequisites

- Node.js 20+
- pnpm 9+
- Backend API running 
- Auth0 account configured

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
# Auth0
AUTH0_SECRET=your-secret-at-least-32-characters
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_AUDIENCE=your-api-audience

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/booking-frontend.git
cd booking-frontend

# Install dependencies
pnpm install

# Run in development mode
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🐳 Docker

### Build and run with Docker Compose

```bash
# Create environment variables file
cp .env.example .env

# Build and run
docker compose up --build

# Run in background
docker compose up -d --build
```

### Manual build

```bash
docker build -t booking-frontend --build-arg NEXT_PUBLIC_API_URL=http://localhost:8080 .
docker run -p 3000:3000 --env-file .env booking-frontend
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/          # Main dashboard page
│   ├── auth/               # Auth routes (handled by Auth0)
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── blocks/             # Business components
│   │   ├── booking-form.tsx
│   │   ├── calendar-card.tsx
│   │   └── dashboard-client.tsx
│   └── ui/                 # UI components (shadcn)
├── lib/
│   ├── api/
│   │   └── client.ts       # API client
│   └── utils.ts            # Utilities
├── services/
│   └── auth0.ts            # Auth0 configuration
├── types.ts                # TypeScript types
└── middleware.ts           # Authentication middleware
```

## 🔗 API Endpoints (Backend)

The frontend consumes the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/me` | Get user profile |
| GET | `/auth/google/connect` | URL to connect Google Calendar |
| POST | `/auth/google/disconnect` | Disconnect Google Calendar |
| GET | `/bookings` | List user bookings |
| POST | `/bookings` | Create new booking |
| DELETE | `/bookings/:id` | Delete booking |
| GET | `/bookings/slots?date=` | Get available slots |

## 🔐 Auth0 Configuration

1. Create a **Regular Web Application** in Auth0
2. Configure allowed URLs:
   - **Allowed Callback URLs:** `http://localhost:3000/auth/callback`
   - **Allowed Logout URLs:** `http://localhost:3000`
3. Create an API in Auth0 and get the `audience`
4. Enable Google connection in Authentication > Social

## 📱 Features Overview

### Landing Page
- System information
- Login with Google button

### Dashboard
- **Google Calendar Connection:** Connect/disconnect Google account for conflict checking
- **Bookings List:** View all bookings sorted by date
- **Create Booking:** Modal with form for new booking (name, date, start/end time)
- **Delete Booking:** Button to cancel existing bookings

### Conflict Detection
When creating a booking, the system checks:
1. No overlapping bookings exist in the system
2. No overlapping events exist in Google Calendar (if connected)

## 🧪 Available Scripts

```bash
pnpm dev      # Development server
pnpm build    # Production build
pnpm start    # Start production server
```

