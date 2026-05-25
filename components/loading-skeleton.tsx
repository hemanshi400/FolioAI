'use client';

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-32 bg-gray-200 dark:bg-dark-700 rounded-lg mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-1/2" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="h-6 bg-gray-200 dark:bg-dark-700 rounded w-1/2 mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-3/4" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-12 bg-gray-200 dark:bg-dark-700 rounded w-1/3" />
      <div className="grid md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <CardSkeleton />
    </div>
  );
}
