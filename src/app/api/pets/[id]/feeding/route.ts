import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const logs = await db.feedingLog.findMany({
    where: { petId: id, pet: { userId: session.user.id } },
    orderBy: { date: "desc" },
    take: 20,
  });

  return NextResponse.json({ logs });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const data = await req.json();

  const log = await db.feedingLog.create({
    data: {
      petId: id,
      mealType: data.mealType || "daily-plan",
      foodBrand: data.foodBrand || null,
      amountCups: data.amountCups ? parseFloat(data.amountCups) : null,
      calories: data.calories ? parseFloat(data.calories) : null,
      notes: data.notes || null,
      date: new Date(),
    },
  });

  return NextResponse.json({ log });
}
