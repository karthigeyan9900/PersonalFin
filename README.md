# PersonalFin

A modern personal finance management application for tracking income, expenses, investments, and more.

## Features

- Secure authentication with password reset
- Financial dashboard with real-time insights
- Track income, expenses, liabilities, subscriptions & investments
- Multi-currency support (default: INR)
- Admin panel for user management
- Responsive design

## Tech Stack

Next.js 14 • TypeScript • Tailwind CSS • Prisma • PostgreSQL • NextAuth.js

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
```

## Deployment

Deployed on Vercel with Neon PostgreSQL. Configure environment variables in your deployment platform.

## Admin Access

To promote a user to admin, run this SQL in your database:

```sql
UPDATE "User" SET role = 'admin' WHERE email = 'your-email@example.com';
```
