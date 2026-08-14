"use client";

import type { ReactNode } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

interface DownloadLinkProps {
  href: string;
  title: string;
  variant?: string;
  className?: string;
  children: ReactNode;
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
