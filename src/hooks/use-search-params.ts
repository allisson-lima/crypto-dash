'use client';

import { useQueryState } from 'nuqs';

export function useSearchParams() {
  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    clearOnDefault: true,
  });

  const [page, setPage] = useQueryState('page', {
    defaultValue: 1,
    parse: Number.parseInt,
    serialize: String,
    clearOnDefault: true,
  });

  return {
    search,
    setSearch,
    page,
    setPage,
  };
}
