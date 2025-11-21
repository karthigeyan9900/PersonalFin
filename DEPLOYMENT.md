# Deploy to Vercel - Step by Step Guide

## Prerequisites
- GitHub account
- Vercel account (free - sign up at vercel.com)

## Step 1: Prepare for Production

### Update Database for Production
Currently using SQLite (local only). For Vercel, you need PostgreSQL.

1. **Get a PostgreSQL database** (choose one):
   - **Vercel Postgres** (easiest, integrated)
   - **Supabase** (free tier: https://supabase.com)
   - **Neon** (free tier: https://neon.tech)

2. **Update `prisma/schema.prisma`**:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. **Delete the SQLite database file**:
```bash
rm prisma/dev.db
```

## Step 2: Push to GitHub

1. **Initialize git** (if not already done):
```bash
cd finance-tracker
git init
git add .
git commit -m "Initial commit - Finance Tracker"
```

2. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name it "finance-tracker" (or whatever you want)
   - Don't initialize with README (you already have files)
   - Click "Create repository"

3. **Push your code**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/finance-tracker.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy on Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with GitHub
3. **Click "Add New Project"**
4. **Import your GitHub repository** (finance-tracker)
5. **Configure Project**:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

6. **Add Environment Variables** (click "Environment Variables"):
   ```
   DATABASE_URL=your_postgresql_connection_string
   NEXTAUTH_SECRET=generate_a_random_secret
   NEXTAUTH_URL=https://your-app-name.vercel.app
   ```

   **To generate NEXTAUTH_SECRET**:
   ```bash
   openssl rand -base64 32
   ```
   Or use: https://generate-secret.vercel.app/32

7. **Click "Deploy"**

## Step 4: Set Up Database

After deployment, you need to run migrations:

1. **Install Vercel CLI** (optional but helpful):
```bash
npm i -g vercel
```

2. **Run migrations** (two options):

   **Option A - Using Vercel CLI**:
   ```bash
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

   **Option B - Using Prisma Data Platform**:
   - Go to your Vercel project settings
   - Add a build command: `npx prisma generate && npx prisma migrate deploy && next build`

## Step 5: Test Your App

1. Visit your Vercel URL (e.g., https://finance-tracker-xyz.vercel.app)
2. Register a new account
3. Test all features

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Make sure all environment variables are set
- Ensure DATABASE_URL is correct

### Database Connection Issues
- Verify DATABASE_URL format
- For Supabase: Use the "Connection pooling" URL (port 6543)
- For Neon: Copy the connection string from dashboard

### Authentication Issues
- Make sure NEXTAUTH_URL matches your Vercel domain
- NEXTAUTH_SECRET must be set

## Updating Your App

After making changes:
```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically redeploy!

## Using Vercel Postgres (Easiest Option)

1. In your Vercel project dashboard, go to "Storage"
2. Click "Create Database"
3. Select "Postgres"
4. Click "Create"
5. Vercel will automatically add DATABASE_URL to your environment variables
6. Redeploy your app

## Cost
- Vercel: Free for hobby projects
- Vercel Postgres: Free tier available
- Supabase: Free tier (500MB database)
- Neon: Free tier (3GB storage)

Your app should be live and accessible from anywhere! 🎉
