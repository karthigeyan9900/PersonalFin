# Setup Instructions

## Quick Start

1. **Install dependencies** (already done):
```bash
npm install
```

2. **Set up your database**:

Option A - Local PostgreSQL:
- Install PostgreSQL if you don't have it
- Create a database: `createdb finance_tracker`
- Update `.env` with your credentials

Option B - Supabase (Recommended for quick start):
- Go to https://supabase.com
- Create a new project
- Get your connection string from Settings > Database
- Update `DATABASE_URL` in `.env`

3. **Run Prisma migrations**:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. **Start the development server**:
```bash
npm run dev
```

5. **Open http://localhost:3000**

## First Steps

1. Click "Register" to create an account
2. Login with your credentials
3. You'll see the dashboard with all stats at $0
4. Click on any tab (Income, Expenses, etc.)
5. Click the "+ Add" button to create your first entry
6. Watch your financial overview update in real-time!

## Features Available

✅ User registration and authentication
✅ Add/Delete income entries
✅ Add/Delete expense entries
✅ Add/Delete liabilities
✅ Add/Delete subscriptions
✅ Add/Delete investments
✅ Real-time dashboard statistics
✅ Mobile-responsive design

## Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables:
   - `DATABASE_URL` - Your production database URL
   - `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
   - `NEXTAUTH_URL` - Your Vercel URL (e.g., https://your-app.vercel.app)
5. Deploy!

## Recommended Database for Production

- **Vercel Postgres**: Easiest integration
- **Supabase**: Free tier, great for getting started
- **Neon**: Serverless PostgreSQL with free tier

All work great with Vercel!
