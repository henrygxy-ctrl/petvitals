export default function FeedingCalculatorLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-2">
          <div className="h-4 w-12 bg-muted rounded animate-pulse" />
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        </div>
      </header>
      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 space-y-3">
            <div className="h-9 w-80 mx-auto bg-muted rounded animate-pulse" />
            <div className="h-5 w-96 mx-auto bg-muted rounded animate-pulse" />
          </div>
          <div className="max-w-2xl mx-auto rounded-xl border bg-card p-6 sm:p-8 space-y-5">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i}>
                <div className="h-4 w-32 bg-muted rounded animate-pulse mb-2" />
                <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
