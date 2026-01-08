export const ProductCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex animate-pulse flex-col justify-between rounded-xl border border-zinc-400 bg-zinc-300 p-6 sm:p-8 dark:bg-zinc-400"
        >
          <div className="mb-4 h-8 w-1/2 rounded-md bg-zinc-200 dark:bg-zinc-300"></div>

          <div className="mb-4 flex-1 space-y-2">
            <div className="h-6 w-full rounded-md bg-zinc-200 dark:bg-zinc-300"></div>
            <div className="h-6 w-full rounded-md bg-zinc-200 dark:bg-zinc-300"></div>
          </div>

          <div className="h-8 w-24 rounded-md bg-zinc-200 dark:bg-zinc-300"></div>
        </div>
      ))}
    </div>
  );
};
