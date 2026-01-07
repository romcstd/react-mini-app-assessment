import { useState, useEffect } from 'react';
import { ProductCardSkeleton } from '../components/product-card-skeleton';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [productPerPage] = useState<number>(10);
  const [cache, setCache] = useState<Map<number, Product[]>>(new Map());
  // const [cache, setCache] = useState<Record<number, Product[]>>({});

  const firstItem = (page - 1) * productPerPage + 1;
  const lastItem = firstItem + products.length - 1;

  useEffect(() => {

    const fetchProducts = async () => {
      
    // Check cache first before get and set to state
    if (cache.has(page)) {
      const cacheProducts = cache.get(page);
      if(cacheProducts) setProducts(cacheProducts);
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
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  };

    fetchProducts();
  }, [page, productPerPage, cache]);

  const goToPrev = () => setPage((p) => Math.max(p - 1, 1));
  const goToNext = () => setPage((p) => Math.min(p + 1, totalPages));

  if (error) return <p className="text-red-500">{error}</p>;
  console.log(cache)
  return (
    <>
      <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Products</h1>
      <div className="mb-4">
        <p className="mb-4">{`Showing page ${page} of ${totalPages}, ${firstItem} - ${lastItem} out of ${totalProduct} products.`}</p>
        <div className="flex gap-4">
          <button
            onClick={goToPrev}
            disabled={page === 1}
            className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
          >
            Prev
          </button>
          <button
            onClick={goToNext}
            disabled={page === totalPages}
            className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
          >
            Next
          </button>
        </div>
      </div>
      {loading && <ProductCardSkeleton />}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
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
