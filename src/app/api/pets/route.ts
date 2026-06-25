import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pets = await db.pet.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ pets });
  } catch (error) {
    console.error("GET /api/pets error:", error);
    return NextResponse.json({ error: "Failed to fetch pets" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    const isNeutered = data.isNeutered != null ? data.isNeutered === "true" || data.isNeutered === true : null;

    const pet = await db.pet.create({
      data: {
        userId: session.user.id,
        name: data.name,
        species: data.species,
        breed: data.breed || null,
        birthDate: data.birthDate || null,
        weightLbs: data.weightLbs ? parseFloat(data.weightLbs) : null,
        bcsScore: data.bcsScore ? parseInt(data.bcsScore) : null,
        isNeutered,
        activityLevel: data.activityLevel || null,
      },
    });

    return NextResponse.json({ pet });
  } catch (error) {
    console.error("POST /api/pets error:", error);
    return NextResponse.json(
      { error: "Failed to create pet. Please try again." },
      { status: 500 }
    );
  }
}
