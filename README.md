# Planora Frontend

A minimal, focused productivity web app built with Vue 3, Vite, TailwindCSS, and Pinia. Plan weekly tasks and goals, visualise them in a calendar, and manage reminders without the clutter of traditional calendar tools.

## Features

- 📅 **Dashboard** with today's tasks, weekly goals, and a motivational quote.
- 🗓️ **Calendar view** powered by Vue Cal for month/week/day layouts.
- 🎯 **Goals management** with progress tracking and completion state.
- 🔔 **Notification settings** persisted to localStorage.
- 👤 **Profile & preferences** including time zone, theme (light/dark/system), and session token management.
- ⚙️ **Pinia stores** for tasks, goals, and settings with optional API sync (Laravel ready via Axios).

## Getting Started

```bash
npm install
npm run dev
```

Then open the Vite dev server URL (default `http://localhost:5173`) in your browser.

## Configuration

- Set `VITE_API_URL` and `VITE_USE_API=true` in a `.env` file to enable live Laravel API requests.
- Tasks, goals, and preferences persist locally using `@vueuse/core` storage utilities.
- TailwindCSS is preconfigured with a custom palette and utility plugins.

## Project Structure

```
src/
  components/      Reusable UI elements (TaskList, GoalList, CalendarView, etc.)
  layouts/         MainLayout with Navbar + Sidebar
  pages/           Route views for dashboard, calendar, goals, notifications, profile
  stores/          Pinia stores for tasks, goals, settings
  services/        Axios client
  composables/     Shared utilities (theme helpers)
```

## Next Steps

- Connect Axios calls to real Laravel endpoints by enabling the API flag.
- Add authentication flow (login/logout) and session refresh.
- Extend notifications to use the Web Notifications API + Service Worker for PWA support.
- Integrate a daily quote API and add offline caching via Vite PWA plugin.

---

Crafted for a calm, distraction-free planning experience. ✨
