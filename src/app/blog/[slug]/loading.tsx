export default function ArticleLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-2">
          <div className="h-4 w-12 bg-muted rounded animate-pulse" />
          <div className="h-4 w-10 bg-muted rounded animate-pulse" />
          <div className="h-4 w-40 bg-muted rounded animate-pulse" />
        </div>
      </header>

      <main className="flex-1 py-8 sm:py-12">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-8 space-y-4">
            <div className="h-3 w-32 bg-muted rounded animate-pulse" />
            <div className="h-8 w-full bg-muted rounded animate-pulse" />
            <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
            <div className="flex gap-4">
              <div className="h-4 w-28 bg-muted rounded animate-pulse" />
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            </div>
          </div>

          <div className="space-y-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-4 bg-muted rounded animate-pulse"
                style={{ width: `${85 + Math.random() * 15}%` }}
              />
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}
