import { useEffect, useState } from 'react';

export function useDebounce(query: string, delay = 500) {
  const [debounceQuery, setDebounceQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebounceQuery(query), delay);
    return () => clearTimeout(timer);
  }, [query, delay]);

  return { debounceQuery };
}
