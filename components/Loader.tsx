export const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="spinner-border animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12"></div>
  </div>
)

export function ServicesSkeleton() {
  return (
    <section className="max-w-7xl w-full mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <div className="skeleton h-9 w-64 mx-auto" />
        <div className="skeleton h-4 w-[420px] max-w-full mx-auto" />
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton p-4 h-[260px]">
            <div className="skeleton h-32 mb-4" />
            <div className="space-y-3">
              <div className="skeleton h-6 w-8" />
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PortfolioSkeleton() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="skeleton h-[240px] rounded-2xl"
          />
        ))}
      </div>
    </section>
  );
}
