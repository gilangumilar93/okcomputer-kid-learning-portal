export function AuthLayoutSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse space-y-4 w-full max-w-md">
        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto" />
        <div className="h-64 bg-gray-100 rounded" />
      </div>
    </div>
  );
}
