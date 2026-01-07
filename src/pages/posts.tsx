import { useState, useEffect } from 'react';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPosts] = useState<number>(10);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    async function fetchPosts() {
      try {
        setLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!res.ok) {
          throw new Error('Failed to fetch posts. Please try again.');
        }
        const data: Post[] = await res.json();
        timeout = setTimeout(() => {
          setPosts(data);
          setLoading(false);
        }, 300);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }

    fetchPosts();
    return () => clearTimeout(timeout);
  }, []);

  const totalPages = Math.ceil(posts.length / totalPosts);
  const lastItem = page * totalPosts;
  const firstItem = lastItem - totalPosts;
  const currentItems = posts.slice(firstItem, lastItem);
  const goToPrev = () => setPage((p) => Math.max(p - 1, 1));
  const goToNext = () => setPage((p) => Math.min(p + 1, totalPages));

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <h1 className="mb-4 text-4xl font-bold">Posts</h1>
      <div className="mb-4">
        <p className="mb-4">
          {loading ? (
            <>Loading posts. Please wait.</>
          ) : (
            <>
              You’re on page {page} of {totalPages} , showing posts{' '}
              {firstItem + 1} - {lastItem} out of {posts.length}.
            </>
          )}
        </p>
        {!loading && (
          <div className="flex gap-4">
            <button
              onClick={goToPrev}
              disabled={page === 1}
              className="rounded-md border px-6 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
            >
              Prev
            </button>

            <button
              onClick={goToNext}
              disabled={page === totalPages}
              className="rounded-md border px-6 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentItems.map((post) => (
          <div key={post.id} className="rounded-xl border p-4">
            <span>{post.id}</span>
            <h2 className="mb-4 text-lg font-semibold capitalize">
              {post.title}
            </h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </>
  );
};
