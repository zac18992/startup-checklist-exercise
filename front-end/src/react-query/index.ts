import { QueryClient as ReactQueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import type { Persister } from '@tanstack/react-query-persist-client';
import type { QueryClient } from '@tanstack/react-query';

const CACHE_VERSION = '1.0.0';

const maxAge = 1000 * 60 * 60 * 24; // 24 hours

interface QueryClientConfigObject {
  client: QueryClient;
  persister: Persister;
  maxAge: number;
  buster: string;
}

export const createQueryClient = (): QueryClientConfigObject => {
  const queryClient = new ReactQueryClient({ defaultOptions: { queries: { cacheTime: maxAge } } });

  const localStoragePersistor = createSyncStoragePersister({ storage: window.localStorage });

  return {
    client: queryClient,
    persister: localStoragePersistor,
    maxAge,
    buster: CACHE_VERSION.split('.')[1] || '0',
  };
};
