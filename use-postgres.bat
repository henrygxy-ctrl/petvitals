@echo off
REM Switch Prisma schema for PostgreSQL/Neon deployment
echo Switching to PostgreSQL schema for deployment...
copy /Y prisma\schema.prisma prisma\schema.prisma
echo Done! Run: npx prisma generate && npx prisma db push
