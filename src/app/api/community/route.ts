import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pets = await db.pet.findMany({
      where: { isPublic: true },
      select: {
        id: true,
        name: true,
        species: true,
        breed: true,
        weightLbs: true,
        bcsScore: true,
        activityLevel: true,
        createdAt: true,
        weightLogs: {
          orderBy: { date: "desc" },
          take: 30,
          select: { weightLbs: true, date: true },
        },
        _count: { select: { weightLogs: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const community = pets
      .filter((p) => p.weightLogs.length > 0)
      .map((p) => ({
        id: p.id,
        name: p.name,
        species: p.species,
        breed: p.breed,
        currentWeight: p.weightLbs,
        bcsScore: p.bcsScore,
        activityLevel: p.activityLevel,
        logsCount: p._count.weightLogs,
        weightTrend: p.weightLogs.map((l) => ({
          weight: l.weightLbs,
          date: l.date,
        })),
      }));

    return NextResponse.json({ community }, {
    headers: { "Cache-Control": "public, max-age=60, s-maxage=60" },
  });
  } catch (error) {
    console.error("Community API error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
