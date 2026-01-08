import { Link } from 'react-router-dom';

export const ProductsNotFound = () => {
  return (
    <section className="bg-background text-foreground flex flex-1 flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-2 text-8xl font-extrabold">404</h1>
      <h2 className="mb-4 text-2xl font-semibold">Products Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Sorry, the project you're looking for might have been removed, renamed,
        or never existed.
      </p>

      <Link
        to="/products"
        className="inline-flex items-center gap-2 rounded-md border border-zinc-900 bg-zinc-900 px-4 py-2 text-zinc-100 transition-colors hover:bg-transparent hover:text-zinc-900"
      >
        Back to Products page
      </Link>
    </section>
  );
};
