import { useState, useEffect } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { ProductCardSkeleton } from '../components/product-card-skeleton';
import { ProductsNotFound } from '../components/products-not-found';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const pageParam = Number(searchParams.get('page'));

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  // const [page, setPage] = useState<number>(1);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [productPerPage] = useState<number>(10);
  const [cache, setCache] = useState<Map<number, Product[]>>(new Map());
  // const [cache, setCache] = useState<Record<number, Product[]>>({});

  const firstItem = (page - 1) * productPerPage + 1;
  const lastItem = firstItem + products.length - 1;

  useEffect(() => {
    // const controller = new AbortController();
    const fetchProducts = async () => {
      // Check cache first before get and set to state
      if (cache.has(page)) {
        const cacheProducts = cache.get(page);
        if (cacheProducts) setProducts(cacheProducts);
        return;
      }
      // if (cache[page]) {
      //   setProducts(cache[page]);
      //   return;
      // }
      setLoading(true);
      try {
        const skip = (page - 1) * productPerPage;
        const response = await fetch(
          `https://dummyjson.com/products?limit=${productPerPage}&skip=${skip}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch products. Please try again later.');
        }
        const json = await response.json();
        const data: Product[] = await json.products;
        setProducts(data);

        // Store in cache
        setCache((prev) => new Map(prev).set(page, data));
        // setCache((prev) => ({ ...prev, [page]: data }));

        setTotalProduct(json.total);
        setTotalPages(Math.ceil(json.total / productPerPage));
      } catch (error: unknown) {
        // if (error instanceof DOMException && error.name === 'AbortError') return;
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // return () => controller.abort();
  }, [page, productPerPage, cache]);

  // const goToPrev = () => setPage((p) => Math.max(p - 1, 1));
  // const goToNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const goToPrev = () => {
    const prevPage = Math.max(page - 1, 1);
    setSearchParams({ page: String(prevPage) });
  };
  const goToNext = () => {
    const nextPage = Math.min(page + 1, totalPages);
    setSearchParams({ page: String(nextPage) });
  };

  // const goToPage = (e: number) => {
  //   const pageNumber = Math.max(1, Math.min(e, totalPages));
  //   setSearchParams({ page: String(pageNumber)})
  // }

  if (error) return <p className="text-red-500">{error}</p>;

  if (!loading && totalPages > 0 && page > totalPages)
    return <ProductsNotFound />;

  const isInvalidPage =
    !pageParam ||
    Number.isNaN(pageParam) ||
    !Number.isInteger(page) ||
    page < 1;

  if (isInvalidPage) return <Navigate to="/products?page=1" replace />;
  
  const maxButtons = 5;
  let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
  let endPage = startPage + maxButtons - 1;
  if (endPage > totalPages) {
  endPage = totalPages;
  startPage = Math.max(1, endPage - maxButtons + 1);
}

const pageNumbers = [];
for (let i = startPage; i <= endPage; i++) {
  pageNumbers.push(i);
}

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Products</h1>
      <div className="mb-4">
        <div className="mb-4">
          {totalProduct > 0 ? (
            `Showing page ${page} of ${totalPages}, ${firstItem} - ${lastItem} out of ${totalProduct} products.`
          ) : (
            <div className="h-6 w-84 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-300"></div>
          )}
        </div>
        <div className="flex gap-4">
          <button
            onClick={goToPrev}
            disabled={page === 1 || loading}
            className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
          >
            Prev
          </button>
          {pageNumbers.map((p) => (
            <button
            key={p}
            onClick={() => setSearchParams({ page: String(p) })}
            className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
          >
            {p}
          </button>
          ))
            
          }
          
          <button
            onClick={goToNext}
            disabled={page === totalPages || loading}
            className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
          >
            Next
          </button>
        </div>
      </div>
      {loading && <ProductCardSkeleton />}
      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {!loading && products.map((product) => (
          <div
            key={product.id}
            className="space-y-4 rounded-xl border border-zinc-400 p-4"
          >
            <div className="flex justify-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                width={300}
                height={300}
              />
            </div>
            <h1 className="text-xl font-bold">
              {product.id}. {product.title}
            </h1>
            <p>{product.description}</p>
            <p>
              {product.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
