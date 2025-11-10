import type React from 'react';
import { Search, X } from 'lucide-react';

interface ProjectHeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:gap-8">
      <h2 className="mb-4 text-4xl font-bold sm:mb-0 sm:text-5xl">Projects</h2>
      <div role="search" className="relative w-full max-w-sm sm:w-auto">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <label htmlFor="search" className="sr-only">
          Search projects
        </label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          placeholder="Search projects"
          className="h-full w-full rounded-md border border-zinc-400 bg-transparent py-2 pr-9 pl-9 transition-all duration-300 ease-in-out focus:ring-4 focus:ring-zinc-300 focus:ring-offset-0 focus:outline-none"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setSearchQuery('')}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
