"use client";

import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { trackAnalyticsEvent } from "@/lib/analytics";

interface NewsletterSignupProps {
  source?: string;
  interest?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  compact?: boolean;
}

export function NewsletterSignup({
  source = "general",
  interest = "pet-safety",
  title = "Stay Updated",
  description = "Get pet safety tips, new toxicity alerts, and feeding guides delivered to your inbox. No spam, unsubscribe anytime.",
  buttonLabel = "Subscribe",
  compact = false,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const pathname = usePathname();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");
    trackAnalyticsEvent("newsletter_signup_submit", {
      source,
      interest,
    });

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source,
          interest,
          pagePath: pathname,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Subscribed!");
        setEmail("");
        trackAnalyticsEvent("newsletter_signup_success", {
          source,
          interest,
          already_subscribed: Boolean(data.existing),
        });
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        trackAnalyticsEvent("newsletter_signup_error", {
          source,
          interest,
          status_code: res.status,
        });
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
      trackAnalyticsEvent("newsletter_signup_error", {
        source,
        interest,
        status_code: "network",
      });
    }
  };

  return (
    <div className={`w-full ${compact ? "" : "max-w-md mx-auto"}`}>
      <div className={`flex items-center gap-2 mb-3 ${compact ? "" : "justify-center"}`}>
        <Mail className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      <p className={`text-xs text-muted-foreground mb-4 ${compact ? "" : "text-center"}`}>
        {description}
      </p>

      {status === "success" ? (
        <div className={`flex items-center gap-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-sm ${compact ? "" : "justify-center"}`}>
          <CheckCircle className="h-4 w-4" />
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="your@email.com"
            required
            disabled={status === "loading"}
            className="flex-1 h-9 text-sm"
          />
          <button
            type="submit"
            disabled={status === "loading" || !email.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 shrink-0"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              buttonLabel
            )}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="text-xs text-red-600 dark:text-red-400 mt-2 text-center">
          {message}
        </p>
      )}
    </div>
  );
}
