# PetVitals - Vercel + Neon Deployment Guide

## Prerequisites
- Vercel account (vercel.com)
- Neon account (neon.tech) or any PostgreSQL provider

## 1. Set Up Neon Database
1. Go to https://console.neon.tech
2. Create a new project
3. Copy the connection string (it looks like: `postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/petvitals?sslmode=require`)

## 2. Configure Environment Variables in Vercel
| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Neon connection string with `?sslmode=require` |
| `DIRECT_URL` | Same as DATABASE_URL (used for direct connections) |
| `AUTH_SECRET` | Run `openssl rand -base64 32` to generate |
| `AUTH_URL` | Your app URL (e.g. `https://petvitals.vercel.app`) |

## 3. Deploy to Vercel
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Local Development with SQLite
```bash
# Switch to SQLite schema
use-sqlite.bat

# Or manually copy:
copy prisma\schema.sqlite.prisma prisma\schema.prisma

# Set DATABASE_URL in .env:
# DATABASE_URL="file:./dev.db"

# Generate & push
npx prisma generate
npx prisma db push
```
