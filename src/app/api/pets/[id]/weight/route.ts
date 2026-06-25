import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const logs = await db.weightLog.findMany({
    where: { petId: id, pet: { userId: session.user.id } },
    orderBy: { date: "asc" },
  });

  return NextResponse.json({ logs });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const data = await req.json();
  const log = await db.weightLog.create({
    data: {
      petId: id,
      weightLbs: parseFloat(data.weightLbs),
      bcsScore: data.bcsScore ? parseInt(data.bcsScore) : null,
      notes: data.notes || null,
      date: data.date ? new Date(data.date) : new Date(),
    },
  });

  // Update pet's current weight
  await db.pet.updateMany({
    where: { id, userId: session.user.id },
    data: { weightLbs: parseFloat(data.weightLbs) },
  });

  return NextResponse.json({ log });
}
