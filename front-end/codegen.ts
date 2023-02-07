import type { CodegenConfig } from '@graphql-codegen/cli';
import { SERVER_URL } from './src/config/index';

const config: CodegenConfig = {
  overwrite: true,
  schema: SERVER_URL,
  documents: 'src/gql/queries.ts',
  generates: {
    'src/generated/gql/schema.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
    },
    'src/generated/gql/schema.json': {
      plugins: ['introspection'],
    },
  },
  config: {
    withHooks: true,
    fetcher: {
      endpoint: `${SERVER_URL}/graphql`,
      fetchParams: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    },
  },
};

export default config;
