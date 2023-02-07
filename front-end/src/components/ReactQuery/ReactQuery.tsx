import { ReactElement, useState } from 'react';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createQueryClient } from 'react-query/index';

interface ReactQueryProps {
  children: ReactElement;
}

const ReactQuery = ({ children }: ReactQueryProps): ReactElement => {
  const [{ client, ...clientOptions }] = useState(createQueryClient());

  return (
    <PersistQueryClientProvider client={client} persistOptions={clientOptions}>
      {children}
    </PersistQueryClientProvider>
  );
};

export default ReactQuery;
