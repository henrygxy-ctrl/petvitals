"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { trackAnalyticsEvent } from "@/lib/analytics";

interface DownloadLinkProps {
  href: string;
  title: string;
  variant?: string;
  className?: string;
  children: ReactNode;
}

export function DownloadFollowupLink({ href, title, variant = "direct", className, children }: DownloadLinkProps) {
  return (
    <Link href={href} data-retention-event="download_followup_click" className={className} onClick={() =>
      trackAnalyticsEvent("download_followup_click", {
        resource_title: title,
        followup_href: href,
        download_variant: variant,
      })
    }>
      {children}
    </Link>
  );
}

export function DownloadLink({
  href,
  title,
  variant = "direct",
  className,
  children,
}: DownloadLinkProps) {
  return (
    <a
      href={href}
      onClick={() =>
        trackAnalyticsEvent("pdf_download_click", {
          resource_title: title,
          resource_href: href,
          download_variant: variant,
        })
      }
      className={className}
    >
      {children}
    </a>
  );
}
