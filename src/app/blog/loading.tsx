export default function BlogLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-2">
          <div className="h-4 w-14 bg-muted rounded animate-pulse" />
          <div className="h-4 w-4 bg-muted rounded animate-pulse" />
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
        </div>
      </header>

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <div className="h-9 w-64 bg-muted rounded animate-pulse mb-2" />
            <div className="h-5 w-96 bg-muted rounded animate-pulse" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 h-10 bg-muted rounded-md animate-pulse" />
            <div className="h-10 w-36 bg-muted rounded-md animate-pulse" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-card overflow-hidden">
                <div className="aspect-[16/9] bg-muted animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-20 bg-muted rounded animate-pulse" />
                  <div className="h-5 w-full bg-muted rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                  <div className="flex gap-3">
                    <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-12 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
