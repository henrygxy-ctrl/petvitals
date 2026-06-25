import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const pet = await db.pet.findFirst({
      where: { id, userId: session.user.id },
      include: {
        weightLogs: { orderBy: { date: "desc" }, take: 20 },
        feedingLogs: { orderBy: { date: "desc" }, take: 10 },
      },
    });

    if (!pet) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ pet });
  } catch (error) {
    console.error("GET /api/pets/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch pet" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const data = await req.json();

    // Coerce isNeutered if present
    if (data.isNeutered != null) {
      data.isNeutered = data.isNeutered === "true" || data.isNeutered === true;
    }

    const pet = await db.pet.updateMany({
      where: { id, userId: session.user.id },
      data,
    });

    return NextResponse.json({ pet });
  } catch (error) {
    console.error("PATCH /api/pets/[id] error:", error);
    return NextResponse.json({ error: "Failed to update pet" }, { status: 500 });
  }
}
