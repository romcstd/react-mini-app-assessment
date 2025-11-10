import type React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const PageNotFound: React.FC = () => {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-2 text-8xl font-extrabold">404</h1>
      <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-8 max-w-md text-zinc-600">
        Sorry, the page you're looking for might have been removed, renamed, or
        never existed.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-md border border-zinc-900 bg-zinc-900 px-4 py-2 text-zinc-100 transition-colors hover:bg-transparent hover:text-zinc-900"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
};
