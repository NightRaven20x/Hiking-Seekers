This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

page.tsx (the manager — holds all state, fetches data)
│
├── DashboardHeader.tsx
│   → Just the green top bar. Receives two functions: onRefresh and onSignOut.
│   → No state of its own. Completely dumb display component.
│
├── StatsCards.tsx  
│   → The 4 white cards (Total, Pending, Approved, Rejected).
│   → Receives the bookings array and loading state, calculates the numbers itself.
│
├── BookingsTab.tsx
│   → The entire bookings tab content including the filter buttons.
│   → Receives bookings, loading state, and the updateStatus function.
│   → Has its own local state for which filter is active and which booking is expanded.
│
│   └── BookingCard.tsx (used inside BookingsTab)
│       → A single booking row. Expandable to show participants.
│       → Receives one booking object and the updateStatus function.
│
├── ScheduleTab.tsx
│   → The entire schedule tab — the form on the left, trip list on the right.
│   → Has its own local state for the form fields.
│   → Receives scheduledTrips array and two functions: onTripScheduled, onTripCancelled.
│
│   └── ScheduledTripCard.tsx (used inside ScheduleTab)
│       → A single scheduled trip row with Cancel button and new "View Details" button.
│       → Receives one trip and onCancel, onViewDetails functions.
│
└── TripDetailModal.tsx
    → A modal that slides in when you click "View Details" on a scheduled trip.
    → Shows trip info + all bookings for that trip + approve/reject actions.
    → Receives the selected trip and all bookings, plus onClose and onStatusUpdate.