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
  const [postsPerPage] = useState<number>(10);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!res.ok) throw new Error('Failed to fetch posts. Please try again.');
      const data: Post[] = await res.json();
      setPosts(data);
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Math.ceil rounds up to the nearest whole number
  // Math.min returns the smallest value from the numbers
  // Math.max returns the largest value from the numbers
  // array slice returns a new array

  const totalPosts = posts.length; // 100 posts
  const totalPages = Math.ceil(totalPosts / postsPerPage); // 10 pages
  const firstItem = (page - 1) * postsPerPage + 1; // (1 - 1) * 10 + 1 = 1
  const lastItem = Math.min(page * postsPerPage, totalPosts); // (1 * 10) = 10
  const currentItems = posts.slice(firstItem - 1, lastItem); // (0, 10)
  const goToPrev = () => setPage((p) => Math.max(p - 1, 1));
  const goToNext = () => setPage((p) => Math.min(p + 1, totalPages));

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Posts</h1>
      <div className="mb-4">
        <p className="mb-4">
          {loading ? (
            <>Loading posts. Please wait.</>
          ) : (
            <>
              {`Showing page ${page} of ${totalPages}, ${firstItem} - ${lastItem} out of ${totalPosts} posts.`}
            </>
          )}
        </p>
        {!loading && (
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
        )}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentItems.map((post) => (
          <div key={post.id} className="space-y-4 rounded-xl border p-4">
            <h2 className="text-lg font-semibold capitalize">
              <span>{post.id}.</span> {post.title}
            </h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </>
  );
};
