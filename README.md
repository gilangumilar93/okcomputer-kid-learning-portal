# OKComputer Kid Learning Portal

A full-stack interactive learning platform for kids, built with React, TypeScript, Vite, tRPC, Hono, and Drizzle ORM. Features a parent dashboard, curriculum map, lesson playback, and KidsPark-themed experiences.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router
- **Backend**: Hono, tRPC, Node.js
- **Database**: MySQL + Drizzle ORM
- **Auth**: Kimi OAuth integration
- **Other**: Framer Motion, Recharts, TanStack Query

## Getting Started

### Prerequisites

- Node.js 20+
- MySQL database
- Kimi OAuth credentials (optional for local demo)

### Setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env
# Edit .env with your DATABASE_URL and auth keys

# Generate and push database schema
npm run db:generate
npm run db:push

# Start development server
npm run dev
```

### Scripts

| Command          | Description                          |
|------------------|--------------------------------------|
| `npm run dev`    | Start Vite dev server                |
| `npm run build`  | Production build                     |
| `npm run start`  | Run production server                |
| `npm run db:push`| Push Drizzle schema to database      |
| `npm run lint`   | Run ESLint                           |
| `npm run test`   | Run Vitest                           |

## Project Structure

```
├── src/                  # Frontend React app
│   ├── pages/            # Home, LearnMap, LessonPlay, ParentDashboard, Login
│   ├── components/       # UI components (shadcn) + AuthLayout
│   └── hooks/            # Auth and mobile hooks
├── api/                  # Backend routes and queries
│   ├── queries/          # Curriculum, kidspark, users
│   └── kimi/             # Auth integration
├── db/                   # Drizzle schema and migrations
└── contracts/            # Shared types and constants
```

## Features

- Interactive learning map and lesson playback
- Parent dashboard for progress tracking
- Curriculum management
- KidsPark themed UI
- Secure parent/child authentication flow

## License

Private / personal project — see repo settings.
