import { NextResponse } from "next/server";
import { SITE_BASE_URL } from "@/lib/constants";

// Simple in-memory rate limiter: max 3 requests per IP per minute
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  entry.count++;
  return entry.count > 3;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Please use the signup form on this website." }, { status: 403 });
  }
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 });
    }
    const { email, consent, source, interest, pagePath } = body || {};

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const normalized = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (normalized.length > 254 || !emailRegex.test(normalized)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (consent !== true) {
      return NextResponse.json({ error: "Please agree to receive the newsletter." }, { status: 400 });
    }
    const apiKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID);
    const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);
    if (!apiKey || !Number.isSafeInteger(listId) || listId <= 0 || !Number.isSafeInteger(templateId) || templateId <= 0) {
      return NextResponse.json(
        { error: "Email signup is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    // Brevo stores confirmed contacts outside Vercel's ephemeral filesystem.
    const response = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: normalized,
        includeListIds: [listId],
        templateId,
        redirectionUrl: `${SITE_BASE_URL}/newsletter/confirmed`,
        attributes: {
          SIGNUP_SOURCE: typeof source === "string" ? source.slice(0, 80) : "general",
          SIGNUP_INTEREST: typeof interest === "string" ? interest.slice(0, 80) : "pet-safety",
          SIGNUP_PAGE: typeof pagePath === "string" && pagePath.startsWith("/")
            ? pagePath.split(/[?#]/)[0].slice(0, 200)
            : "/",
        },
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Newsletter provider rejected request:", response.status);
      return NextResponse.json(
        { error: "We could not send the confirmation email. Please try again later." },
        { status: response.status === 429 ? 429 : 502 }
      );
    }

    return NextResponse.json(
      { message: "Check your inbox to confirm your subscription. You are not subscribed until you confirm.", pending: true },
      { status: 202 }
    );
  } catch (error) {
    console.error("Newsletter subscribe failed:", error instanceof Error ? error.name : "UnknownError");
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
