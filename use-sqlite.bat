@echo off
REM Switch Prisma schema for local SQLite development
echo Switching to SQLite schema for local development...
copy /Y prisma\schema.sqlite.prisma prisma\schema.prisma
echo Done! Run: npx prisma generate && npx prisma db push
