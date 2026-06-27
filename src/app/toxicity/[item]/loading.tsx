export default function ToxicityItemLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-2">
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        </div>
      </header>
      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-xl border-2 p-6 sm:p-8 animate-pulse">
            <div className="flex items-start gap-4">
              <div className="h-7 w-7 bg-muted rounded-full shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-8 w-48 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-3/4 bg-muted rounded" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-5 rounded-xl border animate-pulse">
              <div className="h-4 w-32 bg-muted rounded mb-3" />
              <div className="h-4 w-full bg-muted rounded" />
            </div>
            <div className="p-5 rounded-xl border animate-pulse">
              <div className="h-4 w-24 bg-muted rounded mb-3" />
              <div className="h-4 w-full bg-muted rounded" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}