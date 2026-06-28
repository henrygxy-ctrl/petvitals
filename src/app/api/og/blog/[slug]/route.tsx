import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getPostBySlug } from "@/lib/blog";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";

export const runtime = "nodejs";


const COLORS = {
  nutrition: { bg: "#ecfdf5", accent: "#059669", text: "#064e3b" },
  safety: { bg: "#fef2f2", accent: "#dc2626", text: "#7f1d1d" },
  health: { bg: "#eff6ff", accent: "#2563eb", text: "#1e3a5f" },
  default: { bg: "#f8fafc", accent: "#0f766e", text: "#134e4a" },
};

function getTheme(category: string) {
  const c = category.toLowerCase();
  if (c.includes("nutrition") || c.includes("feeding")) return COLORS.nutrition;
  if (c.includes("safety") || c.includes("toxic")) return COLORS.safety;
  if (c.includes("health") || c.includes("weight")) return COLORS.health;
  return COLORS.default;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return new Response("Not found", { status: 404 });

  const theme = getTheme(post.category);
  const title = post.seo?.title || post.title;

  const resp = new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${theme.bg} 0%, #ffffff 100%)`,
          padding: 64,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top badge row */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: theme.accent,
              backgroundColor: `${theme.accent}18`,
              padding: "8px 20px",
              borderRadius: 9999,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {post.category}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: "90%",
          }}
        >
          {title}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 48,
            borderTop: `2px solid ${theme.accent}30`,
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: theme.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              P
            </div>
            <span style={{ fontSize: 20, fontWeight: 600, color: "#334155" }}>
              {SITE_NAME}
            </span>
          </div>
          <span style={{ fontSize: 18, color: "#94a3b8" }}>
            {SITE_BASE_URL.replace("https://", "")}/blog/{post.slug}
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );

  // Set cache headers for the OG image
  resp.headers.set("Cache-Control", "public, max-age=86400, immutable");
  return resp;
}