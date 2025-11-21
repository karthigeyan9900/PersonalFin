# Finance Tracker

A personal finance tracking application built with Next.js, allowing users to track income, expenses, liabilities, subscriptions, and investments.

## Features

- User authentication (register/login)
- Dashboard with financial overview
- Track income and expenses
- Manage liabilities
- Monitor subscriptions
- Track investments
- Responsive design for mobile and desktop

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js for authentication
- Prisma ORM
- PostgreSQL database

## Getting Started

### Prerequisites

- Node.js 20.9.0 or higher (you currently have 18.20.2, consider upgrading)
- PostgreSQL database

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up your database:
   - Create a PostgreSQL database
   - Update the `DATABASE_URL` in `.env` file with your database credentials

3. Generate Prisma client and run migrations:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Update the `.env` file:
```
DATABASE_URL="postgresql://user:password@localhost:5432/finance_tracker?schema=public"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` (use Vercel Postgres or external PostgreSQL)
   - `NEXTAUTH_SECRET` (generate a secure random string)
   - `NEXTAUTH_URL` (your production URL)
4. Deploy!

### Database Options for Production

- **Vercel Postgres**: Easy integration with Vercel
- **Supabase**: Free tier available
- **PlanetScale**: MySQL-compatible serverless database
- **Neon**: Serverless PostgreSQL

## Project Structure

```
finance-tracker/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   └── register/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   └── page.tsx
├── lib/
│   ├── auth.ts
│   └── prisma.ts
├── prisma/
│   └── schema.prisma
└── types/
    └── next-auth.d.ts
```

## Next Steps

- Add CRUD operations for income, expenses, liabilities, subscriptions, and investments
- Add data visualization with charts
- Implement budget tracking
- Add export functionality (CSV, PDF)
- Add recurring transaction automation
- Implement categories and tags
- Add financial goals tracking
