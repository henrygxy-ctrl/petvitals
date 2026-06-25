import Link from "next/link";
import { ArrowLeft, Search, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4 max-w-md">
        <p className="text-7xl font-bold text-muted-foreground/30 mb-4">404</p>
        <h1 className="text-xl font-bold mb-2">Page not found</h1>
        <p className="text-muted-foreground text-sm mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/toxicity"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md border text-sm hover:bg-muted transition-colors"
          >
            <Search className="h-4 w-4" />
            Toxicity Checker
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md border text-sm hover:bg-muted transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
