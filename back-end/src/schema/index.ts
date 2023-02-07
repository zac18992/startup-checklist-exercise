import {
  types as typesPhases,
  queries as queriesPhases,
  mutations as mutationsPhases,
} from './startup-phases-and-items/index';
import { join } from 'path';
import { makeSchema } from 'nexus';

const types = [...typesPhases];
const queries = [...queriesPhases];
const mutations = [...mutationsPhases];

const schema = makeSchema({
  types: [types, queries, mutations],
  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'),
    schema: join(__dirname, '..', 'schema.graphql'),
  },
  contextType: {
    module: join(__dirname, '..', 'types/nexus-context.d.ts'), // Ensure that our types are understood within nexus resolvers
    export: 'Context',
  },
});

export default schema;
